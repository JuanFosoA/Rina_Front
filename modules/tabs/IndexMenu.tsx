import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

const IndexMenu = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1}}>
        <View>
          <Text>IndexMenu</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

export default IndexMenu