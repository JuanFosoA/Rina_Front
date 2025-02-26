import { Image, View, Text, FlatList } from 'react-native'
import React from 'react'
import { RecipeList } from '../../data/RecipesData'

const RecipeCard = () => {
  return (
    <View>
        <FlatList 
            data={RecipeList}
            keyExtractor={(item) => item.id} 
            renderItem={({ item }) => 
            <View 
                className='bg-white shadow-black shadow-lg rounded-2xl my-4 mx-5 items-center py-6 px-2' 
                style={{shadowOpacity: 0.1, shadowRadius: 7}}>
                <Image source={item.image} className='w-[150px] h-[150px] rounded-2xl' resizeMode='cover' />
                <Text>{item.name}</Text>
                <View>
                <Text>{item.time}</Text>
                </View>
            </View>}
            scrollEnabled={false}
            numColumns={2}
            columnWrapperStyle={{
                justifyContent: "space-between"
            }}
            />
    </View>
  )
}

export default RecipeCard