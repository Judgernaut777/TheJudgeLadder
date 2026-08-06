# Verifier index

Append-only. One entry per version.

| Version | Created | What it measures | Differs from prior |
|---|---|---|---|
| v1 | 2026-08-06 | Structural content checks (8 courses, modules, lessons, MC banks, practicals), gate thresholds (85/90), "Judgement" spelling, revised supplemental gate wording, presence of Docker/local-auth/schema files, DB table names. Plus `npm run check`, `npm run build`, `npm run test` recorded in runs/. | Initial version. |
| v2 | 2026-08-06 | Superset of v1 (re-runs v1 first). Adds: per-module quizzes (>=4 keyed MC, all 33 modules), 201 gate Part 2A (tableFill freeText extraction over 5 inputs), 501 gate 2A permission determination + 2B audit series (reconstruct / answerability / drift with explicit no-drift category), AIPAB battery (8 parallel section banks, fixed order, 240-min clock, 302 branch-lock, placement-substitutes-prerequisites wiring), quizScores + aipabAttempts persistence with migration SQL, freeText scoring normalization tests, /aipab + module-quiz routes. | Extends v1 to the user-selected feature set (module quizzes, AIPAB, badges); closes 201/501 gate spec-coverage gaps. Nothing weakened. |

Run records are appended to `verifier/runs/` (one file per run, timestamped).

## Runs

| Date | Criteria | Result | Record |
|---|---|---|---|
| 2026-08-06 | v1 (+ same-day amendments) | ALL CHECKS PASSED — check: 0 errors, test: 8/8, build: ok, check.mjs: exit 0 | `runs/2026-08-06-v1-run-1.txt` |
| 2026-08-06 | v2 (superset of v1) | ALL CHECKS PASSED (v1 + v2) — check: 0 errors, test: 24/24, build: ok, v2 check.mjs: exit 0 | `runs/2026-08-06-v2-run-1.txt` |
| 2026-08-06 | v2 | ALL CHECKS PASSED (v1 + v2) — "The Register" visual redesign; check: 0 errors, test: 24/24, build: ok, check.mjs: exit 0 | `runs/2026-08-06-v2-run-2.txt` |
