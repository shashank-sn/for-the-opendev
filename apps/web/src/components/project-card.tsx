import { Badge, Card } from "@ftod/ui";
import type { Project } from "@/lib/catalog";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card href={`/${project.category}/${project.slug}`}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
        <h3 className="project-name preserve-case" style={{ margin: 0, fontSize: 18 }}>
          {project.name}
        </h3>
        <Badge tier={project.tier}>{project.tier}</Badge>
      </div>
      <p style={{ margin: "0 0 12px", color: "var(--text-secondary)", fontSize: 14 }}>
        {project.replaces !== "—" ? `replaces ${project.replaces}` : project.category}
      </p>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <span className="license-badge preserve-case" style={{ fontSize: 12, color: "var(--text-tertiary)" }}>
          {project.license}
        </span>
        <span style={{ fontSize: 12, color: "var(--text-tertiary)" }}>difficulty {project.difficulty}/5</span>
      </div>
    </Card>
  );
}