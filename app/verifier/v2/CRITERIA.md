# Acceptance Criteria — v2

Created: 2026-08-06. Superset of v1 — every v1 criterion still applies and is re-run
(v2's check script executes v1's checks first, then its own). Nothing in v1 is weakened;
v2 adds criteria for the feature set the user selected on 2026-08-06:
auto-scored module quizzes, the AIPAB placement battery, progress tracking + badges,
and full spec coverage of the 201 and 501 gate practicals.

## Carried forward
- All of v1 (`verifier/v1/CRITERIA.md`), including the 85%/90% gate thresholds,
  build/check/test green, Docker + local-auth, server-side progress tables.

## New in v2

### Functional
1. **Module quizzes** — every module of every course has an attached MC quiz of
   ≥4 items, each with a keyed answer. (Practice-grade: keys ship to client;
   feedback is immediate; best score is recorded server-side.)
2. **201 gate Part 2A exists** — a structured-extraction practical over five
   novel-domain inputs: `tableFill` with at least one `freeText` column and a
   complete key, alongside the 2B judgment/transport classification.
3. **501 gate Part 2B exists** — an audit-series task set: reconstruct
   (per-run outcomes), adjudicate the record (answerable / not answerable),
   and drift determination with a fixed pattern list that includes an explicit
   "no drift present" category (two-sided by design).
4. **501 gate Part 2A critique is a permission determination** — per spec:
   given a written policy and proposed behaviors, decide whether the policy
   permits each (permits-more-than-intended items included).
5. **AIPAB battery** —
   - 8 parallel section banks (101→502), server-only, each with ≥8 MC items
     and 1 keyed practical instrument;
   - fixed section order constant `101,201,301,302,401,402,501,502` and a
     240-minute clock;
   - advancement rule enforced server-side: ≥85% MC AND ≥90% practical to
     advance; failing 302 locks 402/502 but the core continues; any other
     failure ends the battery; placement substitutes prerequisite
     certifications (core: rung ≥ course rung; supplemental: rung ≥ and "+").
6. **Quiz + AIPAB persistence** — `quizScores` (best score, attempts) and
   `aipabAttempts` tables in `db/schema.ts` with generated migration SQL.
7. **Unit tests cover the new logic** — freeText normalization in tableFill
   scoring; AIPAB advancement/branch-lock/placement arithmetic.
   `npm run test` passes.
8. **UI routes exist** for the new surface: `/aipab`,
   `/course/:slug/module/:moduleId/quiz` (source check on `src/App.tsx`).

### Non-goals (v2)
- Runtime database verification from the sandbox (platform DB is privatelink;
  exercised via migrations + boot-time auto-migrate, and by the platform preview).
- Psychometric validation of the placement battery.

## Notes
- **Criterion 2**: scored with tolerant freeText matching (case/whitespace
  normalized) — strict string equality would fail honest candidates over
  formatting, which is not what the spec's "content correctness vs key" means.
- **Criterion 5**: AIPAB sections are *parallel forms* — separate banks from the
  course gates, per the program rule that the battery never reuses a course
  gate instance.
