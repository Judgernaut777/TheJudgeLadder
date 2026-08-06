#!/usr/bin/env node
// Verifier v2 — superset of v1. Runs v1 checks first, then v2's own.
// Run from project root: node verifier/v2/check.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
let failures = [];
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!cond) failures.push(name);
};

// ── v1 carried forward ─────────────────────────────────────────
console.log("── v1 criteria ──");
try {
  execSync("node verifier/v1/check.mjs", { cwd: root, stdio: "inherit" });
  ok("v1 suite", true);
} catch {
  ok("v1 suite", false, "v1 check.mjs exited non-zero");
}

console.log("── v2 criteria ──");

// 1/2/3/4/5. Content + gate + AIPAB structure (gates and AIPAB banks are
// SERVER-side; keyed instruments never ship to the client).
const contentCheck = execSync(
  `npx tsx -e '
    import { courses } from "./contracts/content/index";
    import { gates } from "./api/content/gates/index";
    import { aipabSections } from "./api/content/aipab/index";
    const out = {
      courses: courses.map(c => ({
        code: c.code,
        modules: c.modules.length,
        modulesWithQuiz: c.modules.filter(m => (m.quiz?.length ?? 0) >= 4).length,
        quizItemsKeyed: c.modules.every(m => (m.quiz ?? []).every(q => typeof q.answer === "number")),
      })),
      gate201: {
        practicalKinds: gates["201"].practicals.map(p => p.kind),
        hasFreeText: gates["201"].practicals.some(p => p.kind === "tableFill" && p.columns.some(c => c.freeText)),
        allKeyed: gates["201"].practicals.every(p => "key" in p),
        tableRows: gates["201"].practicals.filter(p => p.kind === "tableFill").map(p => p.rows.length),
      },
      gate501: {
        practicalIds: gates["501"].practicals.map(p => p.id),
        practicalKinds: gates["501"].practicals.map(p => p.kind),
        allKeyed: gates["501"].practicals.every(p => "key" in p),
        driftHasNoDriftCategory: gates["501"].practicals.some(p =>
          p.kind === "classification" && p.categories.some(c => /no drift/i.test(c.label))),
        permissionDetermination: gates["501"].practicals.some(p =>
          p.kind === "classification" && p.categories.some(c => /permitted/i.test(c.label))),
      },
      aipab: ["101","201","301","302","401","402","501","502"].map(code => {
        const s = aipabSections[code];
        return {
          courseCode: code,
          present: !!s,
          mc: s ? s.mcBank.length : 0,
          mcKeyed: s ? s.mcBank.every(q => typeof q.answer === "number") : false,
          practicalsKeyed: s ? "key" in s.practical : false,
          practicalKind: s ? s.practical.kind : "<missing>",
        };
      }),
    };
    console.log(JSON.stringify(out));
  '`,
  { cwd: root, encoding: "utf8" }
);
const report = JSON.parse(contentCheck.trim().split("\n").pop());

// 1. Module quizzes
for (const c of report.courses) {
  ok(`course ${c.code}: every module has a >=4-item keyed quiz`,
    c.modulesWithQuiz === c.modules && c.quizItemsKeyed,
    `${c.modulesWithQuiz}/${c.modules} modules`);
}

// 2. 201 gate Part 2A
ok("201 gate: >=2 practicals", report.gate201.practicalKinds.length >= 2,
  report.gate201.practicalKinds.join(","));
ok("201 gate: 2A is tableFill with freeText over 5 inputs",
  report.gate201.hasFreeText && report.gate201.tableRows.some((n) => n === 5),
  `rows: ${report.gate201.tableRows.join(",")}`);
ok("201 gate: all practicals keyed", report.gate201.allKeyed);

// 3/4. 501 gate
ok("501 gate: >=4 practicals (2A x2 + 2B series)",
  report.gate501.practicalKinds.length >= 4,
  report.gate501.practicalIds.join(","));
ok("501 gate: has matrix construct", report.gate501.practicalKinds.includes("matrix"));
ok("501 gate: 2A critique is permission determination", report.gate501.permissionDetermination);
ok("501 gate: 2B includes answerability booleanSet",
  report.gate501.practicalKinds.includes("booleanSet"));
ok("501 gate: drift determination includes explicit no-drift category",
  report.gate501.driftHasNoDriftCategory);
ok("501 gate: all practicals keyed", report.gate501.allKeyed);

// 5. AIPAB structure
const expectedOrder = ["101", "201", "301", "302", "401", "402", "501", "502"];
ok("AIPAB: 8 sections in fixed order",
  report.aipab.length === 8 && report.aipab.every((s, i) => s.present && s.courseCode === expectedOrder[i]),
  report.aipab.map((s) => s.courseCode).join(","));
for (const s of report.aipab) {
  ok(`AIPAB ${s.courseCode}: >=8 keyed MC + keyed practical`,
    s.mc >= 8 && s.mcKeyed && s.practicalsKeyed,
    `${s.mc} MC, practical: ${s.practicalKind}`);
}
const contentIndex = readFileSync(join(root, "contracts/content/index.ts"), "utf8");
ok("AIPAB: 240-minute clock", /AIPAB_DURATION_MINUTES\s*=\s*240/.test(contentIndex));
ok("AIPAB: fixed section order constant", contentIndex.includes("AIPAB_SECTION_ORDER"));
const aipabRouter = readFileSync(join(root, "api/aipab-router.ts"), "utf8");
ok("AIPAB: 302 branch-lock rule", aipabRouter.includes("branchLocked"));
ok("AIPAB: placement substitutes prerequisites",
  aipabRouter.includes("placementCoversCourse"));
const gateRouter = readFileSync(join(root, "api/gate-router.ts"), "utf8");
ok("gate router consults placement for prerequisites",
  gateRouter.includes("placementCoversCourse"));

// 6. Persistence
const schema = readFileSync(join(root, "db/schema.ts"), "utf8");
for (const t of ["quizScores", "aipabAttempts"]) {
  ok(`schema table: ${t}`, schema.includes(t));
}
const migrationDir = join(root, "db/migrations");
const migrationSql = existsSync(migrationDir)
  ? readdirSync(migrationDir).filter((f) => f.endsWith(".sql"))
      .map((f) => readFileSync(join(migrationDir, f), "utf8")).join("\n")
  : "";
ok("migration SQL covers quiz_scores + aipab_attempts",
  migrationSql.includes("quiz_scores") && migrationSql.includes("aipab_attempts"));

// 7. Unit tests (already run by harness step; assert test files cover the logic)
const scoringTests = readFileSync(join(root, "api/scoring.test.ts"), "utf8");
ok("tests: freeText normalization covered", scoringTests.includes("freeText normalization"));
const aipabTests = readFileSync(join(root, "api/aipab.test.ts"), "utf8");
ok("tests: AIPAB advancement/placement covered",
  aipabTests.includes("nextIndex") && aipabTests.includes("computePlacement"));

// 8. UI routes
const appTsx = readFileSync(join(root, "src/App.tsx"), "utf8");
ok("route: /aipab", appTsx.includes("/aipab"));
ok("route: module quiz", appTsx.includes("module/:moduleId/quiz"));
ok("AIPAB page exists", existsSync(join(root, "src/pages/Aipab.tsx")));
ok("ModuleQuiz page exists", existsSync(join(root, "src/pages/ModuleQuiz.tsx")));

console.log(failures.length ? `\n${failures.length} FAILURES` : "\nALL CHECKS PASSED (v1 + v2)");
process.exit(failures.length ? 1 : 0);
