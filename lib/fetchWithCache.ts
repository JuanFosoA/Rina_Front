import * as schema from "../db/schema";

export interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

export const getNow = () => new Date();

export async function saveSingleToCache(
  db: any,
  table: any,
  data: any,
  name: string
) {
  const jsonString = JSON.stringify(data);

  await db
    .insert(table)
    .values({ json: jsonString })
    .onConflictDoUpdate({
      target: table.json,
      set: { json: jsonString },
    });

  const lastime = getNow();

  await db
    .insert(schema.cronology)
    .values({ name, lastime })
    .onConflictDoUpdate({
      target: schema.cronology.name,
      set: { lastime },
    });
}

export async function saveArrayToCache(
  db: any,
  table: any,
  dataArray: any[],
  name: string
) {
  for (const item of dataArray) {
    const jsonString = JSON.stringify(item);
    await db
      .insert(table)
      .values({ json: jsonString })
      .onConflictDoUpdate({
        target: table.json,
        set: { json: jsonString },
      });
  }

  const lastime = getNow();

  await db
    .insert(schema.cronology)
    .values({ name, lastime })
    .onConflictDoUpdate({
      target: schema.cronology.name,
      set: { lastime },
    });
}

function safeJsonParse(jsonStr: string): any | null {
  try {
    let parsed = JSON.parse(jsonStr);
    if (typeof parsed === "string") {
      parsed = JSON.parse(parsed);
    }
    console.log("Parsed JSON:", parsed);
    return parsed;
  } catch {
    return null;
  }
}

export async function getSingleFromCacheById(
  db: any,
  table: any,
  id: string
): Promise<any | null> {
  const rows = await db.select().from(table);
  for (const row of rows) {
    const json = safeJsonParse(row.json);
    if (json?.id === id) {
      return json;
    }
  }
  return null;
}

export async function getArrayFromCache(db: any, table: any): Promise<any[]> {
  const rows = await db.select().from(table);
  return rows.map((r: any) => safeJsonParse(r.json)).filter(Boolean);
}
