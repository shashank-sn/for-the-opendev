import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { SPONSOR_URLS } from "@/lib/sponsors";

export function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--border-default)", marginTop: 80 }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "40px 24px 56px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 32 }}>
          <div>
            <p style={{ margin: "0 0 12px", fontWeight: 600 }}>for the open dev</p>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14, maxWidth: 280 }}>
              discover open source worth your time. curated profiles, honest verdicts, comparisons.
            </p>
          </div>
          <div>
            <p style={{ margin: "0 0 12px", color: "var(--text-tertiary)", fontSize: 13 }}>explore</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <Link href="/comparisons">comparisons</Link>
              <Link href="/collections">collections</Link>
              <Link href="/launches">launches</Link>
              <Link href="/submit">submit a project</Link>
              <Link href="/about">about</Link>
            </div>
          </div>
          <div>
            <p style={{ margin: "0 0 12px", color: "var(--text-tertiary)", fontSize: 13 }}>support</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
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
            <NewsletterSignup compact />
          </div>
          <div>
            <p style={{ margin: "0 0 12px", color: "var(--text-tertiary)", fontSize: 13 }}>oss</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 14 }}>
              <a href="https://github.com/shashank-sn/for-the-opendev">github repo</a>
              <a href="https://github.com/sponsors/shashank-sn">github sponsors</a>
            </div>
          </div>
        </div>
        <p style={{ marginTop: 40, color: "var(--text-tertiary)", fontSize: 13 }}>
          mit licensed · editorial content cc-by-4.0 · built with better-auth, next.js, pagefind
        </p>
      </div>
    </footer>
  );
}