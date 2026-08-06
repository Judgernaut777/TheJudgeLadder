import { describe, expect, it } from "vitest";
import { MC_PASS, PRACTICAL_PASS } from "@contracts/content";
import type { CourseGate } from "./content/gates";
import { gates } from "./content/gates";
import { scoreGate, scoreInstrument } from "./scoring";

// A tiny synthetic gate for threshold arithmetic.
const toyGate: CourseGate = {
  mcBank: Array.from({ length: 20 }, (_, i) => ({
    id: `mc-${i}`,
    question: `Q${i}`,
    options: ["a", "b"],
    answer: 0,
  })),
  practicals: [
    {
      kind: "booleanSet",
      id: "p1",
      title: "t",
      instructions: "t",
      display: "yesno",
      subjects: Array.from({ length: 10 }, (_, i) => ({ id: `s${i}`, label: `s${i}` })),
      key: Object.fromEntries(Array.from({ length: 10 }, (_, i) => [`s${i}`, true])),
    },
  ],
};

const allMcRight = Object.fromEntries(toyGate.mcBank.map((m) => [m.id, 0]));
const allPracticalRight = { p1: Object.fromEntries(toyGate.practicals[0].kind === "booleanSet" ? toyGate.practicals[0].subjects.map((s) => [s.id, true]) : []) };

describe("scoreGate thresholds", () => {
  it("passes when everything is correct", () => {
    const r = scoreGate(toyGate, allMcRight, allPracticalRight);
    expect(r.mcScore).toBe(1);
    expect(r.practicalScore).toBe(1);
    expect(r.passed).toBe(true);
  });

  it(`fails one MC short of the ${MC_PASS} threshold`, () => {
    // 17/20 = 0.85 passes; 16/20 = 0.80 fails.
    const mcAnswers = { ...allMcRight, "mc-0": 1, "mc-1": 1, "mc-2": 1 };
    const r = scoreGate(toyGate, mcAnswers, allPracticalRight);
    expect(r.mcScore).toBeCloseTo(0.85);
    expect(r.passed).toBe(true);
    const r2 = scoreGate(toyGate, { ...mcAnswers, "mc-3": 1 }, allPracticalRight);
    expect(r2.mcScore).toBeCloseTo(0.8);
    expect(r2.passed).toBe(false);
  });

  it(`fails one practical unit short of the ${PRACTICAL_PASS} threshold`, () => {
    // 9/10 = 0.90 passes; 8/10 = 0.80 fails.
    const p = { p1: { ...allPracticalRight.p1, s0: false } };
    const r = scoreGate(toyGate, allMcRight, p);
    expect(r.practicalScore).toBeCloseTo(0.9);
    expect(r.passed).toBe(true);
    const r2 = scoreGate(toyGate, allMcRight, { p1: { ...p.p1, s1: false } });
    expect(r2.practicalScore).toBeCloseTo(0.8);
    expect(r2.passed).toBe(false);
  });

  it("requires BOTH thresholds — a perfect MC cannot rescue a failed practical", () => {
    const r = scoreGate(toyGate, allMcRight, { p1: {} });
    expect(r.mcScore).toBe(1);
    expect(r.practicalScore).toBe(0);
    expect(r.passed).toBe(false);
  });

  it("treats missing answers as wrong (no credit for blanks)", () => {
    const r = scoreGate(toyGate, {}, {});
    expect(r.mcScore).toBe(0);
    expect(r.passed).toBe(false);
  });
});

describe("real gate banks", () => {
  it("cover all eight courses with >=15 MC items and >=1 practical", () => {
    for (const code of ["101", "201", "301", "302", "401", "402", "501", "502"]) {
      const gate = gates[code];
      expect(gate, `gate ${code}`).toBeDefined();
      expect(gate.mcBank.length, `gate ${code} MC bank`).toBeGreaterThanOrEqual(15);
      expect(gate.practicals.length, `gate ${code} practicals`).toBeGreaterThanOrEqual(1);
    }
  });

  it("keys cover every scored unit of every practical", () => {
    for (const gate of Object.values(gates)) {
      for (const inst of gate.practicals) {
        // Scoring with empty answers must mark every unit wrong, proving the
        // key spans the full item set (a partial key would silently score 0
        // units and pass vacuously at total=0).
        const units = scoreInstrument(inst, {});
        expect(units.length).toBeGreaterThan(0);
        expect(units.every((u) => !u.correct)).toBe(true);
      }
    }
  });

  it("a perfect answer set passes every real gate", () => {
    for (const gate of Object.values(gates)) {
      const mcAnswers = Object.fromEntries(gate.mcBank.map((m) => [m.id, m.answer]));
      const practicalAnswers = Object.fromEntries(
        gate.practicals.map((inst) => [inst.id, perfectAnswers(inst)]),
      );
      const r = scoreGate(gate, mcAnswers, practicalAnswers);
      expect(r.passed, `gate should pass with perfect answers`).toBe(true);
    }
  });
});

import type { Instrument } from "@contracts/content/types";

function perfectAnswers(inst: Instrument): Record<string, unknown> {
  switch (inst.kind) {
    case "classification":
      return { ...inst.key };
    case "tableFill":
      return Object.fromEntries(
        Object.entries(inst.key).map(([rowId, cols]) => [rowId, { ...cols }]),
      );
    case "defectHunt":
      return Object.fromEntries(
        Object.entries(inst.key).map(([spotId, v]) => [spotId, { ...v }]),
      );
    case "disposition":
      return Object.fromEntries(
        Object.entries(inst.key).map(([itemId, v]) => [itemId, { ...v }]),
      );
    case "booleanSet":
      return { ...inst.key };
    case "matrix":
      return { ...inst.key };
  }
}

describe("tableFill freeText normalization", () => {
  const inst: Instrument = {
    kind: "tableFill",
    id: "ft",
    title: "t",
    instructions: "t",
    columns: [
      { id: "ref", label: "Ref", freeText: true },
      { id: "kind", label: "Kind", options: ["Finance", "Tools"] },
    ],
    rows: [{ id: "r1", label: "Row 1" }],
    key: { r1: { ref: "DUE-31", kind: "Finance" } },
  };
  const frac = (units: { correct: boolean }[]) =>
    units.filter((u) => u.correct).length / units.length;

  it("accepts case and whitespace variants in freeText cells", () => {
    const units = scoreInstrument(inst, { r1: { ref: "  due-31 ", kind: "Finance" } });
    expect(frac(units)).toBe(1);
  });

  it("rejects wrong freeText values and wrong fixed choices", () => {
    const units = scoreInstrument(inst, { r1: { ref: "DUE-32", kind: "finance" } });
    expect(frac(units)).toBe(0);
  });

  it("treats empty freeText as wrong (schema conformance)", () => {
    const units = scoreInstrument(inst, { r1: { kind: "Finance" } });
    expect(frac(units)).toBe(0.5);
  });
});
