import { useState, useEffect, useMemo } from "react";
import { getListaMenu, getMenuById } from "../../server/menu.server";
import { fetchRecipeById } from "../../server/recipe.server";
import { useAuth } from "../../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../../db/schema";
import { Receta, IngredienteCompra } from "./types";
import { saveToCache, getFromCache } from "../../lib/fetchWithCache";

export function useMenuDetail(id: string) {
  const { userToken } = useAuth();
  const rawDb = useSQLiteContext();

  const db = useMemo(() => drizzle(rawDb, { schema }), [rawDb]);

  const [menu, setMenu] = useState<Record<
    string,
    Record<string, string>
  > | null>(null);
  const [recipes, setRecipes] = useState<Record<string, Receta>>({});
  const [listaCompras, setListaCompras] = useState<IngredienteCompra[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userToken) return;

    const loadMenu = async () => {
      try {
        let menuData: any;

        const result = await getMenuById(id, userToken);

        if (result.status === 200 && result.data) {
          menuData = result.data;
          await saveToCache(db, schema.menus, menuData, "getMenuById");
        } else {
          const fallbackData = await getFromCache(db, schema.menus);
          menuData = fallbackData.find((d: any) => d?.id === id);
          console.warn("Mostrando menú desde caché");
        }

        const dias = menuData?.dias as
          | Record<string, Record<string, string>>
          | undefined;
        if (!dias) {
          console.error("Formato de menú inválido:", menuData);
          return;
        }

        setMenu(dias);

        // Extraemos IDs únicos de recetas que no sean cadenas vacías
        const allIds = Object.values(dias)
          .flatMap((comidas) => Object.values(comidas))
          .filter(
            (recetaId) => typeof recetaId === "string" && recetaId.trim() !== ""
          );

        const uniqueIds = [...new Set(allIds)];

        const recetasData = await Promise.all(
          uniqueIds.map(async (recetaId) => {
            const receta = await fetchRecipeById(recetaId, userToken);
            return receta as unknown as Receta;
          })
        );

        const recetaMap = Object.fromEntries(recetasData.map((r) => [r.id, r]));
        setRecipes(recetaMap);

        const listaResponse = await getListaMenu(dias, userToken);
        if (listaResponse.data) {
          setListaCompras(listaResponse.data);
        } else {
          console.error("Error en lista de compras:", listaResponse.error);
        }
      } catch (err) {
        console.error("Error cargando menú:", err);
      } finally {
        setLoading(false);
      }
    };

    loadMenu();
  }, [db, id, userToken]);

  return { menu, recipes, listaCompras, loading };
}
