import { Button } from "@ftod/ui";

const REPO_URL = "https://github.com/shashank-sn/for-the-opendev";

type Props = {
  compact?: boolean;
};

export function NewsletterSignup({ compact }: Props) {
  return (
    <div>
      <p style={{ margin: compact ? "0 0 10px" : "0 0 8px", fontWeight: 600, fontSize: compact ? 14 : 16 }}>
        updates
      </p>
      {!compact && (
        <p style={{ margin: "0 0 14px", color: "var(--text-secondary)", fontSize: 14, maxWidth: 360 }}>
          watch the repo for new profiles, comparisons, and launch picks.
        </p>
      )}
      <Button href={REPO_URL} style={{ whiteSpace: "nowrap" }}>
        watch on github
      </Button>
    </div>
  );
}