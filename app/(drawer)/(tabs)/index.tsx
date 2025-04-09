import { ScrollView } from 'react-native'
import React from 'react'

import IndexMenu from '../../../modules/tabs/IndexMenu'
import { SafeAreaView } from 'react-native-safe-area-context'



const Index = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <IndexMenu image={require("../../../assets/cubano.webp")} />
      </ScrollView>
    </SafeAreaView>

  )
}

export default Index