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
CREATE UNIQUE INDEX `menus_json_unique` ON `menus` (`json`);--> statement-breakpoint
CREATE TABLE `menusArray` (
	`json` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `menusArray_json_unique` ON `menusArray` (`json`);--> statement-breakpoint
CREATE TABLE `recetas` (
	`json` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recetas_json_unique` ON `recetas` (`json`);--> statement-breakpoint
CREATE TABLE `recetasArray` (
	`json` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `recetasArray_json_unique` ON `recetasArray` (`json`);