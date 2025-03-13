import { Image, View, Text, FlatList, Pressable } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { RecipeList } from '../../data/RecipesData'
import {  useRouter } from 'expo-router';

const RecipeCard = () => {
    const router = useRouter();

  return (
    <View>
        <FlatList 
            data={RecipeList}
            keyExtractor={(item) => item.id} 
            renderItem={({ item }) => 
            <Pressable
                onPress={() => router.push(`/recipe/${item.id}`)} 
                className='bg-white shadow-black shadow-lg rounded-2xl my-4 mx-5 items-center py-6 px-2' 
                style={{shadowOpacity: 0.1, shadowRadius: 7}}>
                <Image source={item.image} className='w-[150px] h-[150px] rounded-2xl' resizeMode='cover' />
                <Text>{item.name}</Text>
                <View className='mt-2' style={{flexDirection: "row"}}>
                    <Text>{item.time}</Text>
                    <Text> | </Text>
                    <View className='justify-center items-center' style={{flexDirection: "row"}}>
                        <Text className='mr-1'>{item.rating}</Text>
                        <FontAwesome name='star' size={16} color={"#ff7514"} />
                    </View>
                </View>
            </Pressable>}
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