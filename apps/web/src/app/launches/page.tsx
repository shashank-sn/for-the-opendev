import { Badge, Card } from "@ftod/ui";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { getStaffPicks } from "@/lib/catalog";

export default function LaunchesPage() {
  const staffPicks = getStaffPicks();

  return (
    <PageShell title="launches" subtitle="staff picks — highlighted separately from catalog rankings">
      <p style={{ color: "var(--text-secondary)", maxWidth: 640, marginBottom: 24 }}>
        these are the projects we&apos;d ship first. community voting ships when we add a backend — for now, explore the
        profiles and sponsor if we saved you time.
      </p>
      <div className="grid-cards">
        {staffPicks.map((project) => (
          <Card key={project.slug}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Link href={`/${project.category}/${project.slug}`} className="preserve-case" style={{ fontWeight: 600 }}>
                {project.name}
              </Link>
              <Badge tier="staff pick">staff pick</Badge>
            </div>
            <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: 14 }}>
              {project.replaces !== "—" ? `replaces ${project.replaces}` : project.category}
            </p>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}