import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ANALYTICS_COOKIE = "ftod_analytics_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function sessionSecret() {
  return (
    process.env.ANALYTICS_SESSION_SECRET ??
    process.env.BETTER_AUTH_SECRET ??
    "dev-analytics-session-secret-change-me"
  );
}

function configuredPassword() {
  return process.env.ANALYTICS_PASSWORD?.trim() ?? "";
}

export function isAnalyticsPasswordConfigured() {
  return configuredPassword().length > 0;
}

export function verifyAnalyticsPassword(password: string) {
  const expected = configuredPassword();
  if (!expected) return false;

  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

function signPayload(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

export function createAnalyticsSessionValue() {
  const expiresAt = Date.now() + SESSION_TTL_MS;
  const payload = `analytics:${expiresAt}`;
  return `${payload}:${signPayload(payload)}`;
}

export function verifyAnalyticsSessionValue(value: string | undefined | null) {
  if (!value) return false;
  const [payload, signature] = value.split(":");
  if (!payload?.startsWith("analytics:") || !signature) return false;

  const expected = signPayload(payload);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  const expiresAt = Number(payload.slice("analytics:".length));
  return Number.isFinite(expiresAt) && expiresAt > Date.now();
}

export async function hasAnalyticsSession() {
  const jar = await cookies();
  return verifyAnalyticsSessionValue(jar.get(ANALYTICS_COOKIE)?.value);
}

export function analyticsCookieOptions() {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge: SESSION_TTL_MS / 1000,
  };
}