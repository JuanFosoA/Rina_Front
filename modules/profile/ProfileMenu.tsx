import { Image, View, Text } from 'react-native'
import React from 'react'
import Slider from '../../components/molecules/Slider'
import { ImageSlider } from '../../data/SliderData'
import CategoriesFilter from '../../components/molecules/CategoriesFilter'

const ProfileMenu = () => {
  return (
    <View className="flex-1 items-center justify-center bg-gray-100 p-4">
      <Image
        source={require("../../assets/cubano.webp")}
        className="w-32 h-32 rounded-full border-4 border-white shadow-md"
      />
      <Text className="text-xl font-bold mt-4">John Doe</Text>
      <Text className="text-gray-600">@johndoe</Text>
      
      <View className='items-start mx-5 my-6'>
        <Text className='text-xl font-bold'>Favorite categories</Text>
      </View>

      <View className='h-20'>
        <CategoriesFilter />
      </View>
      <View className='h-60'>
        <View className='items-start mx-5'>
          <Text className='text-xl font-bold'>Favorite foods</Text>
        </View>
        <Slider itemList={ImageSlider}/>

      </View>

    </View>
  )
}

export default ProfileMenu