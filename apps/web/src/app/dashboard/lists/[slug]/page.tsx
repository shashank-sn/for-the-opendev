"use client";

import { Button } from "@ftod/ui";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useAuthSession } from "@/components/auth-provider";
import { getProject } from "@/lib/catalog";

type Item = { id: string; projectSlug: string; note: string | null };
type List = { id: string; title: string; slug: string; isPublic: boolean };

export default function ListDetailPage() {
  const params = useParams<{ slug: string }>();
  const { data: session } = useAuthSession();
  const [list, setList] = useState<List | null>(null);
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/lists")
      .then((r) => r.json())
      .then(async (d) => {
        const found = (d.lists as List[]).find((l) => l.slug === params.slug);
        if (!found) return;
        setList(found);
        const detail = await fetch(`/api/lists/${found.id}`).then((r) => r.json());
        setItems(detail.items ?? []);
      });
  }, [session, params.slug]);

  async function togglePublic() {
    if (!list) return;
    await fetch(`/api/lists/${list.id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ isPublic: !list.isPublic }),
    });
    setList({ ...list, isPublic: !list.isPublic });
  }

  async function removeItem(itemId: string) {
    if (!list) return;
    await fetch(`/api/lists/${list.id}/items/${itemId}`, { method: "DELETE" });
    setItems((prev) => prev.filter((i) => i.id !== itemId));
  }

  if (!session?.user) {
    return (
      <PageShell title="list">
        <p>log in required.</p>
      </PageShell>
    );
  }

  if (!list) {
    return <PageShell title="list">loading...</PageShell>;
  }

  const user = session.user as { username?: string };

  return (
    <PageShell title={list.title}>
      <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
        <Button variant="secondary" onClick={togglePublic}>
          {list.isPublic ? "make private" : "make public"}
        </Button>
        {list.isPublic && user.username && (
          <Link href={`/u/${user.username}/${list.slug}`} style={{ fontSize: 14, alignSelf: "center" }}>
            public url
          </Link>
        )}
      </div>
      {items.length === 0 ? (
        <p style={{ color: "var(--text-secondary)" }}>no projects yet.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map((item) => {
            const project = getProject(item.projectSlug);
            if (!project) return null;
            return (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: 14,
                  border: "1px solid var(--border-default)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <Link href={`/${project.category}/${project.slug}`} className="preserve-case">
                  {project.name}
                </Link>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  style={{ background: "none", border: "none", color: "var(--text-tertiary)", cursor: "pointer" }}
                >
                  remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </PageShell>
  );
}