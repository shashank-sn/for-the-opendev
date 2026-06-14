"use client";

import { Button } from "@ftod/ui";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { CATEGORIES } from "@/lib/catalog";

export default function SubmitPage() {
  const [status, setStatus] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const res = await fetch("/api/submissions", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        githubUrl: form.get("githubUrl"),
        category: form.get("category"),
        notes: form.get("notes"),
      }),
    });
    const data = await res.json();
    setStatus(data.message ?? (res.ok ? "submitted for review" : "submission failed"));
  }

  return (
    <PageShell title="submit a project" subtitle="github repo only · verified oss license · editorial review">
      <form onSubmit={onSubmit} style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 16 }}>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
          github repo url
          <input
            name="githubUrl"
            required
            type="url"
            placeholder="https://github.com/org/repo"
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-input)",
            }}
          />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
          category
          <select
            name="category"
            required
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-input)",
            }}
          >
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 14 }}>
          notes (optional)
          <textarea
            name="notes"
            rows={4}
            placeholder="why should we profile this?"
            style={{
              padding: "12px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-input)",
            }}
          />
        </label>
        <Button type="submit">submit for review</Button>
        {status && <p style={{ color: "var(--text-secondary)", fontSize: 14 }}>{status}</p>}
      </form>
    </PageShell>
  );
}