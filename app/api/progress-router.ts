import { z } from "zod";
import { and, desc, eq } from "drizzle-orm";
import * as schema from "@db/schema";
import { allLessons, courses, getCourse } from "@contracts/content";
import { getDb } from "./queries/connection";
import { authedQuery, createRouter } from "./middleware";

export const progressRouter = createRouter({
  /** Mark a lesson complete (idempotent). */
  completeLesson: authedQuery
    .input(z.object({ courseCode: z.string(), lessonId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const course = getCourse(input.courseCode);
      if (!course) throw new Error("Unknown course.");
      const valid = allLessons(course).some((pair) => pair.lesson.id === input.lessonId);
      if (!valid) throw new Error("Unknown lesson for this course.");

      await getDb()
        .insert(schema.lessonProgress)
        .values({
          userId: ctx.user.id,
          courseCode: course.code,
          lessonId: input.lessonId,
        })
        .onDuplicateKeyUpdate({ set: { completedAt: new Date() } });
      return { ok: true };
    }),

  /** Record a module knowledge-check result; keeps the best score (idempotent
   *  in the sense that a worse score never overwrites a better one). */
  recordQuizScore: authedQuery
    .input(
      z.object({
        courseCode: z.string(),
        moduleId: z.string(),
        score: z.number().min(0).max(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const course = getCourse(input.courseCode);
      if (!course) throw new Error("Unknown course.");
      const module = course.modules.find((m) => m.id === input.moduleId);
      if (!module) throw new Error("Unknown module for this course.");

      const db = getDb();
      const existing = await db.query.quizScores.findFirst({
        where: and(
          eq(schema.quizScores.userId, ctx.user.id),
          eq(schema.quizScores.moduleId, input.moduleId),
        ),
      });
      if (existing) {
        await db
          .update(schema.quizScores)
          .set({
            bestScore: Math.max(existing.bestScore, input.score),
            attempts: existing.attempts + 1,
            updatedAt: new Date(),
          })
          .where(
            and(
              eq(schema.quizScores.userId, ctx.user.id),
              eq(schema.quizScores.moduleId, input.moduleId),
            ),
          );
      } else {
        await db.insert(schema.quizScores).values({
          userId: ctx.user.id,
          courseCode: course.code,
          moduleId: input.moduleId,
          bestScore: input.score,
          attempts: 1,
        });
      }
      return { ok: true, bestScore: Math.max(existing?.bestScore ?? 0, input.score) };
    }),

  /** Everything the dashboard needs: lesson completions, gate attempts,
   *  certificates — for the signed-in user. */
  myOverview: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const [progress, attempts, certs, quizzes, aipab] = await Promise.all([
      db
        .select()
        .from(schema.lessonProgress)
        .where(eq(schema.lessonProgress.userId, ctx.user.id)),
      db
        .select()
        .from(schema.gateAttempts)
        .where(eq(schema.gateAttempts.userId, ctx.user.id))
        .orderBy(desc(schema.gateAttempts.startedAt)),
      db
        .select()
        .from(schema.certificates)
        .where(eq(schema.certificates.userId, ctx.user.id))
        .orderBy(desc(schema.certificates.issuedAt)),
      db
        .select()
        .from(schema.quizScores)
        .where(eq(schema.quizScores.userId, ctx.user.id)),
      db
        .select()
        .from(schema.aipabAttempts)
        .where(eq(schema.aipabAttempts.userId, ctx.user.id))
        .orderBy(desc(schema.aipabAttempts.startedAt)),
    ]);

    return {
      progress,
      attempts: attempts.map((a) => ({
        id: a.id,
        courseCode: a.courseCode,
        startedAt: a.startedAt,
        completedAt: a.completedAt,
        mcScore: a.mcScore,
        practicalScore: a.practicalScore,
        passed: a.passed,
      })),
      certificates: certs,
      quizScores: quizzes,
      aipabAttempts: aipab.map((a) => ({
        id: a.id,
        startedAt: a.startedAt,
        completedAt: a.completedAt,
        placementRung: a.placementRung,
        placementPlus: a.placementPlus,
      })),
      courseOrder: courses.map((c) => c.code),
    };
  }),

  /** Per-course lesson completion map for the signed-in user. */
  courseProgress: authedQuery
    .input(z.object({ courseCode: z.string() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const [rows, quizzes] = await Promise.all([
        db
          .select()
          .from(schema.lessonProgress)
          .where(
            and(
              eq(schema.lessonProgress.userId, ctx.user.id),
              eq(schema.lessonProgress.courseCode, input.courseCode),
            ),
          ),
        db
          .select()
          .from(schema.quizScores)
          .where(
            and(
              eq(schema.quizScores.userId, ctx.user.id),
              eq(schema.quizScores.courseCode, input.courseCode),
            ),
          ),
      ]);
      return {
        lessons: rows.map((r) => ({ lessonId: r.lessonId, completedAt: r.completedAt })),
        quizScores: quizzes.map((q) => ({
          moduleId: q.moduleId,
          bestScore: q.bestScore,
          attempts: q.attempts,
        })),
      };
    }),
});
