import { NextResponse } from "next/server";
import { hasAnalyticsSession, isAnalyticsPasswordConfigured } from "@/lib/analytics-auth";
import { isPlausibleConfigured } from "@/lib/plausible";

export async function GET() {
  return NextResponse.json({
    authenticated: await hasAnalyticsSession(),
    passwordConfigured: isAnalyticsPasswordConfigured(),
    plausibleConfigured: isPlausibleConfigured(),
  });
}