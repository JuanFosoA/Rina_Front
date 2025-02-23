import { View, Text } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

import { bgRed } from '../../components/tokens'
import DailyMenu from '../../components/molecules/DailyMenu'

const Index = () => {
  return (
    <View>
      
      <Text className='text-4xl text-red-600'>Index</Text>
      <Link href='/profile/details' >
        <Text className={`m-8 p-8 bg-primary border border-secondary-100 rounded text-3xl`}>
            Profile
        </Text>
      </Link>
      <Link href='/auth' >
        <Text className={`m-8 p-8 bg-primary border border-secondary-100 rounded text-3xl`}>
            Auth
        </Text>
      </Link>
      <DailyMenu/>
    </View>
  )
}

export default Index