import type { ReactNode } from "react";
import { SponsorStrip } from "./sponsor-promo";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function PageShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title?: string;
  subtitle?: string;
}) {
  return (
    <>
      <SiteHeader />
      <SponsorStrip />
      <main style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 0", minHeight: "70vh" }}>
        {(title || subtitle) && (
          <header style={{ marginBottom: 32 }}>
            {title && <h1 style={{ margin: "0 0 8px", fontSize: 36, letterSpacing: "-0.02em" }}>{title}</h1>}
            {subtitle && <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 18 }}>{subtitle}</p>}
          </header>
        )}
        {children}
      </main>
      <SiteFooter />
    </>
  );
}