// Shared content model for the AIJL curriculum webapp.
// Lesson content lives in contracts (shared client/server).
// Gate instruments with answer keys live SERVER-ONLY under api/content/gates/.

export type ContentBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; title: string; text: string; tone?: "info" | "warning" | "key" }
  | { type: "quote"; text: string; source?: string }
  | { type: "table"; headers: string[]; rows: string[][] };

// ---- Instruments (practice exercises and gate practicals share the engine) ----

export interface InstrumentBase {
  id: string;
  title: string;
  instructions: string;
  timeHintMinutes?: number;
}

/** Classify each item into one category. Covers claim adjudication (101),
 *  judgment/transport (201), hosting adjudication (302), drift ID, policy critique. */
export interface ClassificationInstrument extends InstrumentBase {
  kind: "classification";
  context?: ContentBlock[]; // e.g. source articles, an autonomy policy
  contextTitle?: string;
  items: { id: string; text: string; detail?: string }[];
  categories: { id: string; label: string; description?: string }[];
  key: Record<string, string>; // itemId -> categoryId
}

/** Fill cells of a table. Columns may be fixed-choice or free text. */
export interface TableFillInstrument extends InstrumentBase {
  kind: "tableFill";
  context?: ContentBlock[];
  contextTitle?: string;
  columns: { id: string; label: string; options?: string[]; freeText?: boolean }[];
  rows: { id: string; label: string; detail?: string }[];
  key: Record<string, Record<string, string>>; // rowId -> colId -> answer
}

/** Seeded-defect adjudication: mark each labelled spot defective or clean,
 *  and categorize the defect. 302/402/502 Practical A. */
export interface DefectHuntInstrument extends InstrumentBase {
  kind: "defectHunt";
  artifact: ContentBlock[];
  artifactTitle?: string;
  spots: { id: string; label: string; description?: string }[];
  categories: { id: string; label: string; description?: string }[];
  key: Record<string, { defective: boolean; category?: string }>; // spotId -> verdict
}

/** Approve/refuse a queue of proposed actions or completed runs, with reason codes.
 *  301 approval queue; 401 run review. */
export interface DispositionInstrument extends InstrumentBase {
  kind: "disposition";
  scenario: ContentBlock[];
  scenarioTitle?: string;
  items: { id: string; title: string; body: ContentBlock[] }[];
  reasonCodes: { id: string; label: string }[];
  key: Record<string, { decision: "approve" | "refuse"; reason?: string }>;
}

/** Boolean grid: for each subject, yes/no. Displayed as checklist or yes/no grid.
 *  Covers reachability (402), handoff components (401), answerability (501/502). */
export interface BooleanSetInstrument extends InstrumentBase {
  kind: "booleanSet";
  display: "yesno" | "checklist";
  context?: ContentBlock[];
  contextTitle?: string;
  yesLabel?: string; // default "Yes"
  noLabel?: string; // default "No"
  subjects: { id: string; label: string; description?: string }[];
  key: Record<string, boolean>;
}

/** Autonomy matrix: classify each action as may-do-alone / must-escalate / must-never.
 *  501 Practical A construct. */
export interface MatrixInstrument extends InstrumentBase {
  kind: "matrix";
  context?: ContentBlock[];
  contextTitle?: string;
  actions: { id: string; label: string; description?: string }[];
  levels: { id: string; label: string; description?: string }[];
  key: Record<string, string>; // actionId -> levelId
}

export type Instrument =
  | ClassificationInstrument
  | TableFillInstrument
  | DefectHuntInstrument
  | DispositionInstrument
  | BooleanSetInstrument
  | MatrixInstrument;

/** Strips the answer key — safe to send to clients for gated instruments. */
export type SanitizedInstrument =
  | Omit<ClassificationInstrument, "key">
  | Omit<TableFillInstrument, "key">
  | Omit<DefectHuntInstrument, "key">
  | Omit<DispositionInstrument, "key">
  | Omit<BooleanSetInstrument, "key">
  | Omit<MatrixInstrument, "key">;

// ---- Multiple choice ----

export interface MCItem {
  id: string;
  question: string;
  options: string[];
  answer: number; // index into options — SERVER ONLY for gate banks
  explanation?: string;
}
export type SanitizedMCItem = Omit<MCItem, "answer">;

// ---- Course structure ----

export interface Lesson {
  id: string; // e.g. "101-m1-l3"
  title: string;
  frameworkRef?: string;
  blocks: ContentBlock[];
  practice?: Instrument[]; // ungraded, immediate feedback, keys ship to client
}

export interface Module {
  id: string; // e.g. "101-m1"
  title: string;
  subtitle?: string;
  lessons: Lesson[];
  /** Auto-scored module knowledge check. Practice-grade: keys ship to the
   *  client, immediate feedback, best score persisted. Not part of the gate. */
  quiz?: MCItem[];
}

export interface Course {
  code: string; // "101"
  slug: string; // "aijl-101"
  title: string;
  rungLabel: string; // "Rung 1 — Chat"
  track: "core" | "supplemental";
  durationDays: number;
  confers: string; // "AIJL Rung 1"
  gateText: string;
  gateSource: "framework" | "authored";
  summary: string;
  prerequisites: string[]; // course codes
  modules: Module[];
}

/** Answers payload for a gated attempt: instrumentId -> itemId -> value */
export type InstrumentAnswers = Record<string, Record<string, unknown>>;
