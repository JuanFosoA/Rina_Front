import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const menus = sqliteTable("menus", {
  json: text({ mode: "json" }).notNull(),
});

export const recetas = sqliteTable("recetas", {
  json: text({ mode: "json" }).notNull(),
});
export const cronology = sqliteTable("cronology", {
  name: text("table").notNull(),
  lastime: integer({ mode: "timestamp" }).notNull(),
});

export type Menus = typeof menus.$inferSelect;
export type Recetas = typeof recetas.$inferSelect;
export type Cronology = typeof cronology.$inferSelect;
