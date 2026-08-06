# AIJL Academy — The Judge Ladder webapp

Self-paced web delivery of the AIJL (Artificial Intelligence Judgement Ladder)
curriculum: 8 courses (101, 201, 301, 302, 401, 402, 501, 502), 33 modules,
auto-scored module quizzes, auto-scored gate practicals, the AIPAB placement
battery, progress tracking, and verifiable certificates.

## Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, shadcn/ui
- **Backend**: Hono + tRPC 11 + Drizzle ORM
- **Database**: MySQL (platform-managed online; Docker MySQL locally)
- **Auth**: Kimi OAuth online; username/password (`LOCAL_AUTH=true`) for
  self-hosted Docker runs

## Run locally (Docker, batteries included)

```bash
docker compose up --build
# open http://localhost:3000 and create an account
```

App + MySQL 8.4 in one compose file; migrations apply automatically at boot;
data persists in the `db_data` volume.

## Run locally (dev server)

```bash
npm install        # regenerates package-lock.json if absent
npm run dev        # http://localhost:3000
```

Dev mode needs a MySQL `DATABASE_URL` in `.env` (see `.env.example`).

## Scripts

| Command            | Purpose                                  |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Vite dev server + API (port 3000)        |
| `npm run build`    | Frontend bundle + bundled API server     |
| `npm run check`    | TypeScript typecheck                     |
| `npm run test`     | Vitest unit tests (scoring, instruments) |
| `npm run db:generate` | Generate Drizzle migrations offline   |

## Verifier

`verifier/` holds the internal acceptance harness: versioned criteria
(`v1/`, `v2/`), an append-only run index (`README.md`), and timestamped run
records (`runs/`). Run `node verifier/v2/check.mjs` to validate the content
and wiring contracts (v2 is a superset that executes v1 first).

## Notes

- `package-lock.json` is not included in this source export; `npm install`
  (or the Dockerfile's fallback) regenerates it.
- Gate and AIPAB answer keys are server-only (`api/content/`,
  `api/scoring.ts`); the client receives sanitized instruments.
- `.env` contains deployment secrets and is never committed; use
  `.env.example` as the template.
