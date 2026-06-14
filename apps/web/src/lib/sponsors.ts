export const SPONSOR_GITHUB_HANDLE = "shashank-sn";
export const SPONSOR_PROFILE_URL = `https://github.com/sponsors/${SPONSOR_GITHUB_HANDLE}`;

export type SponsorTierSlug = "open-supporter" | "builder-backer" | "sustainer" | "custom";

export type SponsorTier = {
  slug: SponsorTierSlug;
  name: string;
  price: number | null;
  url: string;
  /**
   * Paste from GitHub Sponsors dashboard → tier → share link (`tier_id=…`).
   * Until set, paid tiers link to the monthly sponsorship page.
   */
  githubTierId?: number;
};

const TIER_DEFS: Omit<SponsorTier, "url">[] = [
  { slug: "open-supporter", name: "open supporter", price: 1 },
  { slug: "builder-backer", name: "builder backer", price: 5 },
  { slug: "sustainer", name: "open source sustainer", price: 100 },
  { slug: "custom", name: "custom amount", price: null },
];

export function sponsorTierUrl(tier: Omit<SponsorTier, "url">): string {
  if (tier.slug === "custom") {
    return SPONSOR_PROFILE_URL;
  }

  if (tier.githubTierId != null) {
    return `${SPONSOR_PROFILE_URL}/sponsorships?tier_id=${tier.githubTierId}`;
  }

  return `${SPONSOR_PROFILE_URL}?frequency=recurring`;
}

export const SPONSOR_TIERS: SponsorTier[] = TIER_DEFS.map((tier) => ({
  ...tier,
  url: sponsorTierUrl(tier),
}));

export const SPONSOR_URLS = Object.fromEntries(SPONSOR_TIERS.map((t) => [t.slug, t.url])) as Record<
  SponsorTierSlug,
  string
>;

export const FOUNDING_SUPPORTER_LIMIT = 100;