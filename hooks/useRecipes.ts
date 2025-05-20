import { useState, useEffect, useMemo } from "react";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../db/schema";
import { getRecetas } from "../server/recetas.server";
import { saveArrayToCache, getArrayFromCache } from "../lib/fetchWithCache";

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
  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!enabled || !userToken) return;

    const fetchRecipes = async () => {
      setLoading(true);
      try {
        const result = await getRecetas(userToken);

        let rawData: RawRecipe[] = [];

        if (result.status === 200 && result.data) {
          rawData = result.data as RawRecipe[];
          await saveArrayToCache(
            db,
            schema.recetasArray,
            rawData,
            "recetasList",
          );
        } else {
          const fallbackData = await getArrayFromCache(db, schema.recetasArray);
          rawData = fallbackData || [];
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
