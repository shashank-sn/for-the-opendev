"use client";

import { Button } from "@ftod/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useAuthSession } from "@/components/auth-provider";

type ListRow = { id: string; title: string; slug: string; isPublic: boolean };

export default function DashboardPage() {
  const { data: session, isPending } = useAuthSession();
  const [lists, setLists] = useState<ListRow[]>([]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/lists")
      .then((r) => r.json())
      .then((d) => setLists(d.lists ?? []));
  }, [session]);

  if (isPending) {
    return <PageShell title="dashboard">loading...</PageShell>;
  }

  if (!session?.user) {
    return (
      <PageShell title="dashboard">
        <p style={{ color: "var(--text-secondary)" }}>log in to manage your lists.</p>
      </PageShell>
    );
  }

  async function createList() {
    const title = prompt("new list name");
    if (!title) return;
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (res.ok) setLists((prev) => [data.list, ...prev]);
  }

  return (
    <PageShell title="dashboard" subtitle={`signed in as ${(session.user as { username?: string }).username ?? session.user.email}`}>
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>your lists</h2>
          <Button onClick={createList}>new list</Button>
        </div>
        {lists.length === 0 ? (
          <p style={{ color: "var(--text-secondary)" }}>no lists yet — browse tools and add projects.</p>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lists.map((list) => (
              <Link
                key={list.id}
                href={`/dashboard/lists/${list.slug}`}
                style={{
                  padding: 16,
                  borderRadius: "var(--radius-lg)",
                  border: "1px solid var(--border-default)",
                  background: "var(--bg-surface)",
                  color: "inherit",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span>{list.title}</span>
                  <span style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
                    {list.isPublic ? "public" : "private"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <p style={{ fontSize: 14 }}>
        <Link href="/submit">submit a project</Link> · <Link href="/admin/submissions">admin queue</Link>
      </p>
    </PageShell>
  );
}