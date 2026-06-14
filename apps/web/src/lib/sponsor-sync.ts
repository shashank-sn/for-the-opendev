import { getDb, supporters } from "@ftod/db";
import { sql } from "drizzle-orm";
import { createId } from "@/lib/ids";
import { FOUNDING_SUPPORTER_LIMIT, SPONSOR_GITHUB_HANDLE } from "@/lib/sponsors";

export function normalizeSponsorTier(name?: string | null) {
  if (!name) return "custom";
  const lower = name.toLowerCase();
  if (lower.includes("open supporter") || lower.includes("open-supporter")) return "open-supporter";
  if (lower.includes("builder backer") || lower.includes("builder-backer")) return "builder-backer";
  if (lower.includes("sustainer")) return "sustainer";
  return lower.replace(/\s+/g, "-");
}

type UpsertInput = {
  githubLogin: string;
  tier: string;
  amountCents: number | null;
  isEnterprise?: boolean;
};

export async function upsertSupporter(input: UpsertInput) {
  const db = getDb();
  const now = new Date();
  const tier = normalizeSponsorTier(input.tier);
  const isEnterprise = input.isEnterprise ?? tier === "custom";

  await db
    .insert(supporters)
    .values({
      id: createId("sup"),
      githubLogin: input.githubLogin,
      tier,
      amountCents: input.amountCents,
      isEnterprise,
      syncedAt: now,
    })
    .onConflictDoUpdate({
      target: supporters.githubLogin,
      set: {
        tier,
        amountCents: input.amountCents,
        isEnterprise,
        syncedAt: now,
      },
    });

  const [{ count }] = await db.select({ count: sql<number>`count(*)` }).from(supporters);

  return {
    githubLogin: input.githubLogin,
    tier,
    foundingSupporterEligible: Number(count) <= FOUNDING_SUPPORTER_LIMIT,
  };
}

type GraphqlSponsorNode = {
  sponsorEntity?: { login?: string | null } | null;
  tier?: { name?: string | null; monthlyPriceInCents?: number | null } | null;
  isOneTimePayment?: boolean | null;
};

type GraphqlResponse = {
  data?: {
    user?: {
      sponsorshipsAsMaintainer?: {
        pageInfo?: { hasNextPage?: boolean; endCursor?: string | null };
        nodes?: GraphqlSponsorNode[] | null;
      } | null;
    } | null;
  };
  errors?: { message?: string }[];
};

const SPONSORS_QUERY = `
  query Sponsors($login: String!, $cursor: String) {
    user(login: $login) {
      sponsorshipsAsMaintainer(first: 100, after: $cursor, includeInactive: false) {
        pageInfo {
          hasNextPage
          endCursor
        }
        nodes {
          sponsorEntity {
            ... on User { login }
            ... on Organization { login }
          }
          tier {
            name
            monthlyPriceInCents
          }
          isOneTimePayment
        }
      }
    }
  }
`;

export async function syncSponsorsFromGitHub() {
  const token = process.env.GITHUB_SPONSORS_TOKEN ?? process.env.GITHUB_TOKEN;
  if (!token) {
    return {
      ok: false as const,
      error: "missing GITHUB_SPONSORS_TOKEN or GITHUB_TOKEN",
      synced: 0,
    };
  }

  const synced: Awaited<ReturnType<typeof upsertSupporter>>[] = [];
  let cursor: string | null = null;
  let hasNextPage = true;

  while (hasNextPage) {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": "for-the-open-dev-sponsor-sync",
      },
      body: JSON.stringify({
        query: SPONSORS_QUERY,
        variables: { login: SPONSOR_GITHUB_HANDLE, cursor },
      }),
    });

    if (!response.ok) {
      const body = await response.text();
      return {
        ok: false as const,
        error: `github api ${response.status}: ${body.slice(0, 200)}`,
        synced: synced.length,
      };
    }

    const payload = (await response.json()) as GraphqlResponse;
    if (payload.errors?.length) {
      return {
        ok: false as const,
        error: payload.errors.map((e) => e.message).join("; "),
        synced: synced.length,
      };
    }

    const connection = payload.data?.user?.sponsorshipsAsMaintainer;
    const nodes = connection?.nodes ?? [];

    for (const node of nodes) {
      const login = node.sponsorEntity?.login;
      if (!login) continue;

      const tierName = node.tier?.name ?? "custom";
      const amountCents = node.tier?.monthlyPriceInCents ?? null;

      synced.push(
        await upsertSupporter({
          githubLogin: login,
          tier: tierName,
          amountCents,
          isEnterprise: tierName.toLowerCase().includes("custom") || node.isOneTimePayment === true,
        }),
      );
    }

    hasNextPage = Boolean(connection?.pageInfo?.hasNextPage);
    cursor = connection?.pageInfo?.endCursor ?? null;
  }

  return {
    ok: true as const,
    synced: synced.length,
    sponsors: synced,
    syncedAt: new Date().toISOString(),
  };
}