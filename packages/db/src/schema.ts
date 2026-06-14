import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  username: text("username").unique(),
  name: text("name"),
  bio: text("bio"),
  image: text("image"),
  supporterTier: text("supporter_tier"),
  isFoundingSupporter: integer("is_founding_supporter", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  provider: text("provider").notNull(),
  providerAccountId: text("provider_account_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const lists = sqliteTable("lists", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description"),
  isPublic: integer("is_public", { mode: "boolean" }).default(false),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull(),
});

export const listItems = sqliteTable("list_items", {
  id: text("id").primaryKey(),
  listId: text("list_id").notNull().references(() => lists.id),
  projectSlug: text("project_slug").notNull(),
  note: text("note"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});

export const submissions = sqliteTable("submissions", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => users.id),
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
  userId: text("user_id").notNull().references(() => users.id),
  projectSlug: text("project_slug").notNull(),
  rating: integer("rating").notNull(),
  body: text("body").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
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
  userId: text("user_id").notNull().references(() => users.id),
  projectSlug: text("project_slug").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
});