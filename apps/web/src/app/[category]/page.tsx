import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { ProjectCard } from "@/components/project-card";
import { CATEGORIES, getProjectsByCategory } from "@/lib/catalog";

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const meta = CATEGORIES.find((c) => c.slug === category);
  if (!meta) notFound();

  const projects = getProjectsByCategory(category);

  return (
    <PageShell title={meta.label} subtitle={`${projects.length} launch profiles`}>
      <div className="grid-cards">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </PageShell>
  );
}