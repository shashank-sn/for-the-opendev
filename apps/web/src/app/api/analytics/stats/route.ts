import { NextResponse } from "next/server";
import { hasAnalyticsSession } from "@/lib/analytics-auth";
import { fetchAnalyticsDashboard, isPlausibleConfigured, type PlausibleDateRange } from "@/lib/plausible";

const ranges = new Set<PlausibleDateRange>([
  "day",
  "24h",
  "7d",
  "28d",
  "30d",
  "91d",
  "month",
  "6mo",
  "12mo",
  "year",
  "all",
]);

export async function GET(request: Request) {
  if (!(await hasAnalyticsSession())) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  if (!isPlausibleConfigured()) {
    return NextResponse.json({ error: "plausible not configured" }, { status: 503 });
  }

  const url = new URL(request.url);
  const rangeParam = url.searchParams.get("range") ?? "7d";
  const range = ranges.has(rangeParam as PlausibleDateRange)
    ? (rangeParam as PlausibleDateRange)
    : "7d";

  try {
    const data = await fetchAnalyticsDashboard(range);
    return NextResponse.json(data);
  } catch (error) {
    const message = error instanceof Error ? error.message : "failed to load stats";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}