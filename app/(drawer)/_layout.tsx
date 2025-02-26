
import Drawer from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const DrawerLayoot = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen name="(tabs)" options={{ title: "Inicio", headerShown: false }} />
        <Drawer.Screen name="profile" options={{ title: "Perfil", headerShown: false }} />
        <Drawer.Screen name="recipe" options={{ title: "Recipe", headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerLayoot