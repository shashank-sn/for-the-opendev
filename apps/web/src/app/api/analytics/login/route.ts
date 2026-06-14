import { NextResponse } from "next/server";
import {
  analyticsCookieOptions,
  ANALYTICS_COOKIE,
  createAnalyticsSessionValue,
  isAnalyticsPasswordConfigured,
  verifyAnalyticsPassword,
} from "@/lib/analytics-auth";

export async function POST(request: Request) {
  if (!isAnalyticsPasswordConfigured()) {
    return NextResponse.json({ error: "analytics login not configured" }, { status: 503 });
  }

  let body: { password?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid json" }, { status: 400 });
  }

  const password = body.password?.trim() ?? "";
  if (!password || !verifyAnalyticsPassword(password)) {
    return NextResponse.json({ error: "wrong password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ANALYTICS_COOKIE, createAnalyticsSessionValue(), analyticsCookieOptions());
  return response;
}