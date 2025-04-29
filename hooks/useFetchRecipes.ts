import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getRecetas, Receta } from "../server/recetas.server";
import { apiFast } from "../server/token";

export function useFetchRecipes() {
  const { userToken } = useAuth();
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const fetchRecipes = async () => {
    try {
      if (!userToken) {
        throw new Error("No se encontró token de autenticación");
      }
      setLoading(true);
      setError(null);

      const response = await getRecetas(userToken);

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.data) {
        const recetasConImagen = response.data.map((receta) => ({
          ...receta,
          imagenNombre: receta.imagenNombre
            ? `${apiFast}uploads/${receta.imagenNombre}`
            : null,
        }));
        setRecetas(recetasConImagen);
      } else {
        throw new Error("No se recibieron datos de recetas");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Error desconocido";
      console.error("Error fetching recipes:", errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [userToken, retryCount]);

  const handleRetry = () => {
    setRetryCount((prev) => prev + 1);
  };

  return {
    recetas,
    loading,
    error,
    handleRetry,
  };
}
