import type { Course, Lesson, Module } from "./types";
import { course101 } from "./course-101";
import { course201 } from "./course-201";
import { course301 } from "./course-301";
import { course302 } from "./course-302";
import { course401 } from "./course-401";
import { course402 } from "./course-402";
import { course501 } from "./course-501";
import { course502 } from "./course-502";
import { quizzesCore } from "./quizzes-core";
import { quizzesAdvanced } from "./quizzes-advanced";

const moduleQuizzes: Record<string, Module["quiz"]> = {
  ...quizzesCore,
  ...quizzesAdvanced,
};

function withQuizzes(course: Course): Course {
  return {
    ...course,
    modules: course.modules.map((m) => ({ ...m, quiz: moduleQuizzes[m.id] })),
  };
}

export const courses: Course[] = [
  course101,
  course201,
  course301,
  course302,
  course401,
  course402,
  course501,
  course502,
].map(withQuizzes);

export function getCourse(code: string): Course | undefined {
  return courses.find((c) => c.code === code || c.slug === code);
}

export function allLessons(course: Course): { module: Module; lesson: Lesson }[] {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({ module, lesson })),
  );
}

export function getLesson(course: Course, lessonId: string) {
  return allLessons(course).find((l) => l.lesson.id === lessonId);
}

export function lessonCount(course: Course): number {
  return course.modules.reduce((n, m) => n + m.lessons.length, 0);
}

/** Program-wide gate standard — ruled 2026-08-06: MC ≥85%, practical ≥90%. */
export const MC_PASS = 0.85;
export const PRACTICAL_PASS = 0.9;

export const PROGRAM_NAME = "AIJL — Artificial Intelligence Judgement Ladder";

/** The ladder itself — rung metadata for the catalog and AIPAB placement labels. */
export interface RungInfo {
  rung: number;
  name: string;
  humanRole: string;
  gate: string;
  coreCode: string; // x01 course
  supplementalCode?: string; // x02 course, rungs 3–5
}

export const RUNGS: RungInfo[] = [
  {
    rung: 1,
    name: "Chat",
    humanRole: "You steer every exchange; sealed box, no tools",
    gate: "You instinctively verify factual output",
    coreCode: "101",
  },
  {
    rung: 2,
    name: "Prompt workflows",
    humanRole: "You chain steps by hand; still sealed",
    gate: "You reuse instead of rewriting — and you feel the copy-paste friction",
    coreCode: "201",
  },
  {
    rung: 3,
    name: "Supervised action",
    humanRole: "The box opens; AI gets tools, you approve each action",
    gate: "You act on the real world safely AND you can state where your data goes",
    coreCode: "301",
    supplementalCode: "302",
  },
  {
    rung: 4,
    name: "Single-purpose agent",
    humanRole: "You set a bounded goal, review finished work",
    gate: "You handed over a goal and trust the gate enough not to watch each step — but you still review",
    coreCode: "401",
    supplementalCode: "402",
  },
  {
    rung: 5,
    name: "Autonomous / multi-agent",
    humanRole: "Systems run inside your limits; you audit the record",
    gate: "Recognize and govern, not build",
    coreCode: "501",
    supplementalCode: "502",
  },
];

/** AIPAB battery section order — fixed, ruled program-wide. */
export const AIPAB_SECTION_ORDER = ["101", "201", "301", "302", "401", "402", "501", "502"];
export const AIPAB_DURATION_MINUTES = 240;

export function placementLabel(placement: {
  rung: number;
  plus: boolean;
}): string {
  if (placement.rung <= 0) return "Rung 0 — begin at AIJL 101";
  return `Rung ${placement.rung}${placement.plus ? "+" : ""}`;
}

export * from "./types";
