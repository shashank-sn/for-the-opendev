export type NewsletterResult =
  | { ok: true }
  | { ok: false; error: string; status: number };

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isNewsletterConfigured() {
  return Boolean(process.env.LISTMONK_URL && process.env.LISTMONK_LIST_UUID);
}

export async function subscribeToNewsletter(email: string, name?: string): Promise<NewsletterResult> {
  const base = process.env.LISTMONK_URL?.replace(/\/$/, "");
  const listUuid = process.env.LISTMONK_LIST_UUID;

  if (!base || !listUuid) {
    return { ok: false, error: "newsletter not configured", status: 503 };
  }

  const normalized = normalizeEmail(email);
  if (!normalized || !normalized.includes("@")) {
    return { ok: false, error: "invalid email", status: 400 };
  }

  const response = await fetch(`${base}/api/public/subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: normalized,
      name: name?.trim() || "",
      list_uuids: [listUuid],
    }),
  });

  if (response.ok) {
    return { ok: true };
  }

  let message = "subscription failed";
  try {
    const payload = (await response.json()) as { message?: string };
    if (payload.message) message = payload.message;
  } catch {
    // ignore parse errors
  }

  if (response.status === 409 || /already/i.test(message)) {
    return { ok: true };
  }

  return { ok: false, error: message, status: response.status >= 400 ? response.status : 502 };
}