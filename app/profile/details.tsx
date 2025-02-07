import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  return (
    <SafeAreaView style={{ flex:1}}>
      <StatusBar barStyle="default" backgroundColor="white" />
      <View>
        
        <Text>perfil</Text>
      </View>
    </SafeAreaView>
  )
}

export default Profile