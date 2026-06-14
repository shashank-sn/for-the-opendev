CREATE TABLE `user` (
  `id` text PRIMARY KEY NOT NULL,
  `name` text NOT NULL,
  `email` text NOT NULL,
  `email_verified` integer DEFAULT false NOT NULL,
  `image` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  `username` text,
  `display_username` text,
  `bio` text,
  `supporter_tier` text,
  `is_founding_supporter` integer DEFAULT false
);
CREATE UNIQUE INDEX `user_email_unique` ON `user` (`email`);
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);

CREATE TABLE `session` (
  `id` text PRIMARY KEY NOT NULL,
  `expires_at` integer NOT NULL,
  `token` text NOT NULL,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  `ip_address` text,
  `user_agent` text,
  `user_id` text NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
CREATE UNIQUE INDEX `session_token_unique` ON `session` (`token`);

CREATE TABLE `account` (
  `id` text PRIMARY KEY NOT NULL,
  `account_id` text NOT NULL,
  `provider_id` text NOT NULL,
  `user_id` text NOT NULL,
  `access_token` text,
  `refresh_token` text,
  `id_token` text,
  `access_token_expires_at` integer,
  `refresh_token_expires_at` integer,
  `scope` text,
  `password` text,
  `created_at` integer NOT NULL,
  `updated_at` integer NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `verification` (
  `id` text PRIMARY KEY NOT NULL,
  `identifier` text NOT NULL,
  `value` text NOT NULL,
  `expires_at` integer NOT NULL,
  `created_at` integer,
  `updated_at` integer
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
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

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
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);

CREATE TABLE `reviews` (
  `id` text PRIMARY KEY NOT NULL,
  `user_id` text NOT NULL,
  `project_slug` text NOT NULL,
  `setup_ease` integer NOT NULL,
  `documentation` integer NOT NULL,
  `maintenance` integer NOT NULL,
  `would_recommend` text NOT NULL,
  `body` text,
  `hidden` integer DEFAULT false,
  `created_at` integer NOT NULL,
  `updated_at` integer,
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);
CREATE UNIQUE INDEX `reviews_user_project_unique` ON `reviews` (`user_id`, `project_slug`);

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
  FOREIGN KEY (`user_id`) REFERENCES `user`(`id`)
);