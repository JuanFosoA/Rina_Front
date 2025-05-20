import { useCallback, useEffect, useMemo, useState } from "react";
import { getWeeklyMenuByDate } from "../server/weeklyMenu.server";
import { useAuth } from "../../../context/AuthContext";
import { formatISO, startOfWeek } from "date-fns";
import { useDayAndMeal } from "./useDayAndMeal";
import { useRecipeDetail } from "../../../hooks/useRecipeDetail";
import { useMenuDetail } from "../../menuDetail.tsx/useMenuDetail";

export function useWeeklyMenu() {
  const { userToken } = useAuth();
  const [notFound, setNotFound] = useState(false);

  const [menuId, setMenuId] = useState<string | null>(null);
  const [loadingMenuId, setLoadingMenuId] = useState(true);

  const { dayOfWeek, moment, now } = useDayAndMeal();

  const mondayDate = useMemo(
    () => startOfWeek(now, { weekStartsOn: 1 }),
    [now]
  );
  const formattedDate = useMemo(
    () => formatISO(mondayDate, { representation: "date" }),
    [mondayDate]
  );

  const fetchMenuId = useCallback(async () => {
    if (!userToken) return;

    setLoadingMenuId(true);
    setNotFound(false);

    try {
      const data = await getWeeklyMenuByDate(formattedDate, userToken);

      if (!data) {
        setMenuId(null);
        setNotFound(true);
        return;
      }

      if (data.menuId) {
        setMenuId(data.menuId);
      } else {
        setMenuId(null);
        setNotFound(true);
      }
    } catch (err) {
      console.error("No se pudo obtener el menú semanal:", err);
      setMenuId(null);
      setNotFound(true);
    } finally {
      setLoadingMenuId(false);
    }
  }, [userToken, formattedDate]);

  useEffect(() => {
    fetchMenuId();
  }, [fetchMenuId]);

  const { menu, loading: loadingMenu } = useMenuDetail(menuId ?? "");

  const recetaIdActual = useMemo(() => {
    if (!menu) return null;
    return menu?.[dayOfWeek]?.[moment] ?? null;
  }, [menu, dayOfWeek, moment]);

  const {
    recipe: recetaActual,
    loading: loadingReceta,
    error,
  } = useRecipeDetail(recetaIdActual ?? undefined, userToken);

  return {
    recetaActual,
    loading: loadingMenuId || loadingMenu || loadingReceta,
    error,
    notFound,
  };
}