import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { fetchRecipeById } from "../../server/recipe.server";
import FontAwesome from '@expo/vector-icons/FontAwesome';

interface NutritionalInfo {
  calorias: number;
  carbohidratos: string;
  grasas: string;
  proteinas: string;
}

interface Ingredient {
  cantidad: any;
  nombre: string;
}

interface Instruction {
  orden: number;
  paso: string;
}

interface Recipe {
  id: string;
  nombre: string;
  categoria: string[];
  imagenNombre: string | null;
  informacionNutricional: NutritionalInfo;
  ingredientes: Ingredient[];
  instrucciones: Instruction[];
  porciones: number;
  tiempoPreparacion: number;
}

const RecipeDetail: React.FC = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { userToken } = useAuth();

  useEffect(() => {
    const getRecipe = async () => {
      try {
        const data = await fetchRecipeById(id, userToken);
        setRecipe(data as unknown as Recipe);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getRecipe();
  }, [id, userToken]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-red-400">
        <ActivityIndicator size="large" color="#fff" />
      </View>
    );
  }

  if (error || !recipe) {
    return (
      <View className="flex-1 justify-center items-center bg-red-400">
        <Text className="text-white text-xl">{error || "Receta no encontrada"}</Text>
      </View>
    );
  }

  return (
    <ScrollView className="bg-red-400 h-full">
      <View className="bg-white flex-1 rounded-tr-[56px] rounded-tl-[56px] mt-60 items-center p-4">
        <View className="bg-red-600 h-[300px] w-[300px] rounded-2xl">
          {recipe.imagenNombre ? (
            <Image
              source={{ uri: recipe.imagenNombre }}
              className="w-full h-full rounded-2xl"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 justify-center items-center">
              <FontAwesome name="cutlery" size={32} color="#ccc" />
              <Text className="text-gray-400 mt-2">Sin imagen</Text>
            </View>
          )}
        </View>

        <View className="mt-4 justify-center items-center">
          <Text className="text-2xl font-bold mb-2">{recipe.nombre}</Text>
          <Text>Categoría: {recipe.categoria.join(", ")}</Text>
          <Text>Tiempo de preparación: {recipe.tiempoPreparacion} minutos</Text>
          <Text>Porciones: {recipe.porciones}</Text>

          <Text className="font-bold mt-4">Información Nutricional:</Text>
          <Text>Calorías: {recipe.informacionNutricional.calorias}</Text>
          <Text>Carbohidratos: {recipe.informacionNutricional.carbohidratos}</Text>
          <Text>Grasas: {recipe.informacionNutricional.grasas}</Text>
          <Text>Proteínas: {recipe.informacionNutricional.proteinas}</Text>

          <Text className="font-bold mt-4">Ingredientes:</Text>
          {recipe.ingredientes.map((ing, index) => (
            <Text key={index}>- {ing.nombre}</Text>
          ))}

          <Text className="font-bold mt-4">Instrucciones:</Text>
          {recipe.instrucciones.map((step) => (
            <Text key={step.orden}>{step.orden}. {step.paso}</Text>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default RecipeDetail;
