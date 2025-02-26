import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import "../global.css";

const HomeLayout = () => {

  const [isConnected, setIsConnected] = useState(false)
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  const verifyAuthenticate = async () => {
    try {
      const token = await AsyncStorage.getItem('@myToken')
      if (token) setIsAuthenticate(true)
    } catch (error) {
      
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

  return (
    isAuthenticate ? (
      router.navigate('/auth')
    ) : (
      <Stack>
          <Stack.Screen name="auth" options={{ headerShown: false}}/>
          <Stack.Screen name="(drawer)" options={{ headerShown: false}}/>
      </Stack>
    )
  )
}

export default HomeLayout