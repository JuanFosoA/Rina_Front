import { useState, useEffect, useMemo } from "react";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import * as schema from "../db/schema";
import { fetchRecipeById } from "../server/recipe.server";
import {
  saveSingleToCache,
  getSingleFromCacheById,
} from "../lib/fetchWithCache";

export function useRecipeDetail(
  id: string | undefined,
  userToken: string | null
) {
  const rawDb = useSQLiteContext();
  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [recipe, setRecipe] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id || !userToken) return;

    const loadRecipe = async () => {
      setLoading(true);
      setError(null);

      try {
        const apiRecipe = await fetchRecipeById(id, userToken);

        if (apiRecipe) {
          const normalizedRecipe = {
            ...apiRecipe,
            id: apiRecipe._id?.$oid ?? apiRecipe._id ?? id,
          };

          setRecipe(normalizedRecipe);

          await saveSingleToCache(
            db,
            schema.recetas,
            normalizedRecipe,
            "getRecipeById"
          );
        } else {
          throw new Error("No se recibió receta desde API");
        }
      } catch (apiError) {
        console.warn("API falló, intentando cargar desde caché:", apiError);

        try {
          const cachedRecipe = await getSingleFromCacheById(
            db,
            schema.recetas,
            id
          );

          if (cachedRecipe) {
            setRecipe(cachedRecipe);
          } else {
            setError("Receta no encontrada en caché");
            setRecipe(null);
          }
        } catch (cacheError) {
            console.error("Error al cargar receta desde caché:", cacheError);
          setError("Error al cargar receta desde caché");
          setRecipe(null);
        }
      } finally {
        setLoading(false);
      }
    };

    loadRecipe();
  }, [id, userToken, db]);

  return { recipe, loading, error };
}
