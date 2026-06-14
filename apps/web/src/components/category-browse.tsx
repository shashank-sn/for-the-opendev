"use client";

import type { CSSProperties } from "react";
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
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          marginBottom: 24,
          alignItems: "center",
        }}
      >
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          tier
          <select
            value={tier}
            onChange={(e) => setTier(e.target.value as (typeof TIERS)[number])}
            style={selectStyle}
          >
            {TIERS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>
        {tags.length > 0 && (
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
            tag
            <select value={tag} onChange={(e) => setTag(e.target.value)} style={selectStyle}>
              <option value="all">all</option>
              {tags.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        )}
        <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          max difficulty
          <select
            value={maxDifficulty}
            onChange={(e) => setMaxDifficulty(Number(e.target.value))}
            style={selectStyle}
          >
            {[1, 2, 3, 4, 5].map((d) => (
              <option key={d} value={d}>
                {d}/5
              </option>
            ))}
          </select>
        </label>
        <span style={{ fontSize: 14, color: "var(--text-tertiary)" }}>
          {filtered.length} of {projects.length}
        </span>
      </div>
      <div className="grid-cards">
        {filtered.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </>
  );
}

const selectStyle: CSSProperties = {
  padding: "6px 10px",
  borderRadius: "var(--radius-md)",
  border: "1px solid var(--border-default)",
  background: "var(--bg-surface)",
  color: "var(--text-primary)",
};