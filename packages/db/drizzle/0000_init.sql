CREATE TABLE `users` (
  `id` text PRIMARY KEY NOT NULL,
  `email` text NOT NULL,
  `username` text,
  `name` text,
  `bio` text,
  `image` text,
  `supporter_tier` text,
  `is_founding_supporter` integer DEFAULT false,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL
);
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);
CREATE UNIQUE INDEX `users_username_unique` ON `users` (`username`);

CREATE TABLE `sessions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `token` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
CREATE UNIQUE INDEX `sessions_token_unique` ON `sessions` (`token`);

CREATE TABLE `accounts` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `provider` text NOT NULL,
  `provider_account_id` text NOT NULL,
  `access_token` text,
  `refresh_token` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `lists` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text,
  `is_public` integer DEFAULT false,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
CREATE UNIQUE INDEX `lists_slug_unique` ON `lists` (`slug`);

CREATE TABLE `list_items` (
  `id` text PRIMARY KEY NOT NULL,
  `list_id` text NOT NULL,
  `project_slug` text NOT NULL,
  `note` text,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`)
);

CREATE TABLE `submissions` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text,
  `github_url` text NOT NULL,
  `category` text NOT NULL,
  `license` text,
  `status` text DEFAULT 'pending' NOT NULL,
  `notes` text,
  `created_at` integer NOT NULL,
  `reviewed_at` integer,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `reviews` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `project_slug` text NOT NULL,
  `rating` integer NOT NULL,
  `body` text NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

CREATE TABLE `supporters` (
  `id` text PRIMARY KEY NOT NULL,
  `github_login` text NOT NULL,
  `tier` text NOT NULL,
  `amount_cents` integer,
  `is_enterprise` integer DEFAULT false,
  `synced_at` integer NOT NULL
);
CREATE UNIQUE INDEX `supporters_github_login_unique` ON `supporters` (`github_login`);

CREATE TABLE `launch_votes` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `project_slug` text NOT NULL,
  `created_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);