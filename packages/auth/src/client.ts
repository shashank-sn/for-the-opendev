import { createAuthClient } from "better-auth/react";

export function createFtodAuthClient(baseURL: string) {
  return createAuthClient({ baseURL });
}

export type FtodAuthClient = ReturnType<typeof createFtodAuthClient>;