import { createAuth } from "@ftod/auth";

const globalForAuth = globalThis as unknown as { auth?: ReturnType<typeof createAuth> };

export const auth = globalForAuth.auth ?? createAuth();

if (process.env.NODE_ENV !== "production") globalForAuth.auth = auth;