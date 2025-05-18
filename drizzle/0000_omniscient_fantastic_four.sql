CREATE TABLE `cronology` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`table` text NOT NULL,
	`lastime` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `cronology_table_unique` ON `cronology` (`table`);--> statement-breakpoint
CREATE TABLE `menus` (
	`json` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `recetas` (
	`json` text NOT NULL
);
