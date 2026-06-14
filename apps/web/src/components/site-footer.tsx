import Link from "next/link";
import { SponsorFooterBand } from "./sponsor-promo";
import { SPONSOR_URLS } from "@/lib/sponsors";

export function SiteFooter() {
  return (
    <footer style={{ marginTop: 80 }}>
      <SponsorFooterBand />
      <div style={{ padding: "32px 0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 28 }}>
          <div>
            <p style={{ margin: "0 0 10px", fontWeight: 600, fontSize: 14 }}>for the open dev</p>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 13, maxWidth: 240 }}>
              discover open source worth your time.
            </p>
          </div>
          <div>
            <p style={{ margin: "0 0 10px", color: "var(--text-tertiary)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>explore</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <Link href="/comparisons">comparisons</Link>
              <Link href="/collections">collections</Link>
              <Link href="/launches">launches</Link>
              <a href="https://github.com/shashank-sn/for-the-opendev/issues/new">submit a project</a>
              <Link href="/about">about</Link>
            </div>
          </div>
          <div>
            <p style={{ margin: "0 0 10px", color: "var(--text-tertiary)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>support</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <a href={SPONSOR_URLS["open-supporter"]} target="_blank" rel="noopener noreferrer">
                open supporter · $1/mo
              </a>
              <a href={SPONSOR_URLS["builder-backer"]} target="_blank" rel="noopener noreferrer">
                builder backer · $5/mo
              </a>
              <a href={SPONSOR_URLS.sustainer} target="_blank" rel="noopener noreferrer">
                sustainer · $100/mo
              </a>
              <Link href="/supporters">all tiers</Link>
            </div>
          </div>
          <div>
            <p style={{ margin: "0 0 10px", color: "var(--text-tertiary)", fontSize: 12, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>oss</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, fontSize: 13 }}>
              <a href="https://github.com/shashank-sn/for-the-opendev">github repo</a>
              <a href="https://github.com/sponsors/shashank-sn">github sponsors</a>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 32, color: "var(--text-tertiary)", fontSize: 12 }}>
          mit licensed · editorial content cc-by-4.0
        </p>
      </div>
    </footer>
  );
}
