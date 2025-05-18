import React from "react";
import { View, Text, Dimensions } from "react-native";
import { IngredienteCompra } from "../types";

interface ShoppingListProps {
  lista: IngredienteCompra[];
}

const { height } = Dimensions.get("window");
const roundTo8 = (v: number) => Math.floor(v / 8) * 8;
const padding = roundTo8(height * 0.02);
const marginTop = roundTo8(height * 0.04);
const borderRadius = 20;

const ShoppingList = ({ lista }: ShoppingListProps) => (
  <View
    className="shadow-md"
    style={{
      marginTop,
      backgroundColor: "#c9b39c",
      padding,
      borderRadius,
    }}
  >
    <Text
      className="text-xl font-bold mb-2"
      style={{ color: "#4a2f27", lineHeight: 26 }}
    >
      Lista de Compras
    </Text>
    {lista.map((item, index) => (
      <Text
        key={index}
        className="text-sm mb-1"
        style={{ color: "#4a2f27", lineHeight: 20 }}
      >
        - {item.nombre}: {item.cantidad.valor} {item.cantidad.unidad}
      </Text>
    ))}
  </View>
);

export default ShoppingList;
