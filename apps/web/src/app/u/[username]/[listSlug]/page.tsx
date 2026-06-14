import { getDb, listItems, lists, user } from "@ftod/db";
import { and, eq } from "drizzle-orm";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/page-shell";
import { getProject } from "@/lib/catalog";

export default async function PublicListPage({
  params,
}: {
  params: Promise<{ username: string; listSlug: string }>;
}) {
  const { username, listSlug } = await params;
  const db = getDb();

  const [owner] = await db.select().from(user).where(eq(user.username, username)).limit(1);
  if (!owner) notFound();

  const [list] = await db
    .select()
    .from(lists)
    .where(and(eq(lists.userId, owner.id), eq(lists.slug, listSlug), eq(lists.isPublic, true)))
    .limit(1);

  if (!list) notFound();

  const items = await db.select().from(listItems).where(eq(listItems.listId, list.id));

  return (
    <PageShell title={list.title} subtitle={`public list by @${username}`}>
      <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item) => {
          const project = getProject(item.projectSlug);
          if (!project) return null;
          return (
            <li key={item.id}>
              <Link href={`/${project.category}/${project.slug}`} className="preserve-case">
                {project.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </PageShell>
  );
}