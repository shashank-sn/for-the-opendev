export type TransactionalEmail = {
  to: string;
  subject: string;
  html: string;
  text: string;
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
      reply_to: from.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`cloudflare email api failed (${res.status}): ${body}`);
  }

  return true;
}

export async function sendTransactionalEmail(email: TransactionalEmail) {
  const from = emailFromEnv();
  const binding = resolveEmailBinding();

  if (binding) {
    await binding.send({
      to: email.to,
      from: { email: from.address, name: from.name },
      replyTo: from.replyTo,
      subject: email.subject,
      html: email.html,
      text: email.text,
    });
    return;
  }

  if (await sendViaRestApi(email, from)) {
    return;
  }

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