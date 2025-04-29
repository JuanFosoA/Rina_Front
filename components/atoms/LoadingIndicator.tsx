import { View, Text, ActivityIndicator } from 'react-native';
import React from 'react';

const LoadingIndicator = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator size="large" color="#ff7514" />
      <Text className="mt-4 text-gray-500">Cargando recetas...</Text>
    </View>
  );
};

export default LoadingIndicator;
