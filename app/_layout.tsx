import { View, Text } from 'react-native'
import React from 'react'

import "../global.css";
import { Stack } from 'expo-router';

const HomeLayout = () => {
  return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
        <Stack.Screen name="auth" options={{ headerShown: false}}/>
        <Stack.Screen name="profile" options={{ headerShown: false}}/>

    </Stack>
  )
}

export default HomeLayout