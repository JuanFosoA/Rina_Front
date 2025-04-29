import { View, Text } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const EmptyRecipes = () => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <FontAwesome name="cutlery" size={48} color="#ccc" />
      <Text className="text-gray-500 text-lg mt-4">No hay recetas disponibles</Text>
    </View>
  );
};

export default EmptyRecipes;
