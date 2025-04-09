import { View, SafeAreaView } from 'react-native'
import React from 'react'
import MenuDetail from '../../modules/menuDetail.tsx/MenuDetail'

const recipeDetail = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <View>
        <MenuDetail/>
        </View>
    </SafeAreaView>
  )
}

export default recipeDetail