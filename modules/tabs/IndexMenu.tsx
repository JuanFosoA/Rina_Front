import { View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import Slider from '../../components/molecules/Slider'
import { ImageSlider } from '../../data/SliderData'
import SearchFilter from '../../components/atoms/SearchFilter'
import UserProfileButton from '../../components/atoms/UserProfileButton'
import CategoriesFilter from '../../components/atoms/CategoriesFilter'

type userIcon = {
        image: ImageSourcePropType;
    }

const IndexMenu = ({image}: userIcon) => {
  return (
    <View>
      <UserProfileButton headerIcon={image} />
      <SearchFilter icon='search' placeholder='enter your fav recipe'/>

      <View className='items-start mx-5'>
        <Text className='text-xl font-bold'>Categories</Text>
      </View>
      <CategoriesFilter/>
      
      <View className='items-start mx-5 my-3'>
        <Text className='text-3xl items-center '>Today's menu</Text>
      </View>
      <Slider itemList={ImageSlider}/>
    </View>
  )
}

export default IndexMenu