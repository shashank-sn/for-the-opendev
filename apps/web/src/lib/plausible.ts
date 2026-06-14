export type PlausibleDateRange =
  | "day"
  | "24h"
  | "7d"
  | "28d"
  | "30d"
  | "91d"
  | "month"
  | "6mo"
  | "12mo"
  | "year"
  | "all";

export type PlausibleQuery = {
  metrics: string[];
  date_range: PlausibleDateRange;
  dimensions?: string[];
  filters?: unknown[];
  order_by?: Array<[string, "asc" | "desc"]>;
  pagination?: { limit: number; offset: number };
  include?: Record<string, boolean>;
};

type PlausibleQueryResponse = {
  results: Array<{
    metrics: Array<number | string | null>;
    dimensions: string[];
  }>;
  meta?: Record<string, unknown>;
};

function plausibleConfig() {
  const apiUrl = process.env.PLAUSIBLE_API_URL?.replace(/\/$/, "");
  const apiKey = process.env.PLAUSIBLE_API_KEY;
  const siteId = process.env.PLAUSIBLE_SITE_ID;
  if (!apiUrl || !apiKey || !siteId) return null;
  return { apiUrl, apiKey, siteId };
}

export function isPlausibleConfigured() {
  return plausibleConfig() !== null;
}

export async function plausibleQuery(query: Omit<PlausibleQuery, "site_id">) {
  const config = plausibleConfig();
  if (!config) {
    throw new Error("plausible not configured");
  }

  const res = await fetch(`${config.apiUrl}/api/v2/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${config.apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      site_id: config.siteId,
      ...query,
    }),
    cache: "no-store",
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`plausible api failed (${res.status}): ${body}`);
  }

  return (await res.json()) as PlausibleQueryResponse;
}

function metricValue(results: PlausibleQueryResponse["results"], index = 0) {
  const raw = results[0]?.metrics?.[index];
  return typeof raw === "number" ? raw : Number(raw ?? 0);
}

export async function fetchAnalyticsDashboard(range: PlausibleDateRange) {
  const [
    summary,
    timeseries,
    topPages,
    topSources,
    topCountries,
    topDevices,
    topBrowsers,
    entryPages,
    utmSources,
  ] = await Promise.all([
    plausibleQuery({
      metrics: ["visitors", "pageviews", "visits", "bounce_rate", "visit_duration", "views_per_visit"],
      date_range: range,
    }),
    plausibleQuery({
      metrics: ["visitors", "pageviews"],
      date_range: range,
      dimensions: ["time:day"],
      order_by: [["time:day", "asc"]],
      include: { time_labels: true },
    }),
    plausibleQuery({
      metrics: ["visitors", "pageviews"],
      date_range: range,
      dimensions: ["event:page"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 12, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:source"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 10, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:country_name"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 10, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:device"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 6, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:browser"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 8, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:entry_page"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 10, offset: 0 },
    }),
    plausibleQuery({
      metrics: ["visitors"],
      date_range: range,
      dimensions: ["visit:utm_source"],
      order_by: [["visitors", "desc"]],
      pagination: { limit: 8, offset: 0 },
      filters: [["is_not", "visit:utm_source", [""]]],
    }),
  ]);

  const dimMetric = (payload: PlausibleQueryResponse, dimKey: string, metrics: string[]) =>
    payload.results.map((row) => {
      const item: Record<string, string | number> = {
        [dimKey]: row.dimensions[0] || "(none)",
      };
      metrics.forEach((name, index) => {
        item[name] = Number(row.metrics[index] ?? 0);
      });
      return item;
    });

  return {
    range,
    siteId: plausibleConfig()?.siteId ?? null,
    summary: {
      visitors: metricValue(summary.results, 0),
      pageviews: metricValue(summary.results, 1),
      visits: metricValue(summary.results, 2),
      bounceRate: metricValue(summary.results, 3),
      visitDuration: metricValue(summary.results, 4),
      viewsPerVisit: metricValue(summary.results, 5),
    },
    timeseries: dimMetric(timeseries, "date", ["visitors", "pageviews"]),
    topPages: dimMetric(topPages, "page", ["visitors", "pageviews"]),
    topSources: dimMetric(topSources, "source", ["visitors"]),
    topCountries: dimMetric(topCountries, "country", ["visitors"]),
    topDevices: dimMetric(topDevices, "device", ["visitors"]),
    topBrowsers: dimMetric(topBrowsers, "browser", ["visitors"]),
    entryPages: dimMetric(entryPages, "page", ["visitors"]),
    utmSources: dimMetric(utmSources, "utm", ["visitors"]),
  };
}