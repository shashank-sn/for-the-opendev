import { createHmac, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";
import { upsertSupporter } from "@/lib/sponsor-sync";

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

export async function POST(request: Request) {
  const secret = process.env.GITHUB_SPONSORS_WEBHOOK_SECRET;
  const raw = await request.text();

  if (secret) {
    const ok = verifySignature(raw, request.headers.get("x-hub-signature-256"), secret);
    if (!ok) return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  const payload = JSON.parse(raw) as SponsorPayload;
  const login = payload.sponsorship?.sponsor?.login;
  if (!login) {
    return NextResponse.json({ ok: true, skipped: true });
  }

  const tierName = payload.sponsorship?.tier?.name ?? "custom";
  const synced = await upsertSupporter({
    githubLogin: login,
    tier: tierName,
    amountCents: payload.sponsorship?.tier?.monthly_price_in_cents ?? null,
  });

  return NextResponse.json({ ok: true, synced });
}