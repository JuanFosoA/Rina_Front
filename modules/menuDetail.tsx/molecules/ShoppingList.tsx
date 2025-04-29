import { View, Text } from "react-native";
import React from "react";
import { IngredienteCompra } from "../types";

interface ShoppingListProps {
  lista: IngredienteCompra[];
}

const ShoppingList = ({ lista }: ShoppingListProps) => (
  <View className="mt-8">
    <Text className="text-xl font-bold mb-2">Lista de Compras</Text>
    {lista.map((item, index) => (
      <Text key={index}>- {item.nombre}: {item.cantidad.valor} {item.cantidad.unidad}</Text>
    ))}
  </View>
);

export default ShoppingList;
