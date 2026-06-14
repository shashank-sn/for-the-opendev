export function Logo({ size = 28 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <rect x="2" y="2" width="28" height="28" rx="8" fill="var(--accent-subtle)" />
      <circle cx="16" cy="16" r="7" stroke="var(--accent)" strokeWidth="2" />
      <circle cx="16" cy="16" r="2.5" fill="var(--accent)" />
      <path
        d="M16 9V6M16 26v-3M9 16H6M26 16h-3"
        stroke="var(--accent-hover)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}