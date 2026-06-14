import { Badge } from "@ftod/ui";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { AddToListButton } from "@/components/add-to-list-button";
import { CommunityReviews } from "@/components/community-reviews";
import { PageShell } from "@/components/page-shell";
import { CATEGORIES, getProject } from "@/lib/catalog";
import { getProjectContent } from "@/lib/content";

export async function generateStaticParams() {
  const { PROJECTS } = await import("@/lib/catalog");
  return PROJECTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const project = getProject(slug);
  if (!project || project.category !== category) notFound();

  const content = getProjectContent(slug);
  const categoryLabel = CATEGORIES.find((c) => c.slug === category)?.label ?? category;

  return (
    <PageShell>
      <article style={{ maxWidth: 760 }}>
        <p style={{ color: "var(--text-tertiary)", margin: "0 0 8px", fontSize: 14 }}>
          {categoryLabel} / {project.slug}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
          <h1 className="project-name preserve-case" style={{ margin: 0, fontSize: 40 }}>
            {project.name}
          </h1>
          <Badge tier={project.tier}>{project.tier}</Badge>
        </div>
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", marginBottom: 28, fontSize: 14, color: "var(--text-secondary)" }}>
          <span className="license-badge preserve-case">{project.license}</span>
          <span>difficulty {project.difficulty}/5</span>
          {project.replaces !== "—" && <span>replaces {project.replaces}</span>}
          <a href={project.github} className="preserve-case">
            github
          </a>
          {project.website && (
            <a href={project.website} className="preserve-case">
              website
            </a>
          )}
        </div>

        <div className="prose">
          <ReactMarkdown>{content?.body ?? "profile content loading..."}</ReactMarkdown>
        </div>

        <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <AddToListButton projectSlug={project.slug} />
          <a
            href={`/api/badges/${project.slug}`}
            style={{
              padding: "8px 12px",
              border: "1px solid var(--border-default)",
              borderRadius: "var(--radius-md)",
              fontSize: 14,
            }}
          >
            embed badge
          </a>
        </div>

        <CommunityReviews projectSlug={project.slug} />
      </article>
    </PageShell>
  );
}