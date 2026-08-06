// Local (Docker) authentication: username/password against the
// local_credentials table. Enabled only when LOCAL_AUTH=true — online
// deployments use Kimi OAuth instead. Passwords are scrypt-hashed with a
// per-user random salt; no credential ever appears in code.
import { randomBytes, scrypt as _scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { eq } from "drizzle-orm";
import * as schema from "@db/schema";
import type { User } from "@db/schema";
import { getDb } from "./queries/connection";
import { findUserByUnionId, upsertUser } from "./queries/users";

const scrypt = promisify(_scrypt);

export function isLocalAuthEnabled(): boolean {
  const v = process.env.LOCAL_AUTH ?? "";
  return v === "1" || v.toLowerCase() === "true";
}

const LOCAL_UNION_PREFIX = "local:";

async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  return `scrypt:${salt}:${derived.toString("hex")}`;
}

async function verifyPassword(
  password: string,
  stored: string,
): Promise<boolean> {
  const [algo, salt, hex] = stored.split(":");
  if (algo !== "scrypt" || !salt || !hex) return false;
  const derived = (await scrypt(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hex, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

async function findCredentialByUsername(username: string) {
  const rows = await getDb()
    .select()
    .from(schema.localCredentials)
    .where(eq(schema.localCredentials.username, username))
    .limit(1);
  return rows.at(0);
}

async function findUserById(id: number): Promise<User | undefined> {
  const rows = await getDb()
    .select()
    .from(schema.users)
    .where(eq(schema.users.id, id))
    .limit(1);
  return rows.at(0);
}

export async function localRegister(
  username: string,
  password: string,
  displayName?: string,
): Promise<User> {
  const existing = await findCredentialByUsername(username);
  if (existing) {
    throw new Error("That username is already taken.");
  }

  const unionId = `${LOCAL_UNION_PREFIX}${username}`;
  await upsertUser({
    unionId,
    name: displayName?.trim() || username,
    lastSignInAt: new Date(),
  });

  // upsertUser keys on unionId (unique) — re-read to get the numeric id.
  const user = await findUserByUnionId(unionId);
  if (!user) throw new Error("Failed to create user.");

  const passwordHash = await hashPassword(password);
  await getDb().insert(schema.localCredentials).values({
    userId: user.id,
    username,
    passwordHash,
  });
  return user;
}

export async function localLogin(
  username: string,
  password: string,
): Promise<User> {
  const cred = await findCredentialByUsername(username);
  if (!cred) throw new Error("Invalid username or password.");
  const ok = await verifyPassword(password, cred.passwordHash);
  if (!ok) throw new Error("Invalid username or password.");

  const user = await findUserById(cred.userId);
  if (!user) throw new Error("Account is missing its user record.");

  await getDb()
    .update(schema.users)
    .set({ lastSignInAt: new Date() })
    .where(eq(schema.users.id, user.id));
  return user;
}
