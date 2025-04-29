import { View, Text } from "react-native";
import React from "react";

interface MenuDaySectionProps {
  dia: string;
  comidas: { [comida: string]: string };
  recipes: Record<string, any>;
}

const MenuDaySection = ({ dia, comidas, recipes }: MenuDaySectionProps) => (
  <View className="mb-6">
    <Text className="text-xl font-semibold capitalize mb-2">{dia}</Text>
    {Object.entries(comidas).map(([tipoComida, recetaId]) => {
      const receta = recipes[recetaId];
      return receta ? (
        <View key={tipoComida} className="mb-4 bg-quaternary rounded-lg p-3">
          <Text className="text-base font-bold">{receta.nombre}</Text>
        </View>
      ) : (
        <Text key={tipoComida} className="text-red-500">Sin receta para {tipoComida}</Text>
      );
    })}
  </View>
);

export default MenuDaySection;
