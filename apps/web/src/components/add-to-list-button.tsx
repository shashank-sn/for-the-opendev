"use client";

import { Button } from "@ftod/ui";
import { useEffect, useState } from "react";
import { useAuthSession } from "./auth-provider";

type ListRow = { id: string; title: string; slug: string };

export function AddToListButton({ projectSlug }: { projectSlug: string }) {
  const { data: session } = useAuthSession();
  const [open, setOpen] = useState(false);
  const [lists, setLists] = useState<ListRow[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!session?.user || !open) return;
    fetch("/api/lists")
      .then((r) => r.json())
      .then((d) => setLists(d.lists ?? []));
  }, [session, open]);

  if (!session?.user) {
    return (
      <a href="/?login=1" style={{ fontSize: 14 }}>
        log in to add to list
      </a>
    );
  }

  async function addToList(listId: string) {
    const res = await fetch(`/api/lists/${listId}/items`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ projectSlug }),
    });
    const data = await res.json();
    setMessage(data.message ?? (res.ok ? "added to list" : "failed"));
    setOpen(false);
  }

  async function createAndAdd() {
    const title = prompt("list name");
    if (!title) return;
    const res = await fetch("/api/lists", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ title }),
    });
    const data = await res.json();
    if (res.ok && data.list?.id) await addToList(data.list.id);
  }

  return (
    <div style={{ position: "relative" }}>
      <Button variant="secondary" onClick={() => setOpen((v) => !v)}>
        add to list ▾
      </Button>
      {message && <p style={{ fontSize: 13, color: "var(--text-secondary)", marginTop: 8 }}>{message}</p>}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 8,
            minWidth: 220,
            background: "var(--bg-elevated)",
            border: "1px solid var(--border-default)",
            borderRadius: "var(--radius-md)",
            padding: 8,
            zIndex: 20,
            boxShadow: "var(--shadow-md)",
          }}
        >
          {lists.length === 0 && (
            <p style={{ margin: "4px 8px", fontSize: 13, color: "var(--text-tertiary)" }}>no lists yet</p>
          )}
          {lists.map((list) => (
            <button
              key={list.id}
              type="button"
              onClick={() => addToList(list.id)}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "8px 10px",
                border: "none",
                background: "transparent",
                color: "var(--text-primary)",
                cursor: "pointer",
                borderRadius: "var(--radius-sm)",
              }}
            >
              {list.title}
            </button>
          ))}
          <button
            type="button"
            onClick={createAndAdd}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              padding: "8px 10px",
              border: "none",
              background: "var(--bg-subtle)",
              color: "var(--accent-text)",
              cursor: "pointer",
              borderRadius: "var(--radius-sm)",
              marginTop: 4,
            }}
          >
            + create new list
          </button>
        </div>
      )}
    </div>
  );
}