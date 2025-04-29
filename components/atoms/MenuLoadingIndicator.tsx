import { View, ActivityIndicator } from 'react-native';
import React from 'react';

const MenuLoadingIndicator = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 16 }}>
    <ActivityIndicator size="large" color="#007bff" />
  </View>
);

export default MenuLoadingIndicator;
