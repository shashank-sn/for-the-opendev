import { desc } from "drizzle-orm";
import { emails } from "./schema";
import type { FtodDb } from "./types";

export type EmailDirection = "inbound" | "outbound";
export type EmailStatus = "received" | "sent" | "failed" | "queued";

export type StoreEmailInput = {
  id: string;
  direction: EmailDirection;
  status: EmailStatus;
  fromAddress: string;
  toAddress: string;
  replyTo?: string | null;
  subject?: string | null;
  textBody?: string | null;
  htmlBody?: string | null;
  messageId?: string | null;
  inReplyTo?: string | null;
  headersJson?: string | null;
  provider?: string;
  providerResponse?: string | null;
  error?: string | null;
  rawSize?: number | null;
  createdAt?: Date;
};

export async function storeEmail(db: FtodDb, input: StoreEmailInput) {
  await db.insert(emails).values({
    id: input.id,
    direction: input.direction,
    status: input.status,
    fromAddress: input.fromAddress,
    toAddress: input.toAddress,
    replyTo: input.replyTo ?? null,
    subject: input.subject ?? null,
    textBody: input.textBody ?? null,
    htmlBody: input.htmlBody ?? null,
    messageId: input.messageId ?? null,
    inReplyTo: input.inReplyTo ?? null,
    headersJson: input.headersJson ?? null,
    provider: input.provider ?? "cloudflare",
    providerResponse: input.providerResponse ?? null,
    error: input.error ?? null,
    rawSize: input.rawSize ?? null,
    createdAt: input.createdAt ?? new Date(),
  });
}

export async function listEmails(db: FtodDb, limit = 50) {
  return db.select().from(emails).orderBy(desc(emails.createdAt)).limit(limit);
}