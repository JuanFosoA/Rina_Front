
import Drawer from 'expo-router/drawer'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import CustomDrawerContent  from '../../components/atoms/CustomDrawerContent';
const DrawerLayoot = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="(tabs)" options={{ title: "Inicio", headerShown: false }} />
        <Drawer.Screen name="profile" options={{ title: "Perfil", headerShown: false }} />
        <Drawer.Screen name="recipe" options={{ title: "Recipe", headerShown: false }} />
      </Drawer>
    </GestureHandlerRootView>
  )
}

export default DrawerLayoot