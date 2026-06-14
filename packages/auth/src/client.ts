import { createAuthClient } from "better-auth/react";
import { magicLinkClient } from "better-auth/client/plugins";
import { usernameClient } from "better-auth/client/plugins";

export function createFtodAuthClient(baseURL: string) {
  return createAuthClient({
    baseURL,
    plugins: [magicLinkClient(), usernameClient()],
  });
}

export type FtodAuthClient = ReturnType<typeof createFtodAuthClient>;