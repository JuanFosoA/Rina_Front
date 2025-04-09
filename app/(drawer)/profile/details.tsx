import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useLocalSearchParams } from 'expo-router'

const Profile = () => {

  const {idMeal} = useLocalSearchParams()

  useEffect(() => {
    const bodyToSend = {
      "idMeal": idMeal
    }
    fetch('', {
      method: "POST",
      body: JSON.stringify(bodyToSend)
    })
    .then(() => {
      console.log()
    })

  }, [idMeal])

  return (
    <SafeAreaView className='bg-slate-600 h-full' style={{ flex:1}}> 
      <View>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
        <Text>perfil</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile