import React from 'react';
import { Pressable, Text } from 'react-native';
import { router } from 'expo-router';

export default function CreateMenu() {
  return (
    <Pressable
      className="absolute bottom-6 right-6 bg-blue-600 rounded-full w-16 h-16 items-center justify-center shadow-lg"
      onPress={() => router.push('(menu)/menu')}
    >
      <Text className="text-white text-3xl">+</Text>
    </Pressable>
  );
}
