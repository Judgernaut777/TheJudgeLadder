// Unit tests for the AIPAB battery's adaptive and placement logic.
import { describe, expect, it } from "vitest";
import {
  computePlacement,
  nextIndex,
  placementCoversCourse,
  type SectionResult,
} from "./aipab-router";
import { AIPAB_SECTION_ORDER } from "@contracts/content";

function res(courseCode: string, passed: boolean): SectionResult {
  return { courseCode, mcScore: passed ? 1 : 0.5, practicalScore: passed ? 1 : 0.5, passed };
}

describe("nextIndex — section advancement and the 302 branch lock", () => {
  it("advances linearly when unlocked", () => {
    expect(nextIndex(0, false)).toBe(1);
    expect(nextIndex(2, false)).toBe(3); // 301 -> 302
    expect(nextIndex(6, false)).toBe(7);
  });

  it("ends the battery after 502", () => {
    expect(nextIndex(7, false)).toBe(-1);
  });

  it("skips 402 and 502 when the branch is locked, core continues", () => {
    const i401 = AIPAB_SECTION_ORDER.indexOf("401");
    const i501 = AIPAB_SECTION_ORDER.indexOf("501");
    // After 302 (failed) -> 401 still offered
    expect(nextIndex(AIPAB_SECTION_ORDER.indexOf("302"), true)).toBe(i401);
    // After 401 -> 402 skipped -> 501
    expect(nextIndex(i401, true)).toBe(i501);
    // After 501 -> 502 skipped -> battery over
    expect(nextIndex(i501, true)).toBe(-1);
  });
});

describe("computePlacement", () => {
  it("no sections cleared -> Rung 0", () => {
    expect(computePlacement([res("101", false)])).toEqual({ rung: 0, plus: false });
  });

  it("clearing 101 and 201 -> Rung 2, no plus possible", () => {
    expect(computePlacement([res("101", true), res("201", true), res("301", false)])).toEqual({
      rung: 2,
      plus: false,
    });
  });

  it("301 and 302 cleared -> Rung 3+", () => {
    expect(
      computePlacement([res("101", true), res("201", true), res("301", true), res("302", true)]),
    ).toEqual({ rung: 3, plus: true });
  });

  it("302 failed but 401 cleared -> Rung 4 without plus", () => {
    expect(
      computePlacement([
        res("101", true), res("201", true), res("301", true),
        res("302", false), res("401", true),
      ]),
    ).toEqual({ rung: 4, plus: false });
  });

  it("full clear -> Rung 5+", () => {
    expect(
      computePlacement(AIPAB_SECTION_ORDER.map((c) => res(c, true))),
    ).toEqual({ rung: 5, plus: true });
  });

  it("clearing 501 without 502 -> Rung 5, no plus", () => {
    expect(
      computePlacement([
        res("101", true), res("201", true), res("301", true), res("302", true),
        res("401", true), res("402", true), res("501", true), res("502", false),
      ]),
    ).toEqual({ rung: 5, plus: false });
  });
});

describe("placementCoversCourse — placement substitutes prerequisite certs", () => {
  it("Rung 2 covers 101 and 201 only", () => {
    const p = { rung: 2, plus: false };
    expect(placementCoversCourse(p, "101")).toBe(true);
    expect(placementCoversCourse(p, "201")).toBe(true);
    expect(placementCoversCourse(p, "301")).toBe(false);
    expect(placementCoversCourse(p, "302")).toBe(false);
  });

  it("Rung 4 without plus covers core through 401 but not 302/402", () => {
    const p = { rung: 4, plus: false };
    expect(placementCoversCourse(p, "401")).toBe(true);
    expect(placementCoversCourse(p, "302")).toBe(false);
    expect(placementCoversCourse(p, "402")).toBe(false);
  });

  it("Rung 4+ covers 302 and 402", () => {
    const p = { rung: 4, plus: true };
    expect(placementCoversCourse(p, "302")).toBe(true);
    expect(placementCoversCourse(p, "402")).toBe(true);
    expect(placementCoversCourse(p, "502")).toBe(false);
  });

  it("Rung 5+ covers everything", () => {
    const p = { rung: 5, plus: true };
    for (const c of ["101", "201", "301", "302", "401", "402", "501", "502"]) {
      expect(placementCoversCourse(p, c)).toBe(true);
    }
  });
});
