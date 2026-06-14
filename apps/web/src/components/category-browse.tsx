"use client";

import type { Project } from "@/lib/catalog";
import { ProjectCard } from "@/components/project-card";
import { useMemo, useState } from "react";

const TIERS = ["all", "staff pick", "featured", "verified"] as const;

export function CategoryBrowse({ projects, tags }: { projects: Project[]; tags: string[] }) {
  const [tier, setTier] = useState<(typeof TIERS)[number]>("all");
  const [tag, setTag] = useState<string>("all");
  const [maxDifficulty, setMaxDifficulty] = useState<number>(5);

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (tier !== "all" && p.tier !== tier) return false;
      if (tag !== "all" && !p.tags.includes(tag)) return false;
      if (p.difficulty > maxDifficulty) return false;
      return true;
    });
  }, [projects, tier, tag, maxDifficulty]);

  return (
    <>
      <div className="filter-bar">
        <label>
          tier
          <select value={tier} onChange={(e) => setTier(e.target.value as (typeof TIERS)[number])}>
            {TIERS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </label>
        {tags.length > 0 && (
          <label>
            tag
            <select value={tag} onChange={(e) => setTag(e.target.value)}>
              <option value="all">all</option>
              {tags.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </label>
        )}
        <label>
          max difficulty
          <select value={maxDifficulty} onChange={(e) => setMaxDifficulty(Number(e.target.value))}>
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={d}>{d}/5</option>
            ))}
          </select>
        </label>
        <span className="result-count">{filtered.length} of {projects.length}</span>
      </div>
      <div className="grid-cards">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}
