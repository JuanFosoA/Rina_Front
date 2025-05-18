import { useState, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { getRecetas } from "../server/recetas.server";
import { saveToCache, getFromCache } from "../lib/fetchWithCache";

type Recipe = {
  id: string;
  name: string;
};

type RawRecipe = {
  id: string;
  nombre: string;
};

export const useRecipes = (userToken: string | null, enabled: boolean) => {
  const rawDb = useSQLiteContext();

  // Memoizar db para que no cambie en cada render
  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    if (!userToken) return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const result = await getRecetas(userToken);

        let rawData: RawRecipe[] = [];

        if (result.status === 200 && result.data) {
          rawData = result.data as RawRecipe[];
          await saveToCache(db, schema.recetas, rawData, "getRecetas");
        } else {
          const fallbackData = await getFromCache(db, schema.recetas);
          rawData = fallbackData[0] || [];
          console.warn("Mostrando recetas desde caché");
        }

        const recipeList: Recipe[] = rawData.map((receta) => ({
          id: receta.id,
          name: receta.nombre,
        }));

        setRecipes(recipeList);
      } catch (error) {
        console.error("Error al obtener recetas:", error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [enabled, userToken, db]);

  return { recipes, loading };
};
