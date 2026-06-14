import { PageShell } from "@/components/page-shell";

export default function AboutPage() {
  return (
    <PageShell title="about" subtitle="editorial policy and mission">
      <div className="prose" style={{ maxWidth: 720 }}>
        <h2>mission</h2>
        <p>
          for the open dev is a discovery layer for open source — curated profiles, honest verdicts, comparisons, and
          badges. we help solo devs and indie builders choose faster without star-count leaderboards or paid placement.
        </p>

        <h2>editorial policy</h2>
        <ul>
          <li>every listed project has a verified oss license on github</li>
          <li>verdicts are written by editors — never sold</li>
          <li>sponsored content is always labeled and never affects rankings</li>
          <li>community reviews are structured and never incentivized with payment</li>
          <li>core discovery stays free forever</li>
        </ul>

        <h2>how we review</h2>
        <p>
          adoption clarity, maintenance, license clarity, and whether it replaces something real matter more than github
          stars. each profile includes who it&apos;s for, skip if, install path, and commercial use notes.
        </p>

        <h2>open source stack</h2>
        <p>
          we dogfood what we list where possible: better-auth for auth, next.js for the app, pagefind for search, lucide
          + geist for ui. the repo is public mit at github.com/shashank-sn/for-the-opendev.
        </p>

        <h2>contact</h2>
        <p>
          submissions: <a href="/submit">submit a project</a> · enterprise sponsors: hello@fortheopen.dev
        </p>
      </div>
    </PageShell>
  );
}