import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const contentRoot = path.join(process.cwd(), "../../content");

export type ProjectContent = {
  slug: string;
  name: string;
  category: string;
  tier: string;
  license: string;
  github: string;
  website?: string;
  replaces: string;
  difficulty: number;
  tags: string[];
  lastVerified?: string | Date;
  body: string;
};

function readMdx(dir: string, slug: string) {
  const file = path.join(contentRoot, dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return { data, content };
}

export function getProjectContent(slug: string): ProjectContent | null {
  const parsed = readMdx("projects", slug);
  if (!parsed) return null;
  return { ...(parsed.data as Omit<ProjectContent, "body">), body: parsed.content };
}

export function getComparisonContent(slug: string) {
  const parsed = readMdx("comparisons", slug);
  if (!parsed) return null;
  return { ...(parsed.data as { slug: string; title: string; projects: string[] }), body: parsed.content };
}

export function getCollectionContent(slug: string) {
  const parsed = readMdx("collections", slug);
  if (!parsed) return null;
  return { ...(parsed.data as { slug: string; title: string; projects: string[] }), body: parsed.content };
}