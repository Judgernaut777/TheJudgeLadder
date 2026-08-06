import * as cookie from "cookie";
import { z } from "zod";
import { Session } from "@contracts/constants";
import { env } from "./lib/env";
import { getSessionCookieOptions } from "./lib/cookies";
import { signSessionToken } from "./kimi/session";
import { createRouter, publicQuery } from "./middleware";
import { isLocalAuthEnabled, localLogin, localRegister } from "./local-auth";

const usernameSchema = z
  .string()
  .min(3, "Username must be at least 3 characters.")
  .max(64)
  .regex(/^[a-zA-Z0-9_.-]+$/, "Letters, digits, dot, dash, underscore only.");
const passwordSchema = z.string().min(8, "Password must be at least 8 characters.").max(128);

function setSessionCookie(
  resHeaders: Headers,
  reqHeaders: Headers,
  token: string,
) {
  const opts = getSessionCookieOptions(reqHeaders);
  resHeaders.append(
    "set-cookie",
    cookie.serialize(Session.cookieName, token, {
      httpOnly: opts.httpOnly,
      path: opts.path,
      sameSite: opts.sameSite?.toLowerCase() as "lax" | "none",
      secure: opts.secure,
      maxAge: Session.maxAgeMs / 1000,
    }),
  );
}

async function issueSession(resHeaders: Headers, reqHeaders: Headers, unionId: string) {
  const token = await signSessionToken({
    unionId,
    clientId: env.appId || "local",
  });
  setSessionCookie(resHeaders, reqHeaders, token);
}

export const localAuthRouter = createRouter({
  /** Tells the frontend which login mode this deployment runs. */
  mode: publicQuery.query(() => ({
    local: isLocalAuthEnabled(),
  })),

  register: publicQuery
    .input(
      z.object({
        username: usernameSchema,
        password: passwordSchema,
        displayName: z.string().max(120).optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (!isLocalAuthEnabled()) {
        throw new Error("Local authentication is not enabled on this deployment.");
      }
      const user = await localRegister(input.username, input.password, input.displayName);
      await issueSession(ctx.resHeaders, ctx.req.headers, user.unionId);
      return { ok: true, name: user.name };
    }),

  login: publicQuery
    .input(z.object({ username: usernameSchema, password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      if (!isLocalAuthEnabled()) {
        throw new Error("Local authentication is not enabled on this deployment.");
      }
      const user = await localLogin(input.username, input.password);
      await issueSession(ctx.resHeaders, ctx.req.headers, user.unionId);
      return { ok: true, name: user.name };
    }),
});
