"use client";

import { Button } from "@ftod/ui";
import { useCallback, useEffect, useMemo, useState } from "react";

type Range = "7d" | "30d" | "91d" | "12mo";

type Dashboard = {
  range: string;
  siteId: string | null;
  summary: {
    visitors: number;
    pageviews: number;
    visits: number;
    bounceRate: number;
    visitDuration: number;
    viewsPerVisit: number;
  };
  timeseries: Array<{ date: string; visitors: number; pageviews: number }>;
  topPages: Array<{ page: string; visitors: number; pageviews: number }>;
  topSources: Array<{ source: string; visitors: number }>;
  topCountries: Array<{ country: string; visitors: number }>;
  topDevices: Array<{ device: string; visitors: number }>;
  topBrowsers: Array<{ browser: string; visitors: number }>;
  entryPages: Array<{ page: string; visitors: number }>;
  utmSources: Array<{ utm: string; visitors: number }>;
};

function formatDuration(seconds: number) {
  if (!seconds) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

function formatPercent(value: number) {
  return `${value.toFixed(1)}%`;
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        padding: 16,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
      }}
    >
      <p style={{ margin: 0, fontSize: 12, color: "var(--text-tertiary)", textTransform: "lowercase" }}>{label}</p>
      <p style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}>{value}</p>
    </div>
  );
}

function DataTable({
  title,
  columns,
  rows,
}: {
  title: string;
  columns: Array<{ key: string; label: string; align?: "left" | "right" }>;
  rows: Array<Record<string, string | number>>;
}) {
  return (
    <section
      style={{
        padding: 16,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
      }}
    >
      <h2 style={{ margin: "0 0 12px", fontSize: 16 }}>{title}</h2>
      {rows.length === 0 ? (
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>no data for this range.</p>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
            <thead>
              <tr>
                {columns.map((col) => (
                  <th
                    key={col.key}
                    style={{
                      textAlign: col.align ?? "left",
                      padding: "8px 6px",
                      borderBottom: "1px solid var(--border-default)",
                      color: "var(--text-tertiary)",
                      fontWeight: 500,
                    }}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${title}-${index}`}>
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      style={{
                        textAlign: col.align ?? "left",
                        padding: "10px 6px",
                        borderBottom: "1px solid var(--border-default)",
                        color: col.align === "right" ? "var(--text-primary)" : "var(--text-secondary)",
                        fontFamily: col.key === "page" ? "var(--font-geist-mono)" : undefined,
                        fontSize: col.key === "page" ? 13 : 14,
                      }}
                    >
                      {row[col.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function TimeseriesChart({ rows }: { rows: Dashboard["timeseries"] }) {
  const maxVisitors = useMemo(() => Math.max(...rows.map((r) => r.visitors), 1), [rows]);

  return (
    <section
      style={{
        padding: 16,
        borderRadius: "var(--radius-lg)",
        border: "1px solid var(--border-default)",
        background: "var(--bg-surface)",
      }}
    >
      <h2 style={{ margin: "0 0 12px", fontSize: 16 }}>visitors over time</h2>
      {rows.length === 0 ? (
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>no data for this range.</p>
      ) : (
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, minHeight: 160, paddingTop: 8 }}>
          {rows.map((row) => (
            <div key={row.date} style={{ flex: 1, minWidth: 10, textAlign: "center" }}>
              <div
                title={`${row.date}: ${row.visitors} visitors`}
                style={{
                  height: `${Math.max(6, (row.visitors / maxVisitors) * 140)}px`,
                  background: "var(--accent)",
                  borderRadius: 4,
                  opacity: 0.9,
                }}
              />
              <p style={{ margin: "6px 0 0", fontSize: 10, color: "var(--text-tertiary)" }}>
                {row.date.slice(5)}
              </p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default function AnalyticsPage() {
  const [authenticated, setAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [range, setRange] = useState<Range>("7d");
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const loadSession = useCallback(async () => {
    const res = await fetch("/api/analytics/session");
    const payload = (await res.json()) as {
      authenticated: boolean;
      passwordConfigured: boolean;
      plausibleConfigured: boolean;
    };
    setAuthenticated(payload.authenticated);
    if (!payload.passwordConfigured) {
      setError("set ANALYTICS_PASSWORD in env to enable this dashboard.");
    } else if (!payload.plausibleConfigured) {
      setError("set PLAUSIBLE_API_URL, PLAUSIBLE_API_KEY, and PLAUSIBLE_SITE_ID.");
    }
  }, []);

  const loadStats = useCallback(async (nextRange: Range) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/analytics/stats?range=${nextRange}`);
      const payload = await res.json();
      if (!res.ok) {
        setError(payload.error ?? "failed to load stats");
        setData(null);
        return;
      }
      setData(payload as Dashboard);
    } catch {
      setError("network error");
      setData(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSession();
  }, [loadSession]);

  useEffect(() => {
    if (authenticated) loadStats(range);
  }, [authenticated, range, loadStats]);

  async function onLogin(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/analytics/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    const payload = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(payload.error ?? "login failed");
      return;
    }
    setAuthenticated(true);
    setPassword("");
  }

  async function onLogout() {
    await fetch("/api/analytics/logout", { method: "POST" });
    setAuthenticated(false);
    setData(null);
  }

  return (
    <main style={{ maxWidth: 1120, margin: "0 auto", padding: "48px 24px 80px", minHeight: "100vh" }}>
      <header style={{ marginBottom: 32, display: "flex", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div>
          <p style={{ margin: 0, fontSize: 13, color: "var(--text-tertiary)" }}>plausible · self-hosted</p>
          <h1 style={{ margin: "6px 0 0", fontSize: 32, letterSpacing: "-0.02em" }}>analytics</h1>
          {data?.siteId && (
            <p style={{ margin: "8px 0 0", color: "var(--text-secondary)", fontSize: 14 }}>{data.siteId}</p>
          )}
        </div>
        {authenticated && (
          <Button variant="secondary" onClick={onLogout}>
            sign out
          </Button>
        )}
      </header>

      {authenticated === null && <p style={{ color: "var(--text-secondary)" }}>loading…</p>}

      {authenticated === false && (
        <form onSubmit={onLogin} style={{ maxWidth: 360, display: "flex", flexDirection: "column", gap: 12 }}>
          <label style={{ fontSize: 14, color: "var(--text-secondary)" }}>password</label>
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            required
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-primary)",
              color: "var(--text-primary)",
            }}
          />
          <Button type="submit" disabled={loading}>
            {loading ? "checking…" : "enter"}
          </Button>
        </form>
      )}

      {error && <p style={{ color: "var(--error)", marginTop: 16 }}>{error}</p>}

      {authenticated && (
        <>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 24 }}>
            {(["7d", "30d", "91d", "12mo"] as Range[]).map((option) => (
              <Button
                key={option}
                variant={range === option ? "primary" : "secondary"}
                onClick={() => setRange(option)}
                disabled={loading}
              >
                {option}
              </Button>
            ))}
          </div>

          {loading && !data && <p style={{ color: "var(--text-secondary)" }}>pulling stats from plausible…</p>}

          {data && (
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
                  gap: 12,
                }}
              >
                <StatCard label="visitors" value={data.summary.visitors.toLocaleString()} />
                <StatCard label="pageviews" value={data.summary.pageviews.toLocaleString()} />
                <StatCard label="visits" value={data.summary.visits.toLocaleString()} />
                <StatCard label="bounce rate" value={formatPercent(data.summary.bounceRate)} />
                <StatCard label="visit duration" value={formatDuration(data.summary.visitDuration)} />
                <StatCard label="views / visit" value={data.summary.viewsPerVisit.toFixed(2)} />
              </div>

              <TimeseriesChart rows={data.timeseries} />

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
                <DataTable
                  title="top pages"
                  columns={[
                    { key: "page", label: "page" },
                    { key: "visitors", label: "visitors", align: "right" },
                    { key: "pageviews", label: "views", align: "right" },
                  ]}
                  rows={data.topPages}
                />
                <DataTable
                  title="top sources"
                  columns={[
                    { key: "source", label: "source" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.topSources}
                />
                <DataTable
                  title="top countries"
                  columns={[
                    { key: "country", label: "country" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.topCountries}
                />
                <DataTable
                  title="devices"
                  columns={[
                    { key: "device", label: "device" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.topDevices}
                />
                <DataTable
                  title="browsers"
                  columns={[
                    { key: "browser", label: "browser" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.topBrowsers}
                />
                <DataTable
                  title="landing pages"
                  columns={[
                    { key: "page", label: "page" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.entryPages}
                />
                <DataTable
                  title="utm sources"
                  columns={[
                    { key: "utm", label: "utm" },
                    { key: "visitors", label: "visitors", align: "right" },
                  ]}
                  rows={data.utmSources}
                />
              </div>
            </div>
          )}
        </>
      )}
    </main>
  );
}