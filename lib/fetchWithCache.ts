import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { getMenu, getMenuById } from "../server/menu.server";
import { Receta, getRecetas, getRecetaById } from "../server/recetas.server";
import * as schema from "../db/schema";

interface ApiResponse<T> {
  status: number;
  data?: T;
  error?: string;
}

const getNow = () => Math.floor(Date.now() / 1000);

async function saveToCache(db: any, table: any, data: any, name: string) {
  await db.delete(table);
  await db.insert(table).values({ json: data });

  await db
    .insert(schema.cronology)
    .values({ name, lastime: getNow() })
    .onConflictDoUpdate({
      target: schema.cronology.name,
      set: { lastime: getNow() },
    });
}

async function getFromCache(db: any, table: any) {
  const rows = await db.select().from(table);
  return rows.map((r: any) => r.json);
}

export async function GetMenuCached(
  token: string | null
): Promise<ApiResponse<any>> {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb, { schema });

  const result = await getMenu(token);
  if (result.status === 200 && result.data) {
    await saveToCache(db, schema.menus, result.data, "getMenu");
    return result;
  }

  const fallbackData = await getFromCache(db, schema.menus);
  return {
    status: 200,
    data: fallbackData[0],
    error: "Mostrando datos en caché",
  };
}

export async function GetRecetasCached(
  token: string | null
): Promise<ApiResponse<Receta[]>> {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb, { schema });

  const result = await getRecetas(token);
  if (result.status === 200 && result.data) {
    await saveToCache(db, schema.recetas, result.data, "getRecetas");
    return result;
  }

  const fallbackData = await getFromCache(db, schema.recetas);
  return {
    status: 200,
    data: fallbackData[0] || [],
    error: "Mostrando recetas en caché",
  };
}

export async function GetMenuByIdCached(
  id: string,
  token: string | null
): Promise<ApiResponse<any>> {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb, { schema });

  const result = await getMenuById(id, token);
  if (result.status === 200 && result.data) {
    await saveToCache(db, schema.menus, result.data, "getMenuById");
    return result;
  }

  const fallbackData = await getFromCache(db, schema.menus);
  return {
    status: 200,
    data: fallbackData.find((d: any) => d?.id === id) || null,
    error: "Mostrando menú desde caché",
  };
}

export async function GetRecetaByIdCached(
  id: string,
  token: string | null
): Promise<ApiResponse<Receta>> {
  const rawDb = useSQLiteContext();
  const db = drizzle(rawDb, { schema });

  const result = await getRecetaById(id, token);
  if (result.status === 200 && result.data) {
    await saveToCache(db, schema.recetas, result.data, "getRecetaById");
    return result;
  }

  const fallbackData = await getFromCache(db, schema.recetas);
  return {
    status: 200,
    data: fallbackData.find((r: any) => r?.id === id),
    error: "Mostrando receta desde caché",
  };
}
