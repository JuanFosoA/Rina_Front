import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const ProfileLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='details' />
    </Stack>
  )
}

export default ProfileLayout