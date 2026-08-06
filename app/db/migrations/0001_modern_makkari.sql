CREATE TABLE `aipab_attempts` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`userId` bigint unsigned NOT NULL,
	`startedAt` timestamp NOT NULL DEFAULT (now()),
	`deadline` timestamp NOT NULL,
	`completedAt` timestamp,
	`currentIndex` bigint NOT NULL DEFAULT 0,
	`branchLocked` boolean NOT NULL DEFAULT false,
	`sections` json,
	`placementRung` bigint,
	`placementPlus` boolean,
	CONSTRAINT `aipab_attempts_id` PRIMARY KEY(`id`)
);
