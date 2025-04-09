import { recipeToken } from "./token";

interface Recipe {
  id: string;
  name: string;
  time: string;
  image: string;
}

export const fetchRecipeById = async (
  id: string,
  token: string | null
): Promise<Recipe> => {
  console.log(id)
  try {
    const response = await fetch(recipeToken.getId + id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error("Error al obtener la receta");
    }
    return await response.json();
  } catch (err) {
    throw err;
  }
};