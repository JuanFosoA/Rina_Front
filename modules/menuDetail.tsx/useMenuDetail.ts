import { useState, useEffect, useMemo } from "react";
import { getListaMenu, getMenuById } from "../../server/menu.server";
import { useAuth } from "../../context/AuthContext";
import { useSQLiteContext } from "expo-sqlite";
import { drizzle } from "drizzle-orm/expo-sqlite";
import * as schema from "../../db/schema";
import { Receta, IngredienteCompra } from "./types";
import {
  saveSingleToCache,
  getSingleFromCacheById,
} from "../../lib/fetchWithCache";
import { fetchRecipeWithCache } from "../../lib/fetchRecipeWithCache";

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
    null,
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
          await saveSingleToCache(db, schema.menus, menuData, "menus");
        } else {
          menuData = await getSingleFromCacheById(db, schema.menus, id);
          if (!menuData) {
            console.warn("No se encontró menú en caché");
            return;
          }
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

        const allIds = Object.values(dias)
          .flatMap((comidas) => Object.values(comidas))
          .filter(
            (recetaId) =>
              typeof recetaId === "string" && recetaId.trim() !== "",
          );

        const uniqueIds = [...new Set(allIds)];

        const recetasData = await Promise.all(
          uniqueIds.map((id) => fetchRecipeWithCache(id, userToken, db)),
        );

        const recetaMap = Object.fromEntries(
          recetasData
            .filter((r): r is Receta => r !== null)
            .map((r) => [r.id, r]),
        );

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
