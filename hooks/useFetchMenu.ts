import { useEffect, useState } from "react";
import { getMenu } from "../server/menu.server";
import { useAuth } from "../context/AuthContext";

export function useFetchMenu() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getMenu(userToken);
        if (res.error) {
          setError(res.error);
          return;
        }

        const menuArray = Object.entries(res.data).map(([dia, comidas]) => ({
          id: dia,
          dia,
          ...(typeof comidas === "object" && comidas !== null ? comidas : {}),
        }));

        setData(menuArray);
      } catch (err) {
        console.error("Error al obtener menú:", err);
        setError("Hubo un problema al obtener el menú.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userToken]);

  return { data, loading, error };
}
