"use client";

import { Badge, Button, Card } from "@ftod/ui";
import Link from "next/link";
import { useEffect, useState } from "react";
import { PageShell } from "@/components/page-shell";
import { useAuthSession } from "@/components/auth-provider";
import { getStaffPicks } from "@/lib/catalog";

export default function LaunchesPage() {
  const staffPicks = getStaffPicks();
  const { data: session } = useAuthSession();
  const [votes, setVotes] = useState<Record<string, number>>({});

  useEffect(() => {
    Promise.all(
      staffPicks.map(async (p) => {
        const res = await fetch(`/api/launches/vote?projectSlug=${p.slug}`);
        const data = await res.json();
        return [p.slug, data.votes ?? 0] as const;
      }),
    ).then((entries) => setVotes(Object.fromEntries(entries)));
  }, [staffPicks]);

  async function vote(slug: string) {
    if (!session?.user) {
      alert("log in to vote");
      return;
    }
    const res = await fetch("/api/launches/vote", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ projectSlug: slug }),
    });
    const data = await res.json();
    if (res.ok) setVotes((prev) => ({ ...prev, [slug]: data.votes }));
  }

  const sorted = [...staffPicks].sort((a, b) => (votes[b.slug] ?? 0) - (votes[a.slug] ?? 0));

  return (
    <PageShell title="launches" subtitle="vote on staff picks — 7-day windows ship post-launch">
      <p style={{ color: "var(--text-secondary)", maxWidth: 640, marginBottom: 24 }}>
        staff picks are highlighted separately from vote ranking. votes are public once usernames ship in v1.1.
      </p>
      <div className="grid-cards">
        {sorted.map((project) => (
          <Card key={project.slug}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <Link href={`/${project.category}/${project.slug}`} className="preserve-case" style={{ fontWeight: 600 }}>
                {project.name}
              </Link>
              <Badge tier="staff pick">staff pick</Badge>
            </div>
            <p style={{ margin: "0 0 12px", color: "var(--text-secondary)", fontSize: 14 }}>
              {votes[project.slug] ?? 0} votes
            </p>
            <Button variant="secondary" onClick={() => vote(project.slug)}>
              upvote
            </Button>
          </Card>
        ))}
      </div>
    </PageShell>
  );
}