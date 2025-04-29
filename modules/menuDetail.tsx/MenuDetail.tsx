import { ScrollView, View, Text } from "react-native";
import React from "react";
import { useLocalSearchParams } from "expo-router";
import { useMenuDetail } from "./useMenuDetail";
import LoadingIndicator from "./atoms/LoadingIndicator";
import MenuDaySection from "./molecules/MenuDaySection";
import ShoppingList from "./molecules/ShoppingList";

const MenuDetail = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { menu, recipes, listaCompras, loading } = useMenuDetail(id);

  if (loading) return <LoadingIndicator />;

  return (
    <ScrollView className="bg-white h-full">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-4 text-center">Detalle del Menú</Text>

        {menu && Object.entries(menu).map(([dia, comidas]) => (
          <MenuDaySection key={dia} dia={dia} comidas={comidas} recipes={recipes} />
        ))}

        {listaCompras && <ShoppingList lista={listaCompras} />}
      </View>
    </ScrollView>
  );
};

export default MenuDetail;
