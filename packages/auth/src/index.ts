import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { betterAuth } from "better-auth";
import { magicLink } from "better-auth/plugins/magic-link";
import { username } from "better-auth/plugins/username";
import type { FtodDb } from "@ftod/db";
import { account, authSchema, user } from "@ftod/db/schema";

export function createAuth(db: FtodDb) {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET ?? "dev-secret-change-in-production-32chars",
    database: drizzleAdapter(db, {
      provider: "sqlite",
      schema: authSchema,
    }),
    emailAndPassword: { enabled: true },
    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID ?? "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        enabled: Boolean(process.env.GOOGLE_CLIENT_ID),
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID ?? "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
        enabled: Boolean(process.env.GITHUB_CLIENT_ID),
      },
    },
    user: {
      additionalFields: {
        bio: { type: "string", required: false },
        supporterTier: { type: "string", required: false },
        isFoundingSupporter: { type: "boolean", required: false },
      },
    },
    databaseHooks: {
      session: {
        create: {
          after: async (createdSession) => {
            await syncSupporterTierForUser(db, createdSession.userId);
          },
        },
      },
    },
    plugins: [
      username({
        minUsernameLength: 3,
        maxUsernameLength: 20,
        usernameValidator: (value) => /^[a-z0-9-]+$/.test(value),
      }),
      magicLink({
        sendMagicLink: async ({ email, url }) => {
          if (process.env.SMTP_HOST) {
            // production: wire to smtp transport
            console.info(`[magic-link] ${email} → ${url}`);
          } else {
            console.info(`[magic-link] ${email} → ${url}`);
          }
        },
      }),
    ],
  });
}

async function syncSupporterTierForUser(db: FtodDb, userId: string) {
  const { and, eq, sql } = await import("drizzle-orm");
  const { supporters } = await import("@ftod/db/schema");

  const [githubAccount] = await db
    .select({ accountId: account.accountId })
    .from(account)
    .where(and(eq(account.userId, userId), eq(account.providerId, "github")))
    .limit(1);

  if (!githubAccount) return;

  const [supporter] = await db
    .select()
    .from(supporters)
    .where(eq(supporters.githubLogin, githubAccount.accountId))
    .limit(1);

  if (!supporter) return;

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(supporters);
  const isFounding = Number(count) <= 100;

  await db
    .update(user)
    .set({
      supporterTier: supporter.tier,
      isFoundingSupporter: isFounding,
      updatedAt: new Date(),
    })
    .where(eq(user.id, userId));
}

export type Auth = ReturnType<typeof createAuth>;