"use client";

import { Button } from "@ftod/ui";
import { useState } from "react";

export function UsernameModal({ open, onComplete }: { open: boolean; onComplete: () => void }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const res = await fetch("/api/user/username", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.message ?? "could not set username");
      return;
    }
    onComplete();
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 110,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.65)",
        padding: 24,
      }}
    >
      <form
        onSubmit={submit}
        style={{
          width: "100%",
          maxWidth: 400,
          background: "var(--bg-elevated)",
          border: "1px solid var(--border-strong)",
          borderRadius: "var(--radius-lg)",
          padding: 24,
        }}
      >
        <h2 style={{ margin: "0 0 8px", fontSize: 20 }}>choose a username</h2>
        <p style={{ margin: "0 0 16px", color: "var(--text-secondary)", fontSize: 14 }}>
          lowercase, 3–20 chars, a-z 0-9 hyphen
        </p>
        <input
          required
          minLength={3}
          maxLength={20}
          pattern="[a-z0-9-]+"
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          placeholder="alex"
          style={{
            width: "100%",
            padding: "12px 14px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
            background: "var(--bg-input)",
            marginBottom: 12,
          }}
        />
        {error && <p style={{ color: "var(--error)", fontSize: 13, margin: "0 0 12px" }}>{error}</p>}
        <Button type="submit" disabled={loading} style={{ width: "100%" }}>
          {loading ? "saving..." : "continue"}
        </Button>
      </form>
    </div>
  );
}