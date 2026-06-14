import Link from "next/link";
import type { CSSProperties, ReactNode } from "react";

export function Card({
  children,
  style,
  href,
}: {
  children: ReactNode;
  style?: CSSProperties;
  href?: string;
}) {
  const baseStyle: CSSProperties = {
    borderRadius: "var(--radius-2xl)",
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--card-foreground)",
    padding: 24,
    boxShadow: "0 1px 0 0 rgba(0, 0, 0, 0.04)",
    transitionProperty: "transform, box-shadow",
    transitionDuration: "200ms",
    transitionTimingFunction: "ease",
    ...style,
  };

  if (href) {
    const isExternal = href.startsWith("http");
    const content = <div style={baseStyle}>{children}</div>;
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" style={{ display: "block", color: "inherit", textDecoration: "none" }}>
          {content}
        </a>
      );
    }
    return (
      <Link href={href} style={{ display: "block", color: "inherit", textDecoration: "none" }}>
        {content}
      </Link>
    );
  }

  return <div style={baseStyle}>{children}</div>;
}
