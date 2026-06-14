"use client";

import { Button, Logo, ThemeToggle } from "@ftod/ui";
import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { SPONSOR_URLS } from "@/lib/sponsors";

export function SiteHeader() {
  return (
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
          <Button
            href={SPONSOR_URLS["open-supporter"]}
            style={{ padding: "8px 14px", fontSize: 14, whiteSpace: "nowrap" }}
          >
            sponsor · $1
          </Button>
          <Link href="/supporters" style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
            tiers
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}