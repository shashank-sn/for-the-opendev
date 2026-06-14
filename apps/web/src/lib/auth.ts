import { createAuth } from "@ftod/auth";
import { getDb } from "@ftod/db";

const globalForAuth = globalThis as unknown as { auth?: ReturnType<typeof createAuth> };

export function getAuth() {
  if (!globalForAuth.auth) {
    globalForAuth.auth = createAuth(getDb());
  }
  return globalForAuth.auth;
}