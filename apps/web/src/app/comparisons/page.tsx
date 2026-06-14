import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { COMPARISONS } from "@/lib/catalog";

export default function ComparisonsPage() {
  return (
    <PageShell title="comparisons" subtitle={`${COMPARISONS.length} hand-written comparisons`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {COMPARISONS.map((c) => (
          <Link
            key={c.slug}
            href={`/comparisons/${c.slug}`}
            style={{
              padding: 20,
              borderRadius: "var(--radius-lg)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              color: "inherit",
            }}
          >
            <h3 style={{ margin: "0 0 6px", fontSize: 18 }}>{c.title}</h3>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>
              {c.projects.join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}