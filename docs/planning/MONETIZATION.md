# monetization & ethics

**product:** for the open dev  
**version:** 2.0  

---

## 1. philosophy

for the open dev is **open source** (MIT) and exists to help builders discover open source worth their time. monetization must never compromise that mission.

**hard rules (never break):**

1. core discovery is free forever — no paywalled profiles, comparisons, or search
2. never accept payment for reviews, ratings, or badge tiers
3. never accept payment for ranking position in browse or search
4. sponsored content is always clearly labeled
5. editorial verdicts are never influenced by money
6. community reviews are never incentivized with payment
7. the lowercase brand is not for sale
8. we only build on open source — see OPEN-SOURCE-STACK.md

---

## 2. primary revenue: github sponsors

supporters sponsor via **github sponsors**: https://github.com/sponsors/shashank-sn (profile approved & public).

the public oss repo must ship with `.github/FUNDING.yml` so the sponsor button appears on the repo page. see REPOSITORY.md §3b–3d for the full go-live gate.

no stripe required. github sponsors is the only supporter rail.

### 2.1 four sponsorship options

| option | display name | price | slug |
|--------|--------------|-------|------|
| tier 1 | open supporter | **$1/month** | `open-supporter` |
| tier 2 | builder backer | **$5/month** | `builder-backer` |
| tier 3 | open source sustainer | **$100/month** | `sustainer` |
| custom | custom sponsor | **any amount** | `custom` |

all names lowercase in ui.

### 2.2 perks by tier

| perk | $1 | $5 | $100 | custom |
|------|:--:|:--:|:----:|:------:|
| "open supporter" badge on profile (minimum) | ✓ | ✓ | ✓ | ✓ |
| name on /supporters wall | ✓ | ✓ | ✓ | ✓ |
| founding supporter badge (first 100, permanent) | ✓ | ✓ | ✓ | ✓ |
| name in github readme sponsor section | — | ✓ | ✓ | ✓ |
| logo on /supporters enterprise section | — | — | ✓ | if ≥ $100 |
| thank-you in monthly newsletter | — | — | ✓ | ✓ |
| dedicated enterprise line on /supporters | — | — | — | negotiated |

### 2.3 what no tier gets

- weighted launch votes
- paywalled features or content
- priority submission review
- influence on verdicts, rankings, or badge tiers
- paid profile placement in browse or search

### 2.4 supporter page copy

> discovery should be free. for the open dev is open source — the code, the profiles, the comparisons. if we saved you an hour of research, sponsor the repo on github. $1/month keeps the lights on. $100/month keeps it independent.

### 2.5 enterprise / big companies

companies sponsor via **custom amount** on github sponsors (any amount, public or private).

for invoicing or larger partnerships: hello@fortheopen.dev

enterprise sponsors appear on `/supporters` under "enterprise sponsors" — clearly separated from editorial content. never on profile verdicts.

---

## 3. secondary revenue (phase 2+)

only after trust is established (100+ profiles, 5,000+ mau).

| stream | phase | notes |
|--------|-------|-------|
| sponsored placements | v2 | clearly labeled, never mixed with staff pick |
| newsletter sponsorship | v2 | one line per issue, oss companies only preferred |
| api access | v3 | if demand exists |

sponsored placements still never touch reviews or rankings.

---

## 4. cost structure

| item | monthly cost |
|------|-------------|
| cloudflare pages + workers + d1 | $5–25 |
| domain fortheopen.dev | ~$1 |
| self-hosted umami/plausible | $0–10 (on same infra) |
| github (org + actions) | $0–4 |
| **total** | **$10–40/mo** |

### break-even

| sponsors | blended avg | monthly |
|----------|-------------|---------|
| 50 × $1 | $1 | $50 |
| 20 × $1 + 10 × $5 | ~$2.3 | $70 |
| 100 × $1 + 20 × $5 + 2 × $100 | ~$2.7 | $270 |
| 500 × $1 + 50 × $5 + 5 × $100 | ~$2.5 | $1,250 |

---

## 5. ethics policy (published on /about)

### editorial independence

> our verdicts, comparisons, and badge tiers are based on builder-friendly criteria — not payments. we will never accept money to review, rank, or endorse a project.

### sponsorship transparency

> github sponsors support the platform, not individual listings. current sponsors are listed on /supporters. sponsored placements (if any) are labeled "sponsored" and visually distinct.

### open source commitment

> the platform code is mit-licensed. we build on open source — better-auth, pagefind, lucide, geist. see our stack at github.com/fortheopendev/fortheopendev.

---

## 6. what we won't do (ever)

| practice | why not |
|----------|---------|
| pay-to-list | destroys trust |
| pay-to-review | destroys credibility |
| pay-to-rank | makes discovery useless |
| stripe upsells on discovery | github sponsors is enough |
| proprietary auth/analytics deps | violates oss policy |
| crypto sponsorships | off-mission |

---

## 7. implementation checklist

### v1 (launch)

- [ ] public mit repo live
- [ ] github sponsors profile approved
- [ ] three tiers created: $1, $5, $100
- [ ] custom amount enabled
- [ ] FUNDING.yml in repo
- [ ] /supporters page with tier explanation
- [ ] better-auth github oauth links sponsor status
- [ ] founding supporter logic (first 100)

### v2

- [ ] sponsored placement components
- [ ] enterprise sponsor inquiry form
- [ ] newsletter sponsorship workflow

---

*see REPOSITORY.md for repo structure. see OPEN-SOURCE-STACK.md for dependency policy.*