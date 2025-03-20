import Drawer from 'expo-router/drawer';
import React, { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import CustomDrawerContent from './CustomDrawerContent';
import { router, useRootNavigationState } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';

const DrawerLayout = () => {
  const rootNavigationState = useRootNavigationState();
  const { isAuthenticated, isLoading } = useAuth();

  // Como se explica en AuthContext, al usar useEffect evitamos los problemas con las rutas.
  // Por el mismo motivo añadí useRootNavigationState, mientras no se haya montando el stack correctamente
  // no se realizara ninguna acción.
  useEffect(() => {
    if (!isLoading && rootNavigationState?.key !== undefined) {
      if (!isAuthenticated) {
        router.replace("/auth");
      }
    }
  }, [rootNavigationState?.key, isAuthenticated, isLoading]);

  // Tambien tengo en cuenta el estado de la carga porque por un instante entre 
  // la verificación de token y la pantalla de carga, se logra ver el index entonces
  // mejor evito que se renderice cualquier vista hasta estar seguro del resultado.
  if (isLoading || rootNavigationState?.key === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

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
