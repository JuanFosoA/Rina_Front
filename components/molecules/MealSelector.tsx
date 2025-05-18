import { useState } from "react";
import { Modal, FlatList, View, Text } from "react-native";
import { useAuth } from "../../context/AuthContext";
import MealButton from "../atoms/MealButton";
import PrimaryButton from "../atoms/PrimaryButton";
import { useRecipes } from "../../hooks/useRecipes";

type MealSelectorProps = {
  day: string;
  mealType: string;
  selectedRecipeId: string;
  onSelect: (day: string, mealType: string, recipeId: string) => void;
};

export const MealSelector = ({
  day,
  mealType,
  selectedRecipeId,
  onSelect,
}: MealSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { userToken } = useAuth();

  const { recipes, loading } = useRecipes(userToken, modalVisible);

  const handleSelect = (recipeId: string) => {
    onSelect(day, mealType, recipeId);
    setModalVisible(false);
  };

  const selectedName =
    recipes.find((r) => r.id === selectedRecipeId)?.name || "";

  return (
    <>
      <MealButton
        label={selectedRecipeId ? selectedName : "Seleccionar receta"}
        selected={!!selectedRecipeId}
        onPress={() => setModalVisible(true)}
      />
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/20 bg-opacity-40 px-5">
          <View className="bg-white rounded-2xl p-6 w-5/6 max-h-[90%] shadow-lg">
            <Text className="text-xl font-bold mb-4 capitalize text-center">
              Selecciona una receta para {mealType}
            </Text>

            {loading ? (
              <Text className="text-center my-4">Cargando recetas...</Text>
            ) : (
              <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PrimaryButton
                    title={item.name}
                    onPress={() => handleSelect(item.id)}
                    style={{ marginVertical: 8 }}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 12 }}
                showsVerticalScrollIndicator={false}
                style={{ maxHeight: 300 }}
              />
            )}

            <PrimaryButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 20,
                backgroundColor: "#e5e7eb",
                borderRadius: 12,
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
