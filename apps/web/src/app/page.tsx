import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { SponsorHeroPanel } from "@/components/sponsor-promo";
import { CATEGORIES, COLLECTIONS, PROJECTS, getStaffPicks } from "@/lib/catalog";

export default function HomePage() {
  const staffPicks = getStaffPicks().slice(0, 6);

  return (
    <PageShell>
      {/* hero */}
      <section className="stagger-item" style={{ marginBottom: 48, maxWidth: 600 }}>
        <p style={{ color: "var(--accent-text)", margin: "0 0 10px", fontSize: 13, fontWeight: 500 }}>
          {PROJECTS.length} curated profiles
        </p>
        <h1 style={{ margin: "0 0 14px", fontSize: 36, lineHeight: 1.1, letterSpacing: "-0.03em", fontWeight: 600 }}>
          discover open source worth your time
        </h1>
        <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 16, lineHeight: 1.6 }}>
          curated builder profiles, honest verdicts, and comparisons — not another directory.
        </p>
      </section>

      {/* sponsor panel */}
      <section className="stagger-item" style={{ marginBottom: 48 }}>
        <SponsorHeroPanel />
      </section>

      {/* categories */}
      <section className="stagger-item" style={{ marginBottom: 48 }}>
        <h2 style={{ margin: "0 0 14px", fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>categories</h2>
        <div className="category-grid">
          {CATEGORIES.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`} className="category-tile">
              {c.label}
              <span className="category-tile-count">{c.count}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* collections */}
      <section className="stagger-item" style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>collections</h2>
          <Link href="/collections" style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
            view all →
          </Link>
        </div>
        <div className="grid-cards">
          {COLLECTIONS.slice(0, 6).map((c) => {
            const icons = c.projects.slice(0, 5).map((slug) => {
              const p = PROJECTS.find((proj) => proj.slug === slug);
              return p ? p.name.charAt(0).toUpperCase() : "?";
            });
            return (
              <Link key={c.slug} href={`/collections/${c.slug}`} className="collection-card">
                <div className="collection-card-icons">
                  {icons.map((initial, i) => (
                    <div key={i} className="collection-card-icon">{initial}</div>
                  ))}
                </div>
                <h3 className="collection-card-title">{c.title}</h3>
                <p className="collection-card-desc">
                  {c.projects.length} curated open source projects
                </p>
                <div className="collection-card-count">{c.projects.length} tools</div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* staff picks */}
      <section className="stagger-item" style={{ marginBottom: 48 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <h2 style={{ margin: 0, fontSize: 18, fontWeight: 600, letterSpacing: "-0.01em" }}>staff picks</h2>
          <Link href="/launches" style={{ fontSize: 13, color: "var(--text-tertiary)" }}>
            view all →
          </Link>
        </div>
        <div className="grid-cards">
          {staffPicks.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </section>
    </PageShell>
  );
}
