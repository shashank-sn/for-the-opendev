import { getDb } from "@ftod/db";
import { storeEmail } from "@ftod/db/email-store";
import { createId } from "@/lib/ids";

export type TransactionalEmail = {
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
  messageId?: string;
  inReplyTo?: string;
};

type EmailAddress = { email: string; name?: string };

type SendEmailBinding = {
  send: (message: {
    to: string;
    from: EmailAddress;
    subject: string;
    html: string;
    text: string;
    replyTo?: string;
  }) => Promise<unknown>;
};

function emailFromEnv() {
  return {
    address: process.env.EMAIL_FROM ?? "noreply@fortheopen.dev",
    name: process.env.EMAIL_FROM_NAME ?? "for the open dev",
    replyTo: process.env.EMAIL_REPLY_TO ?? "hello@fortheopen.dev",
  };
}

function resolveEmailBinding(): SendEmailBinding | undefined {
  try {
    const { getCloudflareContext } = require("@opennextjs/cloudflare") as {
      getCloudflareContext: () => { env: { EMAIL?: SendEmailBinding } };
    };
    return getCloudflareContext().env.EMAIL;
  } catch {
    return undefined;
  }
}

async function persistOutbound(
  email: TransactionalEmail,
  from: ReturnType<typeof emailFromEnv>,
  status: "sent" | "failed" | "queued",
  extra?: { providerResponse?: string; error?: string },
) {
  try {
    await storeEmail(getDb(), {
      id: createId("em"),
      direction: "outbound",
      status,
      fromAddress: from.address,
      toAddress: email.to,
      replyTo: email.replyTo ?? from.replyTo,
      subject: email.subject,
      textBody: email.text,
      htmlBody: email.html,
      messageId: email.messageId ?? null,
      inReplyTo: email.inReplyTo ?? null,
      provider: "cloudflare",
      providerResponse: extra?.providerResponse ?? null,
      error: extra?.error ?? null,
    });
  } catch (error) {
    console.warn("[email] failed to persist outbound message", error);
  }
}

async function sendViaRestApi(email: TransactionalEmail, from: ReturnType<typeof emailFromEnv>) {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const token = process.env.CLOUDFLARE_API_TOKEN;
  if (!accountId || !token) return false;

  const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${accountId}/email/sending/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: email.to,
      from: { address: from.address, name: from.name },
      reply_to: email.replyTo ?? from.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`cloudflare email api failed (${res.status}): ${body}`);
  }

  await persistOutbound(email, from, "sent", { providerResponse: body });
  return true;
}

export async function sendTransactionalEmail(email: TransactionalEmail) {
  const from = emailFromEnv();
  const binding = resolveEmailBinding();

  if (binding) {
    try {
      const response = await binding.send({
        to: email.to,
        from: { email: from.address, name: from.name },
        replyTo: email.replyTo ?? from.replyTo,
        subject: email.subject,
        html: email.html,
        text: email.text,
      });
      await persistOutbound(email, from, "sent", {
        providerResponse: response ? JSON.stringify(response) : undefined,
      });
      return;
    } catch (error) {
      await persistOutbound(email, from, "failed", {
        error: error instanceof Error ? error.message : String(error),
      });
      throw error;
    }
  }

  try {
    if (await sendViaRestApi(email, from)) {
      return;
    }
  } catch (error) {
    await persistOutbound(email, from, "failed", {
      error: error instanceof Error ? error.message : String(error),
    });
    throw error;
  }

  await persistOutbound(email, from, "queued");
  console.info(`[email] ${email.to} — ${email.subject}\n${email.text}`);
}

export function magicLinkEmail(url: string): TransactionalEmail {
  return {
    to: "",
    subject: "sign in to for the open dev",
    text: `your sign-in link (expires soon):\n\n${url}\n\nif you did not request this, ignore this email.`,
    html: `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#111;max-width:480px">
<p>sign in to for the open dev</p>
<p><a href="${url}" style="display:inline-block;padding:12px 18px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px">continue</a></p>
<p style="font-size:13px;color:#666">or paste this link:<br><a href="${url}">${url}</a></p>
<p style="font-size:13px;color:#666">if you did not request this, ignore this email.</p>
</body></html>`,
  };
}

export function welcomeNewsletterEmail(email: string): TransactionalEmail {
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://fortheopen.dev";
  return {
    to: email,
    subject: "you're on the open dev weekly list",
    text: `you're subscribed to the open dev weekly.\n\nnew profiles, comparisons, and launch picks — no ads.\n\n${site}`,
    html: `<!DOCTYPE html><html><body style="font-family:system-ui,sans-serif;line-height:1.6;color:#111;max-width:480px">
<p>you're on the list.</p>
<p>the open dev weekly: new profiles, comparisons, launch picks. no ads.</p>
<p><a href="${site}">fortheopen.dev</a></p>
</body></html>`,
  };
}