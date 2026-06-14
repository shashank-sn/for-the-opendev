import { Badge } from "@ftod/ui";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { PageShell } from "@/components/page-shell";
import { CATEGORIES, getProject } from "@/lib/catalog";
import { getProjectContent } from "@/lib/content";
import { jsonLdScript, projectJsonLd } from "@/lib/structured-data";

function verdictExcerpt(body: string) {
  const match = body.match(/## verdict\s*\n+([\s\S]*?)(?=\n## |\n*$)/i);
  return match?.[1]?.replace(/\s+/g, " ").trim();
}

export async function generateStaticParams() {
  const { PROJECTS } = await import("@/lib/catalog");
  return PROJECTS.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  const content = getProjectContent(slug);
  const excerpt = content?.body ? verdictExcerpt(content.body) : undefined;
  const description =
    excerpt ??
    `${project.name} — ${project.replaces !== "—" ? `open source alternative to ${project.replaces}` : `open source ${project.category}`} on for the open dev.`;

  return {
    title: `${project.name} · for the open dev`,
    description: description.slice(0, 160),
    openGraph: {
      title: `${project.name} · for the open dev`,
      description: description.slice(0, 160),
      type: "article",
    },
  };
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(projectJsonLd(project)) }}
      />
      <div className="profile-layout">
        <article>
          <p style={{ color: "var(--text-tertiary)", margin: "0 0 8px", fontSize: 14 }}>
            {categoryLabel} / {project.slug}
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12, flexWrap: "wrap" }}>
            <h1 className="project-name preserve-case" style={{ margin: 0, fontSize: 40 }}>
              {project.name}
            </h1>
            <Badge tier={project.tier}>{project.tier}</Badge>
          </div>
          <div
            style={{
              display: "flex",
              gap: 16,
              flexWrap: "wrap",
              marginBottom: 28,
              fontSize: 14,
              color: "var(--text-secondary)",
            }}
          >
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
            <a
              href={`/badges/${project.slug}.svg`}
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
        </article>

        <aside className="profile-sidebar">
          <h2 style={{ margin: "0 0 16px", fontSize: 14, color: "var(--text-tertiary)", fontWeight: 500 }}>
            quick facts
          </h2>
          <dl className="profile-facts">
            <div>
              <dt>category</dt>
              <dd>{categoryLabel}</dd>
            </div>
            <div>
              <dt>tier</dt>
              <dd>{project.tier}</dd>
            </div>
            <div>
              <dt>license</dt>
              <dd className="preserve-case">{project.license}</dd>
            </div>
            <div>
              <dt>difficulty</dt>
              <dd>{project.difficulty}/5</dd>
            </div>
            {project.replaces !== "—" && (
              <div>
                <dt>replaces</dt>
                <dd>{project.replaces}</dd>
              </div>
            )}
            {content?.lastVerified && (
              <div>
                <dt>last verified</dt>
                <dd>
                  {content.lastVerified instanceof Date
                    ? content.lastVerified.toISOString().slice(0, 10)
                    : String(content.lastVerified)}
                </dd>
              </div>
            )}
            {project.tags.length > 0 && (
              <div>
                <dt>tags</dt>
                <dd>{project.tags.join(", ")}</dd>
              </div>
            )}
          </dl>
        </aside>
      </div>
    </PageShell>
  );
}