import { getDb, newsletterSubscribers } from "@ftod/db";
import { eq } from "drizzle-orm";
import { sendTransactionalEmail, welcomeNewsletterEmail } from "@/lib/email";
import { createId } from "@/lib/ids";

export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export async function subscribeToNewsletter(email: string, name?: string): Promise<NewsletterResult> {
  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes("@")) {
    return { ok: false, error: "invalid email", status: 400 };
  }

  const db = getDb();
  const existing = await db
    .select()
    .from(newsletterSubscribers)
    .where(eq(newsletterSubscribers.email, normalized))
    .limit(1);

  if (existing[0]?.status === "active") {
    return { ok: true };
  }

  const now = new Date();
  if (existing[0]) {
    await db
      .update(newsletterSubscribers)
      .set({ status: "active", name: name?.trim() || existing[0].name, unsubscribedAt: null, subscribedAt: now })
      .where(eq(newsletterSubscribers.id, existing[0].id));
  } else {
    await db.insert(newsletterSubscribers).values({
      id: createId("ns"),
      email: normalized,
      name: name?.trim() || null,
      status: "active",
      subscribedAt: now,
    });
  }

  try {
    const template = welcomeNewsletterEmail(normalized);
    await sendTransactionalEmail({ ...template, to: normalized });
  } catch (error) {
    console.warn("[newsletter] welcome email failed", error);
  }

  return { ok: true };
}