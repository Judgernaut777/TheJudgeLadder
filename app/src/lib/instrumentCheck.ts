// Client-side answer checking for PRACTICE instruments (keys ship with lesson
// content). Mirrors api/scoring.ts — which stays server-only for gates.
import type { Instrument } from "@contracts/content/types";

export interface UnitVerdict {
  id: string;
  correct: boolean;
}

export function checkInstrument(
  inst: Instrument,
  answers: Record<string, unknown>,
): UnitVerdict[] {
  switch (inst.kind) {
    case "classification":
      return inst.items.map((item) => ({
        id: item.id,
        correct: answers[item.id] === inst.key[item.id],
      }));
    case "tableFill": {
      const normFreeText = (v: unknown) =>
        String(v ?? "")
          .trim()
          .toLowerCase()
          .replace(/\s+/g, " ");
      const units: UnitVerdict[] = [];
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
    case "defectHunt":
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
    case "disposition":
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
    case "booleanSet":
      return inst.subjects.map((subject) => ({
        id: subject.id,
        correct: answers[subject.id] === inst.key[subject.id],
      }));
    case "matrix":
      return inst.actions.map((action) => ({
        id: action.id,
        correct: answers[action.id] === inst.key[action.id],
      }));
  }
}

export function verdictSummary(units: UnitVerdict[]) {
  const correct = units.filter((u) => u.correct).length;
  return { correct, total: units.length, fraction: units.length ? correct / units.length : 1 };
}
