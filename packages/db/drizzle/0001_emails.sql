CREATE TABLE `emails` (
  `id` text PRIMARY KEY NOT NULL,
  `direction` text NOT NULL,
  `status` text NOT NULL,
  `from_address` text NOT NULL,
  `to_address` text NOT NULL,
  `reply_to` text,
  `subject` text,
  `text_body` text,
  `html_body` text,
  `message_id` text,
  `in_reply_to` text,
  `headers_json` text,
  `provider` text DEFAULT 'cloudflare' NOT NULL,
  `provider_response` text,
  `error` text,
  `raw_size` integer,
  `created_at` integer NOT NULL
);

CREATE INDEX `emails_direction_created_idx` ON `emails` (`direction`, `created_at`);
CREATE INDEX `emails_to_address_idx` ON `emails` (`to_address`);
CREATE INDEX `emails_from_address_idx` ON `emails` (`from_address`);

CREATE TABLE `newsletter_subscribers` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `name` text,
  `status` text DEFAULT 'active' NOT NULL,
  `subscribed_at` integer NOT NULL,
  `unsubscribed_at` integer
);

CREATE UNIQUE INDEX `newsletter_subscribers_email_unique` ON `newsletter_subscribers` (`email`);