"use client";

import { Logo, ThemeToggle } from "@ftod/ui";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CATEGORIES } from "@/lib/catalog";
import { SPONSOR_URLS } from "@/lib/sponsors";

const NAV_LINKS = [
  { label: "home", href: "/" },
  { label: "search", href: "/search" },
  { label: "comparisons", href: "/comparisons" },
  { label: "collections", href: "/collections" },
  { label: "launches", href: "/launches" },
  { label: "tags", href: "/tags" },
  { label: "supporters", href: "/supporters" },
  { label: "about", href: "/about" },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <Link href="/" className="sidebar-logo" style={{ color: "inherit" }}>
        <Logo size={24} />
        <span>for the open dev</span>
      </Link>

      <Link href="/search" className="sidebar-search-btn">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.3-4.3" />
        </svg>
        search
        <kbd>⌘K</kbd>
      </Link>

      <nav className="sidebar-nav">
        <div className="sidebar-section-label">browse</div>
        {CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={`/${c.slug}`}
            className={`sidebar-link${pathname === `/${c.slug}` ? " active" : ""}`}
          >
            {c.label}
            <span style={{ marginLeft: "auto", fontSize: 11, color: "var(--text-tertiary)" }}>{c.count}</span>
          </Link>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: 8 }}>explore</div>
        {NAV_LINKS.slice(2).map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link${pathname === link.href ? " active" : ""}`}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a
            href={SPONSOR_URLS["open-supporter"]}
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: 13, color: "var(--accent-text)" }}
          >
            sponsor · $1/mo
          </a>
          <ThemeToggle />
        </div>
      </div>
    </>
  );
}

export function SiteSidebar() {
  return (
    <aside className="sidebar">
      <SidebarContent />
    </aside>
  );
}

export function MobileHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mobile-header">
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "inherit" }}>
          <Logo size={22} />
          <span style={{ fontWeight: 600, fontSize: 15 }}>for the open dev</span>
        </Link>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Link href="/search" style={{ color: "var(--text-secondary)", padding: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </Link>
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="open menu"
            style={{
              background: "none",
              border: "none",
              color: "var(--text-secondary)",
              cursor: "pointer",
              padding: 8,
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className={`mobile-menu-overlay${open ? " open" : ""}`}
        onClick={() => setOpen(false)}
      />
      <div className={`mobile-menu${open ? " open" : ""}`}>
        <div style={{ padding: "12px 12px 8px", display: "flex", justifyContent: "flex-end" }}>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="close menu"
            style={{ background: "none", border: "none", color: "var(--text-secondary)", cursor: "pointer", padding: 8 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <SidebarContent />
      </div>
    </>
  );
}
