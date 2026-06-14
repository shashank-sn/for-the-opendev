import catalog from "../../../../content/catalog.json";

export type Project = (typeof catalog.projects)[number];
export type Category = (typeof catalog.categories)[number];

export const CATEGORIES = catalog.categories;
export const PROJECTS = catalog.projects;
export const COMPARISONS = catalog.comparisons;
export const COLLECTIONS = catalog.collections;
export const SPONSOR_TIERS = catalog.sponsorTiers;

export function getProjectsByCategory(category: string): Project[] {
  return PROJECTS.filter((p) => p.category === category);
}

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getStaffPicks(): Project[] {
  return PROJECTS.filter((p) => p.tier === "staff pick");
}