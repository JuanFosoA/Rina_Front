import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { getRecetas, Receta } from "../server/recetas.server";
import { apiFast } from "../server/token";
import { saveArrayToCache, getArrayFromCache } from "../lib/fetchWithCache";

export function useFetchRecipes() {
  const { userToken } = useAuth();
  const rawDb = useSQLiteContext();

  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchRecipes = useCallback(async () => {
    try {
      if (!userToken) {
        throw new Error("No se encontró token de autenticación");
      }

      setLoading(true);
      setError(null);

      const response = await getRecetas(userToken);

      let recetasData: Receta[] = [];

      if (response.status === 200 && response.data) {
        recetasData = response.data;
        await saveArrayToCache(
          db,
          schema.recetasArray,
          recetasData,
          "recetasArray"
        );
      } else {
        const fallbackData = await getArrayFromCache(db, schema.recetasArray);
        recetasData = fallbackData || [];
        console.warn("Mostrando recetas desde caché");
      }

      const recetasConImagen = recetasData.map((receta) => ({
        ...receta,
        imagenNombre: receta.imagenNombre
          ? `${apiFast}uploads/${receta.imagenNombre}`
          : null,
      }));

      setRecetas(recetasConImagen);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error fetching recipes:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [userToken, db]);

  useEffect(() => {
    if (userToken) {
      fetchRecipes();
    }
  }, [fetchRecipes, retryCount, userToken]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    recetas,
    loading,
    error,
    handleRetry,
  };
}
