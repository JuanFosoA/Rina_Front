import { fetchRecipeById } from "../server/recipe.server";
import { saveSingleToCache, getSingleFromCacheById } from "./fetchWithCache";
import * as schema from "../db/schema";

export async function fetchRecipeWithCache(id: string, token: string, db: any) {
  try {
    const apiRecipe = await fetchRecipeById(id, token);

    if (apiRecipe) {
      const normalized = {
        ...apiRecipe,
        id: apiRecipe._id?.$oid ?? apiRecipe._id ?? id,
      };
      await saveSingleToCache(db, schema.recetas, normalized, "getRecipeById");
      return normalized;
    }
  } catch (err) {
    console.warn("Fallo API para receta", id, err);
  }

  // Intentar desde caché
  try {
    const cached = await getSingleFromCacheById(db, schema.recetas, id);
    return cached ?? null;
  } catch (err) {
    console.error("Error cargando receta desde caché:", err);
    return null;
  }
}
