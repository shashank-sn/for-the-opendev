import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { COLLECTIONS } from "@/lib/catalog";

export default function CollectionsPage() {
  return (
    <PageShell title="collections" subtitle={`${COLLECTIONS.length} editorial collections`}>
      <div className="grid-cards">
        {COLLECTIONS.map((c) => (
          <Link
            key={c.slug}
            href={`/collections/${c.slug}`}
            style={{
              padding: 20,
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              color: "inherit",
            }}
          >
            <h3 style={{ margin: "0 0 8px", fontSize: 18 }}>{c.title}</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>
              {c.projects.length} projects
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}