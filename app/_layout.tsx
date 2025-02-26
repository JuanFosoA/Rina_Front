import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import "../global.css";

const HomeLayout = () => {

  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  const verifyAuthenticate = async () => {
    try {
      const token = await AsyncStorage.getItem('@myToken')
      setIsAuthenticate(!!token);
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setIsAuthenticate(false);
    }
  }

  useEffect(() => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   setIsConnected(state.isConnected as boolean)
    // })

    // return () => {
    //   unsubscribe();
    // }
    verifyAuthenticate()
  }, [])

  useEffect(() => {
    if (isAuthenticate === false) {
      router.replace('/auth');
    }
  }, [isAuthenticate]);
  
  return (
      <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false}}/>
          <Stack.Screen name="(drawer)" options={{ headerShown: false}}/>
      </Stack>
  )
}

export default HomeLayout