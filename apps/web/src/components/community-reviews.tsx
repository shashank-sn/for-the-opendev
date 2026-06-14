"use client";

import { Button } from "@ftod/ui";
import { useEffect, useState } from "react";
import { useAuthSession } from "./auth-provider";

type ReviewRow = {
  id: string;
  setupEase: number;
  documentation: number;
  maintenance: number;
  wouldRecommend: string;
  body: string | null;
  username: string | null;
  displayUsername: string | null;
};

type Aggregate = {
  count: number;
  setupEase: number;
  documentation: number;
  maintenance: number;
  recommendYesPct: number;
};

function Stars({ value }: { value: number }) {
  const filled = Math.round(value);
  return (
    <span aria-label={`${value.toFixed(1)} out of 5`}>
      {"●".repeat(filled)}
      {"○".repeat(5 - filled)}
    </span>
  );
}

export function CommunityReviews({ projectSlug }: { projectSlug: string }) {
  const { data: session } = useAuthSession();
  const [aggregate, setAggregate] = useState<Aggregate | null>(null);
  const [rows, setRows] = useState<ReviewRow[]>([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [form, setForm] = useState({
    setupEase: 3,
    documentation: 3,
    maintenance: 3,
    wouldRecommend: "yes" as "yes" | "maybe" | "no",
    experience: "",
  });

  async function load() {
    const res = await fetch(`/api/reviews?projectSlug=${projectSlug}`);
    const data = await res.json();
    setAggregate(data.aggregate ?? null);
    setRows(data.reviews ?? []);
  }

  useEffect(() => {
    load();
  }, [projectSlug]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ projectSlug, ...form }),
    });
    const data = await res.json();
    setMessage(data.message ?? (res.ok ? "submitted" : "failed"));
    if (res.ok) {
      setOpen(false);
      load();
    }
  }

  return (
    <section style={{ marginTop: 48 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 22 }}>
          community reviews{aggregate?.count ? ` (${aggregate.count})` : ""}
        </h2>
        {session?.user ? (
          <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
            write a review
          </Button>
        ) : (
          <span style={{ fontSize: 14, color: "var(--text-secondary)" }}>log in to review</span>
        )}
      </div>

      {aggregate && aggregate.count > 0 ? (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
            gap: 12,
            marginBottom: 20,
            padding: 16,
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-surface)",
          }}
        >
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-tertiary)" }}>setup ease</p>
            <Stars value={aggregate.setupEase} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-tertiary)" }}>documentation</p>
            <Stars value={aggregate.documentation} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-tertiary)" }}>maintenance</p>
            <Stars value={aggregate.maintenance} />
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, color: "var(--text-tertiary)" }}>would recommend</p>
            <p style={{ margin: 0 }}>{aggregate.recommendYesPct}% yes</p>
          </div>
        </div>
      ) : (
        <p style={{ color: "var(--text-secondary)", marginBottom: 20 }}>
          no reviews yet — be the first after you try it
        </p>
      )}

      {open && (
        <form
          onSubmit={submit}
          style={{
            padding: 20,
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-lg)",
            background: "var(--bg-surface)",
            marginBottom: 20,
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {(["setupEase", "documentation", "maintenance"] as const).map((field) => (
            <label key={field} style={{ fontSize: 14 }}>
              {field.replace(/([A-Z])/g, " $1").toLowerCase()}{" "}
              <input
                type="range"
                min={1}
                max={5}
                value={form[field]}
                onChange={(e) => setForm({ ...form, [field]: Number(e.target.value) })}
              />{" "}
              {form[field]}/5
            </label>
          ))}
          <fieldset style={{ border: "none", padding: 0 }}>
            <legend style={{ fontSize: 14, marginBottom: 8 }}>would you recommend?</legend>
            {(["yes", "maybe", "no"] as const).map((v) => (
              <label key={v} style={{ marginRight: 12, fontSize: 14 }}>
                <input
                  type="radio"
                  name="recommend"
                  checked={form.wouldRecommend === v}
                  onChange={() => setForm({ ...form, wouldRecommend: v })}
                />{" "}
                {v}
              </label>
            ))}
          </fieldset>
          <label style={{ fontSize: 14 }}>
            your experience (optional, 50-2000 chars)
            <textarea
              rows={4}
              value={form.experience}
              onChange={(e) => setForm({ ...form, experience: e.target.value })}
              style={{
                display: "block",
                width: "100%",
                marginTop: 6,
                padding: 12,
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                background: "var(--bg-input)",
              }}
            />
          </label>
          <Button type="submit">submit review</Button>
          {message && <p style={{ fontSize: 13, color: "var(--text-secondary)" }}>{message}</p>}
        </form>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((row) => (
          <article
            key={row.id}
            style={{
              padding: 16,
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
            }}
          >
            <p style={{ margin: "0 0 8px", fontSize: 13, color: "var(--text-tertiary)" }}>
              @{row.username ?? row.displayUsername ?? "builder"} · recommends {row.wouldRecommend}
            </p>
            {row.body && <p style={{ margin: 0, color: "var(--text-secondary)" }}>{row.body}</p>}
          </article>
        ))}
      </div>
    </section>
  );
}