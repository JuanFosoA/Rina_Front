import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
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