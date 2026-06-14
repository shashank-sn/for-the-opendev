import PostalMime from "postal-mime";

function createEmailId() {
  return `em_${crypto.randomUUID().replace(/-/g, "")}`;
}

function collectHeaders(headers) {
  const out = {};
  for (const [key, value] of headers.entries()) {
    out[key.toLowerCase()] = value;
  }
  return JSON.stringify(out);
}

export async function handleInboundEmail(message, env) {
  const rawBuffer = await new Response(message.raw).arrayBuffer();
  const parsed = await PostalMime.parse(rawBuffer);
  const subject = parsed.subject ?? message.headers.get("subject") ?? null;
  const messageId = message.headers.get("message-id") ?? parsed.messageId ?? null;
  const inReplyTo = message.headers.get("in-reply-to") ?? parsed.inReplyTo ?? null;
  const textBody = parsed.text ?? null;
  const htmlBody = parsed.html ?? null;
  const now = Date.now();

  await env.DB.prepare(
    `INSERT INTO emails (
      id, direction, status, from_address, to_address, reply_to, subject,
      text_body, html_body, message_id, in_reply_to, headers_json, provider,
      raw_size, created_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  )
    .bind(
      createEmailId(),
      "inbound",
      "received",
      message.from,
      message.to,
      message.headers.get("reply-to"),
      subject,
      textBody,
      htmlBody,
      messageId,
      inReplyTo,
      collectHeaders(message.headers),
      "cloudflare",
      message.rawSize ?? rawBuffer.byteLength,
      now,
    )
    .run();
}