export function isAdminEmail(email: string | null | undefined) {
  if (!email) return false;
  const allowlist = (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((e) => e.trim().toLowerCase())
    .filter(Boolean);
  if (allowlist.length === 0) {
    return process.env.NODE_ENV === "development";
  }
  return allowlist.includes(email.toLowerCase());
}