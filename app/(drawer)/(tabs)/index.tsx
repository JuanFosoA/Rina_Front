import { View, Text, StatusBar } from 'react-native'
import { Link } from 'expo-router'
import React from 'react'

import IndexMenu from '../../../modules/tabs/IndexMenu'
import { SafeAreaView } from 'react-native-safe-area-context'



const Index = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View>
        <IndexMenu image={require("../../../assets/cubano.webp")} />
      </View>
    </SafeAreaView>

  )
}

export default Index