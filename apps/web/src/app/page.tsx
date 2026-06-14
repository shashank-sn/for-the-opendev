import { Button } from "@ftod/ui";
import Link from "next/link";
import { NewsletterSignup } from "@/components/newsletter-signup";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES, PROJECTS, getStaffPicks } from "@/lib/catalog";
import { SPONSOR_URLS } from "@/lib/sponsors";

export default function HomePage() {
  const staffPicks = getStaffPicks().slice(0, 8);

  return (
    <PageShell>
      <section style={{ padding: "24px 0 56px", maxWidth: 720 }}>
        <p style={{ color: "var(--accent-text)", margin: "0 0 12px", fontSize: 14 }}>
          launch catalog · {PROJECTS.length} profiles
        </p>
        <h1 style={{ margin: "0 0 16px", fontSize: 48, lineHeight: 1.1, letterSpacing: "-0.03em" }}>
          discover open source worth your time
        </h1>
        <p style={{ margin: "0 0 28px", color: "var(--text-secondary)", fontSize: 18, lineHeight: 1.6 }}>
          curated builder profiles, honest verdicts, and comparisons — not another directory. everything lowercase. no
          paid rankings.
        </p>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/tools">
            <Button>browse tools</Button>
          </Link>
          <Button href={SPONSOR_URLS["open-supporter"]} variant="secondary">
            sponsor · $1/mo
          </Button>
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <h2 style={{ margin: "0 0 16px", fontSize: 22 }}>seven categories</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/${c.slug}`}
              style={{
                padding: "10px 14px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--border-default)",
                background: "var(--bg-surface)",
                color: "var(--text-primary)",
              }}
            >
              {c.label} · {c.count}
            </Link>
          ))}
        </div>
      </section>

      <section style={{ marginBottom: 56 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <h2 style={{ margin: 0, fontSize: 22 }}>staff picks</h2>
          <Link href="/tools" style={{ fontSize: 14 }}>
            view all
          </Link>
        </div>
        <div className="grid-cards">
          {staffPicks.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>

      <section
        style={{
          marginBottom: 56,
          padding: 28,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)",
          background: "var(--bg-surface)",
        }}
      >
        <NewsletterSignup />
      </section>

      <section
        style={{
          marginBottom: 56,
          padding: 28,
          borderRadius: "var(--radius-lg)",
          border: "1px solid var(--border-default)",
          background: "var(--accent-subtle)",
        }}
      >
        <h2 style={{ margin: "0 0 8px", fontSize: 22 }}>discovery should be free</h2>
        <p style={{ margin: "0 0 16px", color: "var(--text-secondary)", maxWidth: 560 }}>
          for the open dev is open source. if we saved you an hour of research, sponsor the repo on github. $1/month
          keeps the lights on.
        </p>
        <Link href="/supporters">
          <Button>see supporter tiers</Button>
        </Link>
      </section>
    </PageShell>
  );
}