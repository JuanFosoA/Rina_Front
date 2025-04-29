import { View, Text } from 'react-native';
import React from 'react';

type ErrorMessageProps = {
  error: string;
};

const MenuErrorMessage = ({ error }: ErrorMessageProps) => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
    <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
  </View>
);

export default MenuErrorMessage;
