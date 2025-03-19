import Drawer from 'expo-router/drawer';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './CustomDrawerContent';

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{ headerShown: false }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen name="(tabs)" options={{ title: "Inicio" }} />
        <Drawer.Screen name="profile" options={{ title: "Perfil" }} />
        <Drawer.Screen name="recipe" options={{ title: "Receta" }} />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default DrawerLayout;
