import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const menus = sqliteTable("menus", {
  json: text({ mode: "json" }).notNull().unique(),
});

export const recetas = sqliteTable("recetas", {
  json: text({ mode: "json" }).notNull().unique(),
});

export const menusArray = sqliteTable("menusArray", {
  json: text({ mode: "json" }).notNull().unique(),
});

export const recetasArray = sqliteTable("recetasArray", {
  json: text({ mode: "json" }).notNull().unique(),
});

export const cronology = sqliteTable("cronology", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("table").notNull().unique(),
  lastime: integer({ mode: "timestamp" }).notNull(),
});

export type Menus = typeof menus.$inferSelect;
export type Recetas = typeof recetas.$inferSelect;
export type MenusArray = typeof menusArray.$inferSelect;
export type RecetasArray = typeof recetasArray.$inferSelect;
export type Cronology = typeof cronology.$inferSelect;
