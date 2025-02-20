import { View, Text, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

import { bgRed } from '../../components/tokens'
import { SafeAreaView } from 'react-native-safe-area-context'
import IndexMenu from '../../modules/tabs/IndexMenu'

const Index = () => {
  return (
    <SafeAreaView>
      <View>
        <StatusBar barStyle="dark-content" backgroundColor="white" />
        <IndexMenu/>
        <Text className='text-4xl text-red-600'>Index</Text>
        <Link href='/profile/details' >
          <Text className={`bg-primary border border-secondary-100 rounded p-4 text-3xl`}>
              Profile
          </Text>
        </Link>
      </View>
    </SafeAreaView>
  )
}

export default Index