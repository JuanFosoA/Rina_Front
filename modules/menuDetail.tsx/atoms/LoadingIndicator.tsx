import { View, ActivityIndicator } from "react-native";
import React from "react";

const LoadingIndicator = () => (
  <View className="flex-1 justify-center items-center bg-white">
    <ActivityIndicator size="large" color="#000" />
  </View>
);

export default LoadingIndicator;
