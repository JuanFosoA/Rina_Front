import * as schema from "../db/schema";

export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

export const getNow = () => new Date();



export async function saveToCache(
  db: any,
  table: any,
  data: any,
  name: string,
) {

  await db.delete(table);
  await db.insert(table).values({ json: data });
  const lastime = getNow();

  await db
    .insert(schema.cronology)
    .values({ name, lastime: lastime })
    .onConflictDoUpdate({
      target: schema.cronology.name,
      set: { lastime: lastime },
    });

}

export async function getFromCache(db: any, table: any) {
  const rows = await db.select().from(table);
  return rows.map((r: any) => r.json);
}
