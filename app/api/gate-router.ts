import { z } from "zod";
import { randomBytes } from "node:crypto";
import { and, eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import * as schema from "@db/schema";
import { allLessons, getCourse, MC_PASS, PRACTICAL_PASS } from "@contracts/content";
import type { InstrumentAnswers } from "@contracts/content/types";
import { getDb } from "./queries/connection";
import { authedQuery, createRouter } from "./middleware";
import { bestPlacement, placementCoversCourse } from "./aipab-router";
import { getGate } from "./content/gates";
import { sanitizeGate } from "./content/sanitize";
import { scoreGate } from "./scoring";

async function userCertificates(userId: number) {
  return getDb()
    .select()
    .from(schema.certificates)
    .where(eq(schema.certificates.userId, userId));
}

export const gateRouter = createRouter({
  /** Begin a gate sitting. Enforces prerequisites (certificates for every
   *  course this one requires) and full lesson completion, then returns the
   *  gate with all answer keys stripped. */
  start: authedQuery
    .input(z.object({ courseCode: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = getCourse(input.courseCode);
      if (!course) throw new TRPCError({ code: "NOT_FOUND", message: "Unknown course." });
      const gate = getGate(course.code);
      if (!gate) throw new TRPCError({ code: "NOT_FOUND", message: "No gate bank for this course." });

      const db = getDb();
      const certs = await userCertificates(ctx.user.id);
      const heldCodes = new Set(certs.map((c) => c.courseCode));
      // AIPAB placement substitutes for prerequisite certifications:
      // a candidate placed at Rung N (or N+) need not re-earn what the
      // battery already demonstrated.
      const placement = await bestPlacement(ctx.user.id);
      const missingPrereqs = course.prerequisites.filter(
        (p) => !heldCodes.has(p) && !(placement && placementCoversCourse(placement, p)),
      );
      if (missingPrereqs.length > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `Prerequisite certification missing: ${missingPrereqs.join(", ")}`,
        });
      }

      const lessons = allLessons(course);
      const done = await db
        .select()
        .from(schema.lessonProgress)
        .where(
          and(
            eq(schema.lessonProgress.userId, ctx.user.id),
            eq(schema.lessonProgress.courseCode, course.code),
          ),
        );
      const doneIds = new Set(done.map((d) => d.lessonId));
      const incomplete = lessons.filter((pair) => !doneIds.has(pair.lesson.id));
      if (incomplete.length > 0) {
        throw new TRPCError({
          code: "PRECONDITION_FAILED",
          message: `${incomplete.length} lesson(s) not yet completed.`,
        });
      }

      const [{ id: attemptId }] = await db
        .insert(schema.gateAttempts)
        .values({ userId: ctx.user.id, courseCode: course.code })
        .$returningId();

      return {
        attemptId,
        courseCode: course.code,
        thresholds: { mc: MC_PASS, practical: PRACTICAL_PASS },
        gate: sanitizeGate(gate),
      };
    }),

  /** Submit a sitting for auto-scoring. Both thresholds must be met. On a
   *  pass, a certificate is issued with a unique serial. The response reveals
   *  which items were wrong — never the keys. */
  submit: authedQuery
    .input(
      z.object({
        attemptId: z.number(),
        mcAnswers: z.record(z.string(), z.unknown()),
        practicalAnswers: z.record(z.string(), z.record(z.string(), z.unknown())),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const attempt = await db.query.gateAttempts.findFirst({
        where: and(
          eq(schema.gateAttempts.id, input.attemptId),
          eq(schema.gateAttempts.userId, ctx.user.id),
        ),
      });
      if (!attempt) throw new TRPCError({ code: "NOT_FOUND", message: "Attempt not found." });
      if (attempt.completedAt) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "This sitting was already submitted." });
      }

      const gate = getGate(attempt.courseCode);
      if (!gate) throw new TRPCError({ code: "NOT_FOUND", message: "Gate bank missing." });

      const score = scoreGate(
        gate,
        input.mcAnswers,
        input.practicalAnswers as InstrumentAnswers,
      );

      await db
        .update(schema.gateAttempts)
        .set({
          completedAt: new Date(),
          mcScore: score.mcScore,
          practicalScore: score.practicalScore,
          passed: score.passed,
          answers: { mc: input.mcAnswers, practical: input.practicalAnswers },
          detail: score.detail,
        })
        .where(eq(schema.gateAttempts.id, attempt.id));

      let certificate: schema.Certificate | undefined;
      if (score.passed) {
        const course = getCourse(attempt.courseCode);
        const serial = `AIJL-${attempt.courseCode}-${randomBytes(4).toString("hex").toUpperCase()}`;
        const [{ id: certId }] = await db
          .insert(schema.certificates)
          .values({
            userId: ctx.user.id,
            courseCode: attempt.courseCode,
            confersLabel: course?.confers ?? attempt.courseCode,
            serial,
            attemptId: attempt.id,
          })
          .$returningId();
        certificate = await db.query.certificates.findFirst({
          where: eq(schema.certificates.id, certId),
        });
      }

      return {
        passed: score.passed,
        mcScore: score.mcScore,
        practicalScore: score.practicalScore,
        thresholds: { mc: MC_PASS, practical: PRACTICAL_PASS },
        detail: score.detail,
        certificate,
      };
    }),

  /** Summary of the signed-in user's sittings for one course. */
  myAttempts: authedQuery
    .input(z.object({ courseCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const rows = await getDb()
        .select()
        .from(schema.gateAttempts)
        .where(
          and(
            eq(schema.gateAttempts.userId, ctx.user.id),
            eq(schema.gateAttempts.courseCode, input.courseCode),
          ),
        );
      return rows.map((a) => ({
        id: a.id,
        startedAt: a.startedAt,
        completedAt: a.completedAt,
        mcScore: a.mcScore,
        practicalScore: a.practicalScore,
        passed: a.passed,
      }));
    }),
});
