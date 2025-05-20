import React from "react";
import { View, Text } from "react-native";
import { useWeeklyMenu } from "../hooks/useWeeklyMenu";

export function RecipeOfMomentCard() {
  const { recetaActual, loading, error, notFound } = useWeeklyMenu();

  if (loading) {
    return (
      <View className="p-4 rounded-xl shadow bg-gray-100 w-full max-w-md h-32 justify-center items-center">
        <Text className="text-gray-400 mt-2">Receta no encontrada</Text>
      </View>
    );
  }

  if (error || notFound || !recetaActual) {
    return (
      <View className="p-4 rounded-xl shadow bg-red-100 w-full max-w-md h-32 justify-center items-center">
        <Text className="text-red-600 text-center">
          {error || "No hay receta asignada para este momento."}
        </Text>
      </View>
    );
  }

  return (
    <View className="p-4 rounded-xl shadow bg-white w-full max-w-md h-32 justify-center">
      <Text className="text-lg font-semibold text-gray-800">
        {recetaActual.name}
      </Text>
    </View>
  );
}
