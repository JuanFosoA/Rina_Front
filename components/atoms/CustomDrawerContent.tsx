import AsyncStorage from '@react-native-async-storage/async-storage';
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import React from 'react';

export default function CustomDrawerContent(props: any) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear();
      console.log("Token borrado");
      router.replace('/auth');
    } catch (error) {
      console.error("Error borrando el token:", error);
    }
  };

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Log out" onPress={handleLogout} />
    </DrawerContentScrollView>
  );
}
