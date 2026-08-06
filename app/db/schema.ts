import {
  mysqlTable,
  mysqlEnum,
  serial,
  varchar,
  text,
  timestamp,
  bigint,
  boolean,
  double,
  json,
  primaryKey,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/** Username/password credentials for local (Docker) deployments.
 *  Online deployments use Kimi OAuth and leave this table empty. */
export const localCredentials = mysqlTable("local_credentials", {
  userId: bigint("userId", { mode: "number", unsigned: true })
    .primaryKey()
    .notNull(),
  username: varchar("username", { length: 255 }).notNull().unique(),
  passwordHash: varchar("passwordHash", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

/** One row per completed lesson per user. */
export const lessonProgress = mysqlTable(
  "lesson_progress",
  {
    userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
    courseCode: varchar("courseCode", { length: 8 }).notNull(),
    lessonId: varchar("lessonId", { length: 64 }).notNull(),
    completedAt: timestamp("completedAt").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.lessonId] })],
);

/** Best score per module knowledge check per user (practice-grade, not gated). */
export const quizScores = mysqlTable(
  "quiz_scores",
  {
    userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
    courseCode: varchar("courseCode", { length: 8 }).notNull(),
    moduleId: varchar("moduleId", { length: 64 }).notNull(),
    bestScore: double("bestScore").notNull(),
    attempts: bigint("attempts", { mode: "number" }).notNull().default(1),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  },
  (t) => [primaryKey({ columns: [t.userId, t.moduleId] })],
);

/** A gate sitting: started, then completed with scores. */
export const gateAttempts = mysqlTable("gate_attempts", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  courseCode: varchar("courseCode", { length: 8 }).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
  mcScore: double("mcScore"),
  practicalScore: double("practicalScore"),
  passed: boolean("passed"),
  answers: json("answers"),
  detail: json("detail"),
});

/** Issued on a passed gate. The serial is the verification handle. */
export const certificates = mysqlTable("certificates", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  courseCode: varchar("courseCode", { length: 8 }).notNull(),
  confersLabel: varchar("confersLabel", { length: 128 }).notNull(),
  serial: varchar("serial", { length: 32 }).notNull().unique(),
  attemptId: bigint("attemptId", { mode: "number", unsigned: true }).notNull(),
  issuedAt: timestamp("issuedAt").defaultNow().notNull(),
});

/** An AIPAB battery sitting: one 4-hour adaptive run across the eight sections.
 *  Section results accumulate in `sections`; placement is computed at completion. */
export const aipabAttempts = mysqlTable("aipab_attempts", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  startedAt: timestamp("startedAt").defaultNow().notNull(),
  deadline: timestamp("deadline").notNull(),
  completedAt: timestamp("completedAt"),
  /** Index into the fixed section order of the section currently in play. */
  currentIndex: bigint("currentIndex", { mode: "number" }).notNull().default(0),
  /** Set when the candidate fails the 302 section: locks 402/502, core continues. */
  branchLocked: boolean("branchLocked").notNull().default(false),
  /** Array of { courseCode, mcScore, practicalScore, passed, ended } per attempted section. */
  sections: json("sections"),
  placementRung: bigint("placementRung", { mode: "number" }),
  placementPlus: boolean("placementPlus"),
});

export type GateAttempt = typeof gateAttempts.$inferSelect;
export type Certificate = typeof certificates.$inferSelect;
export type QuizScore = typeof quizScores.$inferSelect;
export type AipabAttempt = typeof aipabAttempts.$inferSelect;
