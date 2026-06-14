import supportersData from "../../data/supporters.json";

export type SupporterRow = {
  githubLogin: string;
  tier: string;
  amountCents: number | null;
  isEnterprise: boolean | null;
  syncedAt: string;
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

export function getSupporters(): SupporterRow[] {
  return supportersData as SupporterRow[];
}