import { View, Text, Pressable } from 'react-native';
import React from 'react';

interface ErrorMessageProps {
  error: string;
  onRetry: () => void;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ error, onRetry }) => {
  return (
    <View className="flex-1 justify-center items-center p-4">
      <Text className="text-red-500 text-center mb-4">Error: {error}</Text>
      <Pressable
        onPress={onRetry}
        className="bg-orange-500 px-4 py-2 rounded-md mt-2"
      >
        <Text className="text-white font-medium">Reintentar</Text>
      </Pressable>
    </View>
  );
};

export default ErrorMessage;
