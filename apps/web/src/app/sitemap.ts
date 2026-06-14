import type { MetadataRoute } from "next";
import { ALL_TAGS, CATEGORIES, COLLECTIONS, COMPARISONS, PROJECTS } from "@/lib/catalog";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fortheopen.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/about",
    "/supporters",
    "/search",
    "/submit",
    "/launches",
    "/comparisons",
    "/collections",
    "/tags",
    "/dashboard",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const categories = CATEGORIES.map((c) => ({
    url: `${base}/${c.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const projects = PROJECTS.map((p) => ({
    url: `${base}/${p.category}/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: p.tier === "staff pick" ? 0.9 : 0.6,
  }));

  const comparisons = COMPARISONS.map((c) => ({
    url: `${base}/comparisons/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const collections = COLLECTIONS.map((c) => ({
    url: `${base}/collections/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tags = ALL_TAGS.map((tag) => ({
    url: `${base}/tags/${tag}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...categories, ...projects, ...comparisons, ...collections, ...tags];
}