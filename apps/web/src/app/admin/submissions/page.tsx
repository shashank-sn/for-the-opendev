"use client";

import { Button } from "@ftod/ui";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useAuthSession } from "@/components/auth-provider";

type Submission = {
  id: string;
  githubUrl: string;
  category: string;
  license: string | null;
  status: string;
  notes: string | null;
  createdAt: string;
};

export default function AdminSubmissionsPage() {
  const { data: session } = useAuthSession();
  const [rows, setRows] = useState<Submission[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/admin/submissions")
      .then(async (r) => {
        const d = await r.json();
        if (!r.ok) {
          setError(d.message ?? "forbidden");
          return;
        }
        setRows(d.submissions ?? []);
      });
  }, [session]);

  async function review(id: string, status: "approved" | "rejected") {
    await fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ status }),
    });
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <PageShell title="submission review" subtitle="admin queue">
      {error && <p style={{ color: "var(--error)" }}>{error}</p>}
      {rows.length === 0 && !error && <p style={{ color: "var(--text-secondary)" }}>no pending submissions.</p>}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {rows.map((row) => (
          <div
            key={row.id}
            style={{
              padding: 16,
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-lg)",
              background: "var(--bg-surface)",
            }}
          >
            <a href={row.githubUrl} className="preserve-case" style={{ fontWeight: 600 }}>
              {row.githubUrl}
            </a>
            <p style={{ margin: "8px 0", color: "var(--text-secondary)", fontSize: 14 }}>
              {row.category} · <span className="preserve-case">{row.license}</span>
            </p>
            {row.notes && <p style={{ margin: "0 0 12px", fontSize: 14 }}>{row.notes}</p>}
            <div style={{ display: "flex", gap: 8 }}>
              <Button onClick={() => review(row.id, "approved")}>approve</Button>
              <Button variant="secondary" onClick={() => review(row.id, "rejected")}>
                reject
              </Button>
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}