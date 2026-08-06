CREATE TABLE `certificates` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`courseCode` varchar(8) NOT NULL,
	`confersLabel` varchar(128) NOT NULL,
	`serial` varchar(32) NOT NULL,
	`attemptId` bigint unsigned NOT NULL,
	`issuedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `certificates_id` PRIMARY KEY(`id`),
	CONSTRAINT `certificates_serial_unique` UNIQUE(`serial`)
);
--> statement-breakpoint
CREATE TABLE `gate_attempts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`courseCode` varchar(8) NOT NULL,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`completedAt` timestamp,
	`mcScore` double,
	`practicalScore` double,
	`passed` boolean,
	`answers` json,
	`detail` json,
	CONSTRAINT `gate_attempts_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `lesson_progress` (
	`userId` bigint unsigned NOT NULL,
	`courseCode` varchar(8) NOT NULL,
	`lessonId` varchar(64) NOT NULL,
	`completedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `lesson_progress_userId_lessonId_pk` PRIMARY KEY(`userId`,`lessonId`)
);
--> statement-breakpoint
CREATE TABLE `local_credentials` (
	`userId` bigint unsigned NOT NULL,
	`username` varchar(255) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `local_credentials_userId` PRIMARY KEY(`userId`),
	CONSTRAINT `local_credentials_username_unique` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`unionId` varchar(255) NOT NULL,
	`name` varchar(255),
	`email` varchar(320),
	`avatar` text,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	`lastSignInAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_unionId_unique` UNIQUE(`unionId`)
);
