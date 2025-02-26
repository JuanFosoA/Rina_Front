import { View, Text, Image } from 'react-native'
import React from 'react'
import { useLocalSearchParams } from 'expo-router';
import { RecipeList } from '../../data/RecipesData';

const RecipeDetail = () => {
    const { id } = useLocalSearchParams();
    const recipe = RecipeList.find((item) => item.id === id);

    if (!recipe) {
        return (
          <View className="flex-1 justify-center items-center bg-red-400">
            <Text className="text-white text-xl">Receta no encontrada</Text>
          </View>
        );
      }

    return (
        <View className='bg-red-400 h-full'>
        <View className='bg-white flex-1 rounded-tr-[56px] rounded-tl-[56px] mt-60 items-center'>
            <View className='bg-red-600 h-[300px] w-[300px] absolute -top-[150px] rounded-2xl'>
                <Image source={recipe.image} className='w-full h-full rounded-2xl' resizeMode='cover'/>
            </View>
            <View className='mt-52 justify-center items-center'>
                <Text className="text-2xl font-bold mb-4">{recipe.name}</Text>
                <Text>Tiempo: {recipe.time}</Text>
            </View>
        </View>
        </View>
    )
}

export default RecipeDetail