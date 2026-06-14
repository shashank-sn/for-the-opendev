import { betterAuth } from "better-auth";

export function createAuth() {
  return betterAuth({
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,
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
        username: { type: "string", required: false },
        bio: { type: "string", required: false },
        supporterTier: { type: "string", required: false },
        isFoundingSupporter: { type: "boolean", required: false },
      },
    },
  });
}

export type Auth = ReturnType<typeof createAuth>;