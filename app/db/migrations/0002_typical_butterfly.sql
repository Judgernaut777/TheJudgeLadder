CREATE TABLE `quiz_scores` (
	`userId` bigint unsigned NOT NULL,
	`courseCode` varchar(8) NOT NULL,
	`moduleId` varchar(64) NOT NULL,
	`bestScore` double NOT NULL,
	`attempts` bigint NOT NULL DEFAULT 1,
	`updatedAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `quiz_scores_userId_moduleId_pk` PRIMARY KEY(`userId`,`moduleId`)
);
