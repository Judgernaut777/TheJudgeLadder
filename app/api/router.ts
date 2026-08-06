import { aipabRouter } from "./aipab-router";
import { authRouter } from "./auth-router";
import { certsRouter } from "./certs-router";
import { gateRouter } from "./gate-router";
import { localAuthRouter } from "./local-auth-router";
import { progressRouter } from "./progress-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  auth: authRouter,
  localAuth: localAuthRouter,
  progress: progressRouter,
  gate: gateRouter,
  certs: certsRouter,
  aipab: aipabRouter,
});

export type AppRouter = typeof appRouter;
