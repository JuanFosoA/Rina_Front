import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import RecipeDetail from '../../../modules/recipe/RecipeDetail'

const recipeDetail = () => {
  return (
    <SafeAreaView style={{flex:1}}>
        <View>
        <RecipeDetail/>
        </View>
    </SafeAreaView>
  )
}

export default recipeDetail