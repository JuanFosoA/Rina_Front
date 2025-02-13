import { useEffect, useState } from 'react';
import { View, Text } from 'react-native'
import React from 'react'
import NetInfo from '@react-native-community/netinfo'

import "../global.css";
import { Stack } from 'expo-router';

const HomeLayout = () => {

  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected as boolean)
    })

    return () => {
      unsubscribe();
    }
  }, [])

  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="auth" options={{ headerShown: false}}/>
        <Stack.Screen name="profile" options={{ headerShown: false}}/>

    </Stack>
  )
}

export default HomeLayout