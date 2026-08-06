// SERVER ONLY — auto-scoring for gates. Pure functions, unit-tested.
// Program rule: gates are auto-scored. MC pass >= MC_PASS, practical pass >=
// PRACTICAL_PASS, BOTH required. No instructor judgment anywhere in scoring.
import { MC_PASS, PRACTICAL_PASS } from "@contracts/content";
import type {
  Instrument,
  InstrumentAnswers,
  MCItem,
} from "@contracts/content/types";
import type { CourseGate } from "./content/gates";

export interface GateScoreDetail {
  /** MC item ids the candidate got wrong. */
  mcWrong: string[];
  /** instrumentId -> item/spot/cell ids the candidate got wrong. */
  practicalWrong: Record<string, string[]>;
  practicalCorrect: number;
  practicalTotal: number;
}

export interface GateScore {
  mcScore: number; // 0..1 fraction correct
  practicalScore: number; // 0..1 fraction of scored units correct
  passed: boolean;
  detail: GateScoreDetail;
}

/** answers: mcItemId -> chosen option index */
export function scoreMc(
  bank: MCItem[],
  answers: Record<string, unknown>,
): { score: number; wrong: string[] } {
  const wrong: string[] = [];
  for (const item of bank) {
    if (answers[item.id] !== item.answer) wrong.push(item.id);
  }
  const total = bank.length;
  return { score: total === 0 ? 1 : (total - wrong.length) / total, wrong };
}

type UnitList = { id: string; correct: boolean }[];

function classificationUnits(
  inst: Extract<Instrument, { kind: "classification" }>,
  answers: Record<string, unknown>,
): UnitList {
  return inst.items.map((item) => ({
    id: item.id,
    correct: answers[item.id] === inst.key[item.id],
  }));
}

/** Free-text cells tolerate case and whitespace differences; fixed-choice
 *  cells require exact selection. */
const normFreeText = (v: unknown) =>
  String(v ?? "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");

function tableFillUnits(
  inst: Extract<Instrument, { kind: "tableFill" }>,
  answers: Record<string, unknown>,
): UnitList {
  const units: UnitList = [];
  for (const row of inst.rows) {
    for (const col of inst.columns) {
      const rowAnswers = (answers[row.id] ?? {}) as Record<string, unknown>;
      const given = rowAnswers[col.id];
      const expected = inst.key[row.id]?.[col.id];
      units.push({
        id: `${row.id}.${col.id}`,
        correct: col.freeText
          ? normFreeText(given) === normFreeText(expected)
          : given === expected,
      });
    }
  }
  return units;
}

function defectHuntUnits(
  inst: Extract<Instrument, { kind: "defectHunt" }>,
  answers: Record<string, unknown>,
): UnitList {
  return inst.spots.map((spot) => {
    const expected = inst.key[spot.id];
    const given = (answers[spot.id] ?? {}) as {
      defective?: unknown;
      category?: unknown;
    };
    let correct = given.defective === expected.defective;
    if (correct && expected.defective && expected.category) {
      correct = given.category === expected.category;
    }
    return { id: spot.id, correct };
  });
}

function dispositionUnits(
  inst: Extract<Instrument, { kind: "disposition" }>,
  answers: Record<string, unknown>,
): UnitList {
  return inst.items.map((item) => {
    const expected = inst.key[item.id];
    const given = (answers[item.id] ?? {}) as {
      decision?: unknown;
      reason?: unknown;
    };
    let correct = given.decision === expected.decision;
    if (correct && expected.reason) {
      correct = given.reason === expected.reason;
    }
    return { id: item.id, correct };
  });
}

function booleanSetUnits(
  inst: Extract<Instrument, { kind: "booleanSet" }>,
  answers: Record<string, unknown>,
): UnitList {
  return inst.subjects.map((subject) => ({
    id: subject.id,
    correct: answers[subject.id] === inst.key[subject.id],
  }));
}

function matrixUnits(
  inst: Extract<Instrument, { kind: "matrix" }>,
  answers: Record<string, unknown>,
): UnitList {
  return inst.actions.map((action) => ({
    id: action.id,
    correct: answers[action.id] === inst.key[action.id],
  }));
}

/** Score one practical instrument. Returns per-unit correctness. */
export function scoreInstrument(
  inst: Instrument,
  answers: Record<string, unknown>,
): UnitList {
  switch (inst.kind) {
    case "classification":
      return classificationUnits(inst, answers);
    case "tableFill":
      return tableFillUnits(inst, answers);
    case "defectHunt":
      return defectHuntUnits(inst, answers);
    case "disposition":
      return dispositionUnits(inst, answers);
    case "booleanSet":
      return booleanSetUnits(inst, answers);
    case "matrix":
      return matrixUnits(inst, answers);
  }
}

/** Score a full gate sitting. Practical score aggregates units across ALL
 *  practicals (so a course with two practicals is graded on the combined pool). */
export function scoreGate(
  gate: CourseGate,
  mcAnswers: Record<string, unknown>,
  practicalAnswers: InstrumentAnswers,
): GateScore {
  const mc = scoreMc(gate.mcBank, mcAnswers);

  let correct = 0;
  let total = 0;
  const practicalWrong: Record<string, string[]> = {};
  for (const inst of gate.practicals) {
    const units = scoreInstrument(inst, practicalAnswers[inst.id] ?? {});
    const wrongIds = units.filter((u) => !u.correct).map((u) => u.id);
    practicalWrong[inst.id] = wrongIds;
    total += units.length;
    correct += units.length - wrongIds.length;
  }
  const practicalScore = total === 0 ? 1 : correct / total;

  return {
    mcScore: mc.score,
    practicalScore,
    passed: mc.score >= MC_PASS && practicalScore >= PRACTICAL_PASS,
    detail: {
      mcWrong: mc.wrong,
      practicalWrong,
      practicalCorrect: correct,
      practicalTotal: total,
    },
  };
}
