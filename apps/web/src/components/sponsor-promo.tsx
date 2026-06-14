import { Button } from "@ftod/ui";
import Link from "next/link";
import { SPONSOR_TIERS, SPONSOR_URLS } from "@/lib/sponsors";

const PAID_TIERS = SPONSOR_TIERS.filter((tier) => tier.slug !== "custom");

function TierChip({ name, price, url }: { name: string; price: number; url: string }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="sponsor-tier-chip"
    >
      <span className="sponsor-tier-chip__price">${price}</span>
      <span className="sponsor-tier-chip__name">{name}</span>
    </a>
  );
}

export function SponsorStrip() {
  return (
    <section className="sponsor-strip" aria-label="sponsor for the open dev">
      <div className="sponsor-strip__inner">
        <div className="sponsor-strip__copy">
          <p className="sponsor-strip__eyebrow">independent discovery</p>
          <p className="sponsor-strip__headline">sponsor keeps this free for everyone</p>
        </div>
        <div className="sponsor-strip__tiers">
          {PAID_TIERS.map((tier) => (
            <TierChip
              key={tier.slug}
              name={tier.name}
              price={tier.price ?? 0}
              url={tier.url}
            />
          ))}
        </div>
        <div className="sponsor-strip__actions">
          <Button href={SPONSOR_URLS["open-supporter"]}>sponsor on github</Button>
          <Link href="/supporters" className="sponsor-strip__link">
            all tiers →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SponsorHeroPanel() {
  return (
    <section className="sponsor-hero-panel" aria-label="become a sponsor">
      <div className="sponsor-hero-panel__glow" aria-hidden />
      <div className="sponsor-hero-panel__content">
        <p className="sponsor-hero-panel__eyebrow">github sponsors</p>
        <h2 className="sponsor-hero-panel__title">if we saved you an hour of research, sponsor the repo</h2>
        <p className="sponsor-hero-panel__body">
          rankings stay editorial. sponsorship never buys placement. $1/month keeps the catalog running — $100/month
          keeps it independent.
        </p>
        <div className="sponsor-hero-panel__tiers">
          {PAID_TIERS.map((tier) => (
            <TierChip
              key={tier.slug}
              name={tier.name}
              price={tier.price ?? 0}
              url={tier.url}
            />
          ))}
        </div>
        <div className="sponsor-hero-panel__actions">
          <Button href={SPONSOR_URLS["open-supporter"]}>sponsor · $1/mo</Button>
          <Button href={SPONSOR_URLS["builder-backer"]} variant="secondary">
            builder backer · $5/mo
          </Button>
          <Link href="/supporters" className="sponsor-strip__link">
            compare all tiers →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SponsorFooterBand() {
  return (
    <section className="sponsor-footer-band" aria-label="sponsor call to action">
      <div className="sponsor-footer-band__inner">
        <div>
          <p className="sponsor-footer-band__title">discovery should stay free</p>
          <p className="sponsor-footer-band__body">
            open source catalog, honest verdicts, no paid rankings. sponsor on github from $1/mo.
          </p>
        </div>
        <div className="sponsor-footer-band__actions">
          <Button href={SPONSOR_URLS["open-supporter"]}>sponsor · $1/mo</Button>
          <Button href={SPONSOR_URLS.sustainer} variant="secondary">
            sustainer · $100/mo
          </Button>
          <Link href="/supporters" className="sponsor-strip__link">
            /supporters
          </Link>
        </div>
      </div>
    </section>
  );
}