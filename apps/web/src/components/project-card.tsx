import { Badge } from "@ftod/ui";
import Link from "next/link";
import type { Project } from "@/lib/catalog";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link href={`/${project.category}/${project.slug}`} className="ft-card" style={{ color: "inherit" }}>
      <div className="ft-card-header">
        <h3 className="ft-card-title preserve-case" style={{ margin: 0 }}>
          {project.name}
        </h3>
        <Badge tier={project.tier}>{project.tier}</Badge>
      </div>
      <p className="ft-card-desc">
        {project.replaces !== "—" ? `replaces ${project.replaces}` : project.category}
      </p>
      <div className="ft-card-meta">
        <span className="license-badge preserve-case">{project.license}</span>
        <span>difficulty {project.difficulty}/5</span>
      </div>
    </Link>
  );
}
