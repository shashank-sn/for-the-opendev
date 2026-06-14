import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ALL_TAGS, getProjectsByTag } from "@/lib/catalog";

export default function TagsIndexPage() {
  return (
    <PageShell title="tags" subtitle="browse profiles by tag">
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {ALL_TAGS.map((tag) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            style={{
              padding: "10px 14px",
              borderRadius: "var(--radius-md)",
              border: "1px solid var(--border-default)",
              background: "var(--bg-surface)",
              color: "var(--text-primary)",
              fontSize: 14,
            }}
          >
            {tag} · {getProjectsByTag(tag).length}
          </Link>
        ))}
      </div>
    </PageShell>
  );
}