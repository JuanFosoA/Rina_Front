import { useState, useEffect, useCallback } from "react";
import {
  getWeeklyMenuByDate,
  setWeeklyMenu,
} from "../server/weeklyMenu.server";
import { formatISO, startOfWeek } from "date-fns";
import { useAuth } from "../../../context/AuthContext";

export function useWeeklyMenuSubmit() {
  const { userToken } = useAuth();
  const [menuId, setMenuId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const now = new Date();
  const mondayDate = startOfWeek(now, { weekStartsOn: 1 });
  const formattedDate = formatISO(mondayDate, { representation: "date" });

  const fetchMenuId = useCallback(async () => {
    if (!userToken) return;
    setLoading(true);
    try {
      const data = await getWeeklyMenuByDate(formattedDate, userToken);
      setMenuId(data?.menuId ?? null);
    } catch (error) {
      console.error("Error obteniendo menú semanal:", error);
      setMenuId(null);
    } finally {
      setLoading(false);
    }
  }, [userToken, formattedDate]);

  useEffect(() => {
    fetchMenuId();
  }, [fetchMenuId]);

  const submitMenu = useCallback(
    async (newMenuId: string) => {
      if (!userToken) throw new Error("No token de usuario");
      setLoading(true);
      try {
        await setWeeklyMenu(newMenuId, formattedDate, userToken);
        setMenuId(newMenuId);
      } catch (error) {
        console.error("Error guardando menú semanal:", error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [userToken, formattedDate]
  );

  const refresh = () => fetchMenuId();

  return {
    menuId,
    loading,
    submitMenu,
    refresh,
  };
}
