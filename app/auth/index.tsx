import { View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { authStyles } from '../../components/tokens'

const Auth = () => {
  return (
    <View className={authStyles.container}>
      <Text className='text-fith text-7xl p-6'>Bienvenido</Text>
      <Link href='/auth/login' className={authStyles.button}>
        <Text className={authStyles.buttonText}>
            login
        </Text>
      </Link>
      <Link href='/auth/register' className={authStyles.button} >
        <Text className={authStyles.buttonText}>
            register
        </Text>
      </Link>
    </View>
  )
}

export default Auth