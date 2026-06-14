"use client";

import { Button } from "@ftod/ui";
import { useState } from "react";

type Props = {
  compact?: boolean;
};

export function NewsletterSignup({ compact }: Props) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(payload.error ?? "something went wrong");
        return;
      }

      setStatus("success");
      setMessage("you're on the list. welcome email incoming.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("network error — try again");
    }
  }

  return (
    <div>
      <p style={{ margin: compact ? "0 0 10px" : "0 0 8px", fontWeight: 600, fontSize: compact ? 14 : 16 }}>
        newsletter
      </p>
      {!compact && (
        <p style={{ margin: "0 0 14px", color: "var(--text-secondary)", fontSize: 14, maxWidth: 360 }}>
          new profiles, comparisons, and launch picks. routed via cloudflare. no ads.
        </p>
      )}
      <form onSubmit={onSubmit} style={{ display: "flex", gap: 8, flexWrap: "wrap", maxWidth: 420 }}>
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@domain.com"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          disabled={status === "loading"}
          style={{
            flex: "1 1 200px",
            minWidth: 180,
            padding: "10px 12px",
            borderRadius: "var(--radius-md)",
            border: "1px solid var(--border-default)",
            background: "var(--bg-primary)",
            color: "var(--text-primary)",
            fontSize: 14,
          }}
        />
        <Button type="submit" disabled={status === "loading"} style={{ whiteSpace: "nowrap" }}>
          {status === "loading" ? "subscribing…" : "subscribe"}
        </Button>
      </form>
      {message && (
        <p
          style={{
            margin: "10px 0 0",
            fontSize: 13,
            color: status === "error" ? "var(--text-secondary)" : "var(--accent-text)",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}