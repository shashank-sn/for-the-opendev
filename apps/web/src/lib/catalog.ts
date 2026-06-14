import catalog from "../../../../content/catalog.json";

export type Project = (typeof catalog.projects)[number];
export type Category = (typeof catalog.categories)[number];

export const CATEGORIES = catalog.categories;
export const PROJECTS = catalog.projects;
export const COMPARISONS = catalog.comparisons;
export const COLLECTIONS = catalog.collections;
export { SPONSOR_TIERS } from "./sponsors";

export function getProjectsByCategory(category: string): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getStaffPicks(): Project[] {
  return PROJECTS.filter((p) => p.tier === "staff pick");
}

export const ALL_TAGS = [...new Set(PROJECTS.flatMap((p) => p.tags))].sort();

export function getProjectsByTag(tag: string): Project[] {
  return PROJECTS.filter((p) => p.tags.includes(tag));
}

export type TierFilter = Project["tier"] | "all";

export function filterProjects(
  projects: Project[],
  opts: { tier?: TierFilter; tag?: string; maxDifficulty?: number },
): Project[] {
  return projects.filter((p) => {
    if (opts.tier && opts.tier !== "all" && p.tier !== opts.tier) return false;
    if (opts.tag && !p.tags.includes(opts.tag)) return false;
    if (opts.maxDifficulty !== undefined && p.difficulty > opts.maxDifficulty) return false;
    return true;
  });
}