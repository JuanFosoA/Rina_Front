import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

import { bgRed } from '../../components/tokens'

const Index = () => {
  return (
    <View>
      <Text className='text-4xl text-red-600'>Index</Text>
      <Link href='/profile/details' >
        <Text className={`bg-primary border border-secondary-100 rounded p-4 text-3xl`}>
            Profile
        </Text>
      </Link>
    </View>
  )
}

export default Index