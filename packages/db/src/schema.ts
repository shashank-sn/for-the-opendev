import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// better-auth core tables (singular names)
export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  username: text("username").unique(),
  displayUsername: text("display_username"),
  bio: text("bio"),
  supporterTier: text("supporter_tier"),
  isFoundingSupporter: integer("is_founding_supporter", { mode: "boolean" }).default(false),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// app tables
export const lists = sqliteTable("lists", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(), // unique per user, not globally
  description: text("description"),
  isPublic: integer("is_public", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const listItems = sqliteTable("list_items", {
  id: text("id").primaryKey(),
  listId: text("list_id")
    .notNull()
    .references(() => lists.id),
  projectSlug: text("project_slug").notNull(),
  note: text("note"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id),
  githubUrl: text("github_url").notNull(),
  category: text("category").notNull(),
  license: text("license"),
  status: text("status").notNull().default("pending"),
  notes: text("notes"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  reviewedAt: integer("reviewed_at", { mode: "timestamp" }),
});

export const reviews = sqliteTable("reviews", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  projectSlug: text("project_slug").notNull(),
  setupEase: integer("setup_ease").notNull(),
  documentation: integer("documentation").notNull(),
  maintenance: integer("maintenance").notNull(),
  wouldRecommend: text("would_recommend").notNull(), // yes | maybe | no
  body: text("body"),
  hidden: integer("hidden", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

export const supporters = sqliteTable("supporters", {
  id: text("id").primaryKey(),
  githubLogin: text("github_login").notNull().unique(),
  tier: text("tier").notNull(),
  amountCents: integer("amount_cents"),
  isEnterprise: integer("is_enterprise", { mode: "boolean" }).default(false),
  syncedAt: integer("synced_at", { mode: "timestamp" }).notNull(),
});

export const launchVotes = sqliteTable("launch_votes", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id),
  projectSlug: text("project_slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const authSchema = { user, session, account, verification };