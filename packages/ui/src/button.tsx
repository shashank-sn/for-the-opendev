import type { AnchorHTMLAttributes, ButtonHTMLAttributes, CSSProperties, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type SharedProps = {
  children: ReactNode;
  variant?: Variant;
  style?: CSSProperties;
};

type ButtonAsButton = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "style" | "children"> & {
    href: string;
  };

const styles: Record<Variant, CSSProperties> = {
  primary: {
    background: "var(--accent)",
    color: "#fff",
    border: "1px solid transparent",
  },
  secondary: {
    background: "var(--bg-elevated)",
    color: "var(--text-primary)",
    border: "1px solid var(--border-default)",
  },
  ghost: {
    background: "transparent",
    color: "var(--text-secondary)",
    border: "1px solid transparent",
  },
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const { children, variant = "primary", style } = props;

  const sharedStyle: CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: "10px 16px",
    borderRadius: "var(--radius-md)",
    fontWeight: 500,
    textDecoration: "none",
    transition: "background 0.15s, border-color 0.15s",
    ...styles[variant],
    ...style,
  };

  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;
    const isExternal = href.startsWith("http");
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...anchorProps}
        style={sharedStyle}
      >
        {children}
      </a>
    );
  }

  const { href: _href, ...buttonProps } = props as ButtonAsButton;
  return (
    <button
      {...buttonProps}
      style={{
        ...sharedStyle,
        cursor: buttonProps.disabled ? "not-allowed" : "pointer",
        opacity: buttonProps.disabled ? 0.6 : 1,
      }}
    >
      {children}
    </button>
  );
}