import { createAuth } from "@ftod/auth";
import { getDb } from "@ftod/db";
import { magicLinkEmail, sendTransactionalEmail } from "@/lib/email";

const globalForAuth = globalThis as unknown as { auth?: ReturnType<typeof createAuth> };

export function getAuth() {
  if (!globalForAuth.auth) {
    globalForAuth.auth = createAuth(getDb(), {
      onMagicLink: async ({ email, url }) => {
        const template = magicLinkEmail(url);
        await sendTransactionalEmail({ ...template, to: email });
      },
    });
  }
  return globalForAuth.auth;
}