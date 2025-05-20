import React, { useRef } from "react";
import { View, Text, Pressable, Animated, Dimensions } from "react-native";

interface MenuDaySectionProps {
  dia: string;
  comidas: { [comida: string]: string };
  recipes: Record<string, any>;
}

const { height } = Dimensions.get("window");
const roundTo8 = (v: number) => Math.floor(v / 8) * 8;
const cardPadding = roundTo8(height * 0.02);
const minCardHeight = roundTo8(height * 0.12);

const MenuDaySection = ({ dia, comidas, recipes }: MenuDaySectionProps) => {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      friction: 3,
    }).start();
  };

  return (
    <View className="mb-5">
      <Text
        className="text-xl font-semibold mb-1 capitalize"
        style={{ color: "#c79e7a", lineHeight: 26 }}
      >
        {dia}
      </Text>

      {Object.entries(comidas).map(([tipoComida, recetaId]) => {
        if (!recetaId || recetaId.trim() === "") {
          return (
            <Text
              key={tipoComida}
              className="text-gray-400 italic mb-2"
              style={{ fontSize: 14 }}
            >
              Sin {tipoComida}
            </Text>
          );
        }

        const receta = recipes[recetaId];

        if (!receta) {
          return (
            <Text key={tipoComida} className="text-red-600 mb-2 italic">
              Sin receta para {tipoComida}
            </Text>
          );
        }

        return (
          <Pressable
            key={tipoComida}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            className="mb-4"
          >
            <Animated.View
              style={{
                transform: [{ scale: scaleAnim }],
                padding: cardPadding,
                minHeight: minCardHeight,
              }}
              className="bg-[#c9b39c] rounded-2xl justify-center shadow-md"
            >
              <Text
                className="text-base font-bold"
                style={{ color: "#4a2f27", lineHeight: 22 }}
              >
                {receta.nombre}
              </Text>
            </Animated.View>
          </Pressable>
        );
      })}
    </View>
  );
};

export default MenuDaySection;
