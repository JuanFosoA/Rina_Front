import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { getMenu } from "../server/menu.server";
import { saveToCache, getFromCache } from "../lib/fetchWithCache";

export function useFetchMenu() {
  const { userToken } = useAuth();
  const rawDb = useSQLiteContext();

  // Memoizar la creación de db para que no cambie en cada render
  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      if (!userToken) {
        throw new Error("No se encontró token de autenticación");
      }

      const response = await getMenu(userToken);
      let menuData: any;

      if (response.status === 200 && response.data) {
        menuData = response.data;
        await saveToCache(db, schema.menus, menuData, "getMenu");
      } else {
        const fallbackData = await getFromCache(db, schema.menus);
        menuData = fallbackData[0] || {};
        console.warn("Mostrando menú desde caché");
      }

      if (!menuData || typeof menuData !== "object") {
        throw new Error("Formato inválido de menú");
      }

      const menuArray = Object.entries(menuData).map(([dia, comidas]) => ({
        id: dia,
        dia,
        ...(typeof comidas === "object" && comidas !== null ? comidas : {}),
      }));

      setData(menuArray);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error al obtener menú:", errorMessage);
      setError(errorMessage);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [userToken, db]);

  useEffect(() => {
    if (userToken) {
      fetchData();
    }
  }, [fetchData, userToken]);

  return { data, loading, error };
}
