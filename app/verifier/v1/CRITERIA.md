# Acceptance Criteria — v1

Created: 2026-08-06. Initial criteria for the AIJL self-paced webapp.

## Functional
1. `npm run check` exits 0 (zero TypeScript errors).
2. `npm run build` succeeds and produces `dist/index.html`.
3. All **8 courses** (101, 201, 301, 302, 401, 402, 501, 502) exist in content with:
   - at least 1 module; every module has at least 1 lesson;
   - every lesson has at least 3 content blocks of instructional prose;
   - every lesson's practice exercise has an answer key where applicable.
4. Every course has a **gate**: MC bank of ≥15 items, plus ≥1 practical instrument
   with a complete fixed answer key.
5. Gate passing rule is **MC ≥ 85% AND practical ≥ 90%** (user ruling, 2026-08-06),
   enforced server-side in scoring code and covered by unit tests (`npm run test` passes).
6. Spelling: product name renders **"Judgement"** — the string
   "Artificial Intelligence Judgment" (American) must not appear in `src/`.
7. Supplemental gates use the **revised** wording approved 2026-08-06:
   - 302: "operate a known AI stack safely"
   - 402: "contain an agent against injection"
   - 502: "account for itself in the record it emits"
8. Auth works in two modes: Kimi OAuth (online) and username/password (LOCAL_AUTH=true, Docker).
9. Docker: `Dockerfile` and `docker-compose.yml` exist; compose includes a MySQL service
   and the app; migrations run automatically at server boot.
10. Progress is server-side: lesson completion, gate attempts, certificates stored in DB
    (tables: lessonProgress, gateAttempts, certificates, localCredentials).

## Non-goals (v1)
- The AIPAB battery (out of scope: downstream of courses by program ruling).
- Psychometric validation, badge-platform integration.

## Amendments (2026-08-06, same day — pre-first-run clarifications, no criterion weakened)
- **Criterion 2**: the backend graft sets the Vite `outDir` to `dist/public` and bundles the
  API to `dist/boot.js`. The build artifact check therefore verifies
  `dist/public/index.html` **and** `dist/boot.js` (same intent: a servable build exists).
- **Criterion 3**: "3 content blocks of instructional prose" is checked as ≥2 `paragraph`
  blocks per lesson plus additional prose blocks (callouts/lists/quotes) — every lesson
  must read as instruction, not scaffolding.
- **Criterion 4**: gates live server-side under `api/content/gates/` (answer keys must never
  ship to clients). The structural check imports them from there, not from shared contracts.
- **Criterion 5**: threshold constants live in `contracts/content/index.ts` (shared so the UI
  can display them); `api/scoring.ts` enforces both, and `api/scoring.test.ts` covers the
  boundary arithmetic.
