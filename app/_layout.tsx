import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'
import "../global.css";

const HomeLayout = () => {

  //const [isConnected, setIsConnected] = useState(false)
  const [isAuthenticate, setIsAuthenticate] = useState(false)

  //AQUI HICE AJUSTES PA HACER LA SIMULACIÓN
  const verifyAuthenticate = async () => {
    try {
      const token = await AsyncStorage.getItem('@myToken')

      // console.log("Token almacenado:", token);
      //console.log("Token almacenado:", token);
      setIsAuthenticate(!!token);
    } catch (error) {
      console.error("Error verificando autenticación:", error);
      setIsAuthenticate(false);
    }
  }

  //AQUI HICE AJUSTES PA HACER LA SIMULACIÓN
  useEffect(() => {
    // const unsubscribe = NetInfo.addEventListener(state => {
    //   setIsConnected(state.isConnected as boolean)
    // })

    // return () => {
    //   unsubscribe();
    // }

    //AsyncStorage.removeItem('@myToken'); 
      
    verifyAuthenticate()
    const checkTokenInterval = setInterval(verifyAuthenticate, 1000); 

    return () => clearInterval(checkTokenInterval); 
  }, [])

  useEffect(() => {
    if (isAuthenticate === false) {
      router.replace('/auth');
    } else {
      router.replace('/');
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