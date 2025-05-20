// hooks/useSaveWeeklyMenu.ts
import { useState, useCallback } from "react";
import { useAuth } from "../../../context/AuthContext";
import { formatISO, startOfWeek } from "date-fns";

export function useSaveWeeklyMenu() {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mondayDate = formatISO(startOfWeek(new Date(), { weekStartsOn: 1 }), {
    representation: "date",
  });

  const saveWeeklyMenu = useCallback(
    async (menuId: string) => {
      if (!userToken) {
        setError("No autenticado");
        return null;
      }
      setLoading(true);
      setError(null);

      try {
        const getResp = await fetch(`/api/weekly-menu?date=${mondayDate}`, {
          headers: { Authorization: `Bearer ${userToken}` },
        });

        if (!getResp.ok && getResp.status !== 404) {
          throw new Error(
            `Error al obtener menú semanal: ${getResp.statusText}`
          );
        }

        if (getResp.status === 404) {
          // Crear nuevo menú semanal
          const postResp = await fetch("/api/weekly-menu", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userToken}`,
            },
            body: JSON.stringify({ menuId, mondayOfWeek: mondayDate }),
          });

          if (!postResp.ok) {
            throw new Error(
              `Error al crear menú semanal: ${postResp.statusText}`
            );
          }

          const postData = await postResp.json();
          setLoading(false);
          return postData;
        }

        // Actualizar menú semanal existente
        const existingMenu = await getResp.json();

        const putResp = await fetch(`/api/weekly-menu/${existingMenu.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body: JSON.stringify({ menuId, mondayOfWeek: mondayDate }),
        });

        if (!putResp.ok) {
          throw new Error(
            `Error al actualizar menú semanal: ${putResp.statusText}`
          );
        }

        const putData = await putResp.json();
        setLoading(false);
        return putData;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Error desconocido";
        setError(message);
        setLoading(false);
        return null;
      }
    },
    [userToken, mondayDate]
  );

  return { saveWeeklyMenu, loading, error };
}
