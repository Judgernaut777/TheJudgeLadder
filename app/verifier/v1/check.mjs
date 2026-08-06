#!/usr/bin/env node
// Verifier v1 — static + structural checks for the AIJL webapp.
// Run from project root: node verifier/v1/check.mjs
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
let failures = [];
const ok = (name, cond, detail = "") => {
  console.log(`${cond ? "PASS" : "FAIL"}  ${name}${detail ? " — " + detail : ""}`);
  if (!cond) failures.push(name);
};

// 3/4. Course content + gate structure (import via tsx; gates are SERVER-side
// under api/content/gates — keyed instruments never ship to the client).
const contentCheck = execSync(
  `npx tsx -e '
    import { courses } from "./contracts/content/index";
    import { gates } from "./api/content/gates/index";
    const out = [];
    for (const c of courses) {
      const lessons = c.modules.flatMap(m => m.lessons);
      const thin = lessons.filter(l => l.blocks.filter(b => b.type === "paragraph").length < 2);
      const practiceNoKey = lessons.flatMap(l => (l.practice ?? []).filter(p => !("key" in p)).map(p => p.id));
      const gate = gates[c.code];
      out.push({
        code: c.code,
        modules: c.modules.length,
        lessons: lessons.length,
        mcItems: gate ? gate.mcBank.length : 0,
        practicals: gate ? gate.practicals.length : 0,
        practicalKeysMissing: gate ? gate.practicals.filter(p => !("key" in p)).map(p => p.id) : ["<no gate>"],
        thinLessons: thin.map(l => l.id),
        practiceNoKey,
      });
    }
    console.log(JSON.stringify(out));
  '`,
  { cwd: root, encoding: "utf8" }
);
const report = JSON.parse(contentCheck.trim().split("\n").pop());
const expected = ["101", "201", "301", "302", "401", "402", "501", "502"];
ok("8 courses present", expected.every((e) => report.some((r) => r.code === e)),
  report.map((r) => r.code).join(","));
for (const r of report) {
  ok(`course ${r.code} has modules/lessons`, r.modules >= 1 && r.lessons >= 8,
    `${r.modules} modules, ${r.lessons} lessons`);
  ok(`course ${r.code} no thin lessons`, r.thinLessons.length === 0,
    r.thinLessons.join(",") || "all lessons >= 2 paragraphs");
  ok(`course ${r.code} practice keyed`, r.practiceNoKey.length === 0,
    r.practiceNoKey.join(",") || "all practice instruments keyed");
  ok(`course ${r.code} MC bank >= 15`, r.mcItems >= 15, `${r.mcItems} items`);
  ok(`course ${r.code} has practicals with keys`,
    r.practicals >= 1 && r.practicalKeysMissing.length === 0,
    `${r.practicals} practicals`);
}

// 5. Gate thresholds — constants live in contracts (shared), enforced in api/scoring.ts.
const contentIndex = readFileSync(join(root, "contracts/content/index.ts"), "utf8");
ok("MC threshold 85%", /MC_PASS\s*=\s*0?\.85/.test(contentIndex));
ok("Practical threshold 90%", /PRACTICAL_PASS\s*=\s*0?\.9/.test(contentIndex));
const scoring = readFileSync(join(root, "api/scoring.ts"), "utf8");
ok("scoring enforces BOTH thresholds",
  scoring.includes("MC_PASS") && scoring.includes("PRACTICAL_PASS") &&
  /mc\.score >= MC_PASS && practicalScore >= PRACTICAL_PASS/.test(scoring.replace(/\s+/g, " ")) ||
  /score >= MC_PASS && practicalScore >= PRACTICAL_PASS/.test(scoring.replace(/\s+/g, " ")));

// 6. Spelling
const src = execSync('grep -r "Artificial Intelligence Judgment" src/ contracts/ || true', { cwd: root, encoding: "utf8" });
ok("no American 'Judgment' in product name", src.trim() === "");

// 7. Revised supplemental gates
const courseFiles = readdirSync(join(root, "contracts/content")).filter((f) => f.startsWith("course-"));
const allContent = courseFiles.map((f) => readFileSync(join(root, "contracts/content", f), "utf8")).join("\n");
ok("302 revised gate", allContent.includes("operate a known AI stack safely"));
ok("402 revised gate", allContent.includes("contain an agent against injection"));
ok("502 revised gate", allContent.includes("account for itself in the record it emits"));

// 2. Build artifacts (backend graft sets outDir to dist/public; api bundles to dist/boot.js)
ok("build artifact: dist/public/index.html", existsSync(join(root, "dist/public/index.html")));
ok("build artifact: dist/boot.js", existsSync(join(root, "dist/boot.js")));

// 8/9/10. Files exist + wiring
for (const f of ["Dockerfile", "docker-compose.yml", "api/scoring.ts", "api/local-auth.ts", "db/schema.ts"]) {
  ok(`exists: ${f}`, existsSync(join(root, f)));
}
const schema = readFileSync(join(root, "db/schema.ts"), "utf8");
for (const t of ["lessonProgress", "gateAttempts", "certificates", "localCredentials"]) {
  ok(`schema table: ${t}`, schema.includes(t));
}
const boot = readFileSync(join(root, "api/boot.ts"), "utf8");
ok("migrations run at boot", boot.includes("drizzle-orm/mysql2/migrator"));
const compose = existsSync(join(root, "docker-compose.yml"))
  ? readFileSync(join(root, "docker-compose.yml"), "utf8") : "";
ok("compose: mysql service", /mysql/i.test(compose));
ok("compose: LOCAL_AUTH wired", compose.includes("LOCAL_AUTH"));
const migrationDir = join(root, "db/migrations");
ok("migration SQL generated",
  existsSync(migrationDir) && readdirSync(migrationDir).some((f) => f.endsWith(".sql")));

console.log(failures.length ? `\n${failures.length} FAILURES` : "\nALL CHECKS PASSED");
process.exit(failures.length ? 1 : 0);
