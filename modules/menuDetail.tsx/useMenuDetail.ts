import { useState, useEffect } from "react";
import { getMenuById, getListaMenu } from "../../server/menu.server";
import { fetchRecipeById } from "../../server/recipe.server";
import { useAuth } from "../../context/AuthContext";
import { Menu, Receta, IngredienteCompra } from "./types";


export function useMenuDetail(id: string) {
  const { userToken } = useAuth();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [recipes, setRecipes] = useState<Record<string, Receta>>({});
  const [listaCompras, setListaCompras] = useState<IngredienteCompra[] | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const menuResponse = await getMenuById(id, userToken);

        if (!menuResponse?.data?.dias) {
          console.error("Formato de menú inválido:", menuResponse);
          return;
        }

        const menuData = menuResponse.data.dias as Menu;
        setMenu(menuData);

        const allIds = Object.values(menuData)
          .flatMap((comidas) => Object.values(comidas))
          .filter(
            (recetaId): recetaId is string => typeof recetaId === "string"
          );

        const uniqueIds = Array.from(new Set(allIds));

        const recetasData = await Promise.all(
          uniqueIds.map(async (recetaId) => {
            const receta = await fetchRecipeById(recetaId, userToken);
            return receta as unknown as Receta;
          })
        );

        const recetaMap: Record<string, Receta> = {};
        recetasData.forEach((receta) => {
          recetaMap[receta.id] = receta;
        });

        setRecipes(recetaMap);

        const listaResponse = await getListaMenu(menuData, userToken);
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
  }, [id, userToken]);

  return { menu, recipes, listaCompras, loading };
}
