import type { ReactNode } from "react";
import { MobileHeader, SiteSidebar } from "./site-header";
import { SponsorStrip } from "./sponsor-promo";
import { SiteFooter } from "./site-footer";

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
      <MobileHeader />
      <div className="app-layout">
        <SiteSidebar />
        <div className="main-content">
          <SponsorStrip />
          <div className="main-inner">
            {(title || subtitle) && (
              <div className="page-header">
                {title && <h1>{title}</h1>}
                {subtitle && <p>{subtitle}</p>}
              </div>
            )}
            {children}
          </div>
          <SiteFooter />
        </div>
      </div>
    </>
  );
}
