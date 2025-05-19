import { useEffect, useState, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { getMenu } from "../server/menu.server";
import { saveArrayToCache, getArrayFromCache } from "../lib/fetchWithCache";

export function useFetchMenu() {
  const { userToken } = useAuth();
  const rawDb = useSQLiteContext();
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
      let recetas: any[] = [];

      if (response.status === 200 && Array.isArray(response.data)) {
        recetas = response.data.map((receta) => ({
          id: receta._id?.$oid ?? receta._id,
          nombre: receta.nombre,
          ...receta,
        }));
        await saveArrayToCache(db, schema.menusArray, recetas, "getMenu");
      } else {
        const fallbackData = await getArrayFromCache(db, schema.menusArray);
        recetas = fallbackData || [];
        console.warn("Mostrando recetas desde caché");
      }

      setData(recetas);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error al obtener recetas:", errorMessage);
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
