import { Button } from "@ftod/ui";
import Link from "next/link";
import { SPONSOR_TIERS, SPONSOR_URLS } from "@/lib/sponsors";

const PAID_TIERS = SPONSOR_TIERS.filter((tier) => tier.slug !== "custom");

export function SponsorStrip() {
  return (
    <section className="sponsor-strip" aria-label="sponsor for the open dev">
      <div className="sponsor-strip__inner">
        <div className="sponsor-strip__copy">
          <p className="sponsor-strip__eyebrow">independent discovery</p>
          <p className="sponsor-strip__headline">sponsor keeps this free</p>
        </div>
        <div className="sponsor-strip__tiers">
          {PAID_TIERS.map((tier) => (
            <a key={tier.slug} href={tier.url} target="_blank" rel="noopener noreferrer" className="sponsor-tier-chip">
              <span className="sponsor-tier-chip__price">${tier.price}</span>
              <span className="sponsor-tier-chip__name">{tier.name}</span>
            </a>
          ))}
        </div>
        <a href={SPONSOR_URLS["open-supporter"]} target="_blank" rel="noopener noreferrer" className="sponsor-strip__link">
          sponsor on github →
        </a>
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
          rankings stay editorial. sponsorship never buys placement. $1/month keeps the catalog running.
        </p>
        <div className="sponsor-hero-panel__tiers">
          {PAID_TIERS.map((tier) => (
            <a key={tier.slug} href={tier.url} target="_blank" rel="noopener noreferrer" className="sponsor-tier-chip">
              <span className="sponsor-tier-chip__price">${tier.price}</span>
              <span className="sponsor-tier-chip__name">{tier.name}</span>
            </a>
          ))}
        </div>
        <div className="sponsor-hero-panel__actions">
          <Button href={SPONSOR_URLS["open-supporter"]}>sponsor · $1/mo</Button>
          <Link href="/supporters" className="sponsor-strip__link">
            compare tiers →
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SponsorFooterBand() {
  return (
    <div className="sponsor-footer-band">
      <div className="sponsor-footer-band__inner">
        <div>
          <p className="sponsor-footer-band__title">discovery should stay free</p>
          <p className="sponsor-footer-band__body">
            open source catalog, honest verdicts, no paid rankings. sponsor on github from $1/mo.
          </p>
        </div>
        <div className="sponsor-footer-band__actions">
          <Button href={SPONSOR_URLS["open-supporter"]}>sponsor · $1/mo</Button>
          <Link href="/supporters" className="sponsor-strip__link">
            /supporters
          </Link>
        </div>
      </div>
    </div>
  );
}
