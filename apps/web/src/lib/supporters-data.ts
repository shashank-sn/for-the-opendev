import { getDb, supporters } from "@ftod/db";
import { desc } from "drizzle-orm";

export type SupporterRow = {
  githubLogin: string;
  tier: string;
  amountCents: number | null;
  isEnterprise: boolean | null;
  syncedAt: Date;
};

const TIER_LABELS: Record<string, string> = {
  "open-supporter": "open supporter",
  "builder-backer": "builder backer",
  sustainer: "open source sustainer",
  custom: "enterprise",
};

export function tierLabel(tier: string) {
  return TIER_LABELS[tier] ?? tier.replace(/-/g, " ");
}

export function isEnterpriseSupporter(row: SupporterRow) {
  return Boolean(row.isEnterprise) || row.tier === "sustainer";
}

export async function getSupporters(): Promise<SupporterRow[]> {
  return getDb()
    .select({
      githubLogin: supporters.githubLogin,
      tier: supporters.tier,
      amountCents: supporters.amountCents,
      isEnterprise: supporters.isEnterprise,
      syncedAt: supporters.syncedAt,
    })
    .from(supporters)
    .orderBy(desc(supporters.syncedAt))
    .limit(100);
}