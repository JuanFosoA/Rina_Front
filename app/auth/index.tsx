import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'

const Auth = () => {
  return (
    <View>
      <Text>Auth</Text>
      <Link href='/auth/login' >
        <Text className={`bg-primary border border-secondary-100 rounded p-4 text-3xl`}>
            login
        </Text>
      </Link>
      <Link href='/auth/register' >
        <Text className={`bg-primary border border-secondary-100 rounded p-4 text-3xl`}>
            register
        </Text>
      </Link>
    </View>
  )
}

export default Auth