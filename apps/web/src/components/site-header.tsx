"use client";

import { Logo, ThemeToggle, AuthModal } from "@ftod/ui";
import Link from "next/link";
import { useState } from "react";
import { CATEGORIES } from "@/lib/catalog";

export function SiteHeader() {
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          borderBottom: "1px solid var(--border-default)",
          background: "color-mix(in srgb, var(--bg-base) 92%, transparent)",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "14px 24px",
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, color: "inherit" }}>
            <Logo />
            <span style={{ fontWeight: 600 }}>for the open dev</span>
          </Link>
          <nav style={{ display: "flex", gap: 16, flex: 1, flexWrap: "wrap" }}>
            {CATEGORIES.map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} style={{ color: "var(--text-secondary)", fontSize: 14 }}>
                {c.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Link href="/search" style={{ fontSize: 14, color: "var(--text-secondary)" }}>
              search
            </Link>
            <Link href="/supporters" style={{ fontSize: 14, color: "var(--accent-text)" }}>
              sponsor
            </Link>
            <button
              type="button"
              onClick={() => setAuthOpen(true)}
              style={{
                padding: "8px 12px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
                cursor: "pointer",
              }}
            >
              log in
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onGithub={() => {
          window.location.href = "/api/auth/sign-in/social?provider=github";
        }}
        onGoogle={() => {
          window.location.href = "/api/auth/sign-in/social?provider=google";
        }}
        onEmail={() => {
          window.location.href = "/api/auth/sign-in/email";
        }}
      />
    </>
  );
}