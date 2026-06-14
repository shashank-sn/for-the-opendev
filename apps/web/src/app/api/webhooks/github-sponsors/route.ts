import { createHmac, timingSafeEqual } from "node:crypto";
import { getDb, supporters } from "@ftod/db";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";
import { createId } from "@/lib/ids";
import { FOUNDING_SUPPORTER_LIMIT } from "@/lib/sponsors";

type SponsorPayload = {
  action?: string;
  sponsorship?: {
    sponsor?: { login?: string };
    tier?: { name?: string; monthly_price_in_cents?: number };
    is_one_time?: boolean;
  };
};

function verifySignature(raw: string, signature: string | null, secret: string) {
  if (!signature?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const received = signature.slice("sha256=".length);
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(received));
  } catch {
    return false;
  }
}

function normalizeTier(name?: string) {
  if (!name) return "custom";
  const lower = name.toLowerCase();
  if (lower.includes("open supporter") || lower.includes("open-supporter")) return "open-supporter";
  if (lower.includes("builder backer") || lower.includes("builder-backer")) return "builder-backer";
  if (lower.includes("sustainer")) return "sustainer";
  return lower.replace(/\s+/g, "-");
}

export async function POST(request: Request) {
  const secret = process.env.GITHUB_SPONSORS_WEBHOOK_SECRET;
  const raw = await request.text();

  if (secret) {
    const ok = verifySignature(raw, request.headers.get("x-hub-signature-256"), secret);
    if (!ok) return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(raw) as SponsorPayload;
  const login = payload.sponsorship?.sponsor?.login;
  const tierName = normalizeTier(payload.sponsorship?.tier?.name);

  if (!login) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const db = getDb();
  const now = new Date();

  await db
    .insert(supporters)
    .values({
      id: createId("sup"),
      githubLogin: login,
      tier: tierName,
      amountCents: payload.sponsorship?.tier?.monthly_price_in_cents ?? null,
      isEnterprise: tierName === "custom",
      syncedAt: now,
    })
    .onConflictDoUpdate({
      target: supporters.githubLogin,
      set: {
        tier: tierName,
        amountCents: payload.sponsorship?.tier?.monthly_price_in_cents ?? null,
        syncedAt: now,
      },
    });

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(supporters);

  return NextResponse.json({
    ok: true,
    synced: {
      githubLogin: login,
      tier: tierName,
      foundingSupporterEligible: Number(count) <= FOUNDING_SUPPORTER_LIMIT,
    },
  });
}