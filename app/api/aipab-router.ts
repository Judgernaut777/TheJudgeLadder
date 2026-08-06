// AIPAB — Artificial Intelligence Placement Aptitude Battery.
// One 4-hour adaptive sitting through a fixed section order. Advancement:
// >=85% MC AND >=90% practical. Failing 302 locks 402/502 but core continues;
// any other failure ends the battery. Output is a placement, not a percentage.
import { z } from "zod";
import { and, desc, eq, isNull } from "drizzle-orm";
import { TRPCError } from "@trpc/server";
import * as schema from "@db/schema";
import {
  AIPAB_DURATION_MINUTES,
  AIPAB_SECTION_ORDER,
  MC_PASS,
  PRACTICAL_PASS,
} from "@contracts/content";
import type { InstrumentAnswers } from "@contracts/content/types";
import { getDb } from "./queries/connection";
import { authedQuery, createRouter } from "./middleware";
import { getAipabSection } from "./content/aipab";
import { sanitizeInstrument, sanitizeMC } from "./content/sanitize";
import { scoreInstrument, scoreMc } from "./scoring";

export interface SectionResult {
  courseCode: string;
  mcScore: number;
  practicalScore: number;
  passed: boolean;
  skipped?: boolean;
}

/** Core rung a section places against (supplementals share their rung). */
const SECTION_RUNG: Record<string, number> = {
  "101": 1, "201": 2, "301": 3, "302": 3,
  "401": 4, "402": 4, "501": 5, "502": 5,
};
const CORE_SECTIONS = new Set(["101", "201", "301", "401", "501"]);
const SUPPLEMENTAL_OF_RUNG: Record<number, string> = { 3: "302", 4: "402", 5: "502" };

// Exported for unit tests.
export function computePlacement(results: SectionResult[]): { rung: number; plus: boolean } {
  const cleared = new Set(results.filter((r) => r.passed).map((r) => r.courseCode));
  let rung = 0;
  for (const code of ["101", "201", "301", "401", "501"]) {
    if (cleared.has(code)) rung = Math.max(rung, SECTION_RUNG[code]);
  }
  const supp = SUPPLEMENTAL_OF_RUNG[rung];
  const plus = rung >= 3 && supp !== undefined && cleared.has(supp);
  return { rung, plus };
}

/** Next section index, applying the 302-failure branch lock. -1 = battery over. */
export function nextIndex(currentIndex: number, branchLocked: boolean): number {
  let i = currentIndex + 1;
  while (i < AIPAB_SECTION_ORDER.length) {
    const code = AIPAB_SECTION_ORDER[i];
    if (branchLocked && (code === "402" || code === "502")) {
      i += 1;
      continue;
    }
    return i;
  }
  return -1;
}

async function finalize(attempt: schema.AipabAttempt) {
  const results = (attempt.sections as SectionResult[] | null) ?? [];
  const placement = computePlacement(results);
  await getDb()
    .update(schema.aipabAttempts)
    .set({
      completedAt: new Date(),
      placementRung: placement.rung,
      placementPlus: placement.plus,
    })
    .where(eq(schema.aipabAttempts.id, attempt.id));
  return placement;
}

function attemptSummary(a: schema.AipabAttempt) {
  return {
    id: a.id,
    startedAt: a.startedAt,
    deadline: a.deadline,
    completedAt: a.completedAt,
    branchLocked: a.branchLocked,
    currentCourseCode: a.completedAt
      ? null
      : (AIPAB_SECTION_ORDER[a.currentIndex] ?? null),
    sectionIndex: a.currentIndex,
    sectionCount: AIPAB_SECTION_ORDER.length,
    results: ((a.sections as SectionResult[] | null) ?? []).map((r) => ({
      courseCode: r.courseCode,
      passed: r.passed,
      skipped: r.skipped ?? false,
    })),
    placement:
      a.completedAt && a.placementRung != null
        ? { rung: a.placementRung, plus: a.placementPlus ?? false }
        : null,
  };
}

/** Whether a completed AIPAB placement covers a course prerequisite.
 *  Core x01 at rung n: placement rung >= n. Supplementals require the "+"
 *  at their rung (which by construction includes that section cleared). */
export function placementCoversCourse(
  placement: { rung: number; plus: boolean },
  courseCode: string,
): boolean {
  if (CORE_SECTIONS.has(courseCode)) return placement.rung >= SECTION_RUNG[courseCode];
  const suppRung = SECTION_RUNG[courseCode]; // 302/402/502
  return placement.plus && placement.rung >= suppRung;
}

/** The user's best completed placement across all batteries. */
export async function bestPlacement(
  userId: number,
): Promise<{ rung: number; plus: boolean } | null> {
  const rows = await getDb()
    .select()
    .from(schema.aipabAttempts)
    .where(eq(schema.aipabAttempts.userId, userId));
  let best: { rung: number; plus: boolean } | null = null;
  for (const r of rows) {
    if (!r.completedAt || r.placementRung == null) continue;
    const p = { rung: r.placementRung, plus: r.placementPlus ?? false };
    if (!best || p.rung > best.rung || (p.rung === best.rung && p.plus && !best.plus)) {
      best = p;
    }
  }
  return best;
}

export const aipabRouter = createRouter({
  /** Begin a battery. One active sitting per user; retakes start a new sitting. */
  start: authedQuery.mutation(async ({ ctx }) => {
    const db = getDb();
    const active = await db.query.aipabAttempts.findFirst({
      where: and(
        eq(schema.aipabAttempts.userId, ctx.user.id),
        isNull(schema.aipabAttempts.completedAt),
      ),
    });
    if (active) return { attempt: attemptSummary(active) };

    const deadline = new Date(Date.now() + AIPAB_DURATION_MINUTES * 60 * 1000);
    const [{ id }] = await db
      .insert(schema.aipabAttempts)
      .values({ userId: ctx.user.id, deadline, currentIndex: 0, sections: [] })
      .$returningId();
    const attempt = await db.query.aipabAttempts.findFirst({
      where: eq(schema.aipabAttempts.id, id),
    });
    return { attempt: attemptSummary(attempt!) };
  }),

  /** Current battery state; finalizes automatically if the clock has run out. */
  state: authedQuery.query(async ({ ctx }) => {
    const db = getDb();
    const attempt = await db.query.aipabAttempts.findFirst({
      where: eq(schema.aipabAttempts.userId, ctx.user.id),
      orderBy: desc(schema.aipabAttempts.startedAt),
    });
    if (!attempt) return { attempt: null };
    if (!attempt.completedAt && new Date() > attempt.deadline) {
      await finalize(attempt);
      const fresh = await db.query.aipabAttempts.findFirst({
        where: eq(schema.aipabAttempts.id, attempt.id),
      });
      return { attempt: fresh ? attemptSummary(fresh) : null };
    }
    return { attempt: attemptSummary(attempt) };
  }),

  /** Sanitized content of the section currently in play. */
  currentSection: authedQuery
    .input(z.object({ attemptId: z.number() }))
    .query(async ({ ctx, input }) => {
      const db = getDb();
      const attempt = await db.query.aipabAttempts.findFirst({
        where: and(
          eq(schema.aipabAttempts.id, input.attemptId),
          eq(schema.aipabAttempts.userId, ctx.user.id),
        ),
      });
      if (!attempt) throw new TRPCError({ code: "NOT_FOUND", message: "Battery not found." });
      if (attempt.completedAt)
        throw new TRPCError({ code: "BAD_REQUEST", message: "This battery has ended." });
      if (new Date() > attempt.deadline) {
        await finalize(attempt);
        throw new TRPCError({ code: "BAD_REQUEST", message: "Time expired. The battery has ended." });
      }
      const code = AIPAB_SECTION_ORDER[attempt.currentIndex];
      const section = getAipabSection(code);
      if (!section) throw new TRPCError({ code: "NOT_FOUND", message: "Section bank missing." });
      return {
        courseCode: code,
        sectionIndex: attempt.currentIndex,
        sectionCount: AIPAB_SECTION_ORDER.length,
        thresholds: { mc: MC_PASS, practical: PRACTICAL_PASS },
        mcBank: section.mcBank.map(sanitizeMC),
        practical: sanitizeInstrument(section.practical),
      };
    }),

  /** Submit the current section. Pass advances; fail ends the battery
   *  (except 302, which locks the supplemental branch and continues). */
  submitSection: authedQuery
    .input(
      z.object({
        attemptId: z.number(),
        mcAnswers: z.record(z.string(), z.unknown()),
        practicalAnswers: z.record(z.string(), z.unknown()),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const db = getDb();
      const attempt = await db.query.aipabAttempts.findFirst({
        where: and(
          eq(schema.aipabAttempts.id, input.attemptId),
          eq(schema.aipabAttempts.userId, ctx.user.id),
        ),
      });
      if (!attempt) throw new TRPCError({ code: "NOT_FOUND", message: "Battery not found." });
      if (attempt.completedAt)
        throw new TRPCError({ code: "BAD_REQUEST", message: "This battery has ended." });
      if (new Date() > attempt.deadline) {
        const placement = await finalize(attempt);
        return { timedOut: true as const, placement };
      }

      const code = AIPAB_SECTION_ORDER[attempt.currentIndex];
      const section = getAipabSection(code);
      if (!section) throw new TRPCError({ code: "NOT_FOUND", message: "Section bank missing." });

      const mc = scoreMc(section.mcBank, input.mcAnswers);
      const units = scoreInstrument(
        section.practical,
        (input.practicalAnswers as InstrumentAnswers)[section.practical.id] ?? {},
      );
      const practicalScore =
        units.length === 0 ? 1 : units.filter((u) => u.correct).length / units.length;
      const passed = mc.score >= MC_PASS && practicalScore >= PRACTICAL_PASS;

      const results = (attempt.sections as SectionResult[] | null) ?? [];
      results.push({ courseCode: code, mcScore: mc.score, practicalScore, passed });

      const failed302 = code === "302" && !passed;
      const branchLocked = attempt.branchLocked || failed302;
      const ends = !passed && !failed302;
      const ni = ends ? -1 : nextIndex(attempt.currentIndex, branchLocked);

      await db
        .update(schema.aipabAttempts)
        .set({
          sections: results,
          branchLocked,
          currentIndex: ni === -1 ? attempt.currentIndex : ni,
        })
        .where(eq(schema.aipabAttempts.id, attempt.id));

      if (ends || ni === -1) {
        const fresh = await db.query.aipabAttempts.findFirst({
          where: eq(schema.aipabAttempts.id, attempt.id),
        });
        const placement = await finalize(fresh!);
        return {
          timedOut: false as const,
          sectionPassed: passed,
          mcScore: mc.score,
          practicalScore,
          batteryEnded: true as const,
          endReason: ends ? ("failed" as const) : ("completed" as const),
          placement,
        };
      }

      return {
        timedOut: false as const,
        sectionPassed: passed,
        mcScore: mc.score,
        practicalScore,
        batteryEnded: false as const,
        branchLocked,
        nextCourseCode: AIPAB_SECTION_ORDER[ni],
      };
    }),
});
