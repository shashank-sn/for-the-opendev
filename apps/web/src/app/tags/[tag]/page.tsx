import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { ALL_TAGS, getProjectsByTag } from "@/lib/catalog";

export function generateStaticParams() {
  return ALL_TAGS.map((tag) => ({ tag }));
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
  const { tag } = await params;
  if (!ALL_TAGS.includes(tag)) notFound();

  const projects = getProjectsByTag(tag);

  return (
    <PageShell title={`tag: ${tag}`} subtitle={`${projects.length} profiles`}>
      <div className="grid-cards">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </PageShell>
  );
}