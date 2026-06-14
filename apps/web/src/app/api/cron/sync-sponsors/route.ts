import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // fallback cron: poll github sponsors api when webhook unavailable
  return NextResponse.json({
    ok: true,
    message: "cron fallback ready — connect github token + d1 in production",
    syncedAt: new Date().toISOString(),
  });
}