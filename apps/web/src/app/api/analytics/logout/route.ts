import { NextResponse } from "next/server";
import { ANALYTICS_COOKIE } from "@/lib/analytics-auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(ANALYTICS_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return response;
}