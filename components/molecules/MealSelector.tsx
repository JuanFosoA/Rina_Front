// MealSelector.tsx
import { useState } from "react";
import { Modal, FlatList, View, Text, Pressable, Animated } from "react-native";
import { useAuth } from "../../context/AuthContext";
import MealButton from "../atoms/MealButton";
import PrimaryButton from "../atoms/PrimaryButton";
import { useRecipes } from "../../hooks/useRecipes";
import MealSelectorButton from "../atoms/MealSelectorButton";

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

  const scaleValue = new Animated.Value(1);
  const onPressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
  };

  const handleSelect = (recipeId: string) => {
    onSelect(day, mealType, recipeId);
    setModalVisible(false);
  };

  const selectedName =
    recipes.find((r) => r.id === selectedRecipeId)?.name || "";

  return (
    <>
      <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
        <Pressable
          onPressIn={onPressIn}
          onPressOut={onPressOut}
          onPress={() => setModalVisible(true)}
        >
          <MealButton
            label={selectedRecipeId ? selectedName : "Seleccionar receta"}
            selected={!!selectedRecipeId}
            onPress={() => setModalVisible(true)}
          />
        </Pressable>
      </Animated.View>

      <Modal
        animationType="fade"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40 px-6">
          <View className="bg-[#f7f3e9] rounded-3xl p-6 w-5/6 max-h-[90%] shadow-lg">
            <Text className="text-2xl font-bold mb-5 capitalize text-center text-[#a49c8f]">
              Selecciona una receta para {mealType}
            </Text>

            {loading ? (
              <Text className="text-center my-6 text-[#a49c8f]">
                Cargando recetas...
              </Text>
            ) : (
              <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <MealSelectorButton
                    title={item.name}
                    onPress={() => handleSelect(item.id)}
                  />
                )}
                contentContainerStyle={{ paddingBottom: 20 }}
                showsVerticalScrollIndicator={false}
              />
            )}
            <PrimaryButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              style={{
                marginTop: 24,
                backgroundColor: "#e5e7eb",
              }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
