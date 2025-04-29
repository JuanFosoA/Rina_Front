import { View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import Slider from '../../components/molecules/Slider'
import { ImageSlider } from '../../data/SliderData'
import SearchFilter from '../../components/atoms/SearchFilter'
import UserProfileButton from '../../components/atoms/UserProfileButton'
import RecipeCard from '../../components/organism/RecipeCard'

type userIcon = {
        image: ImageSourcePropType;
    }

const IndexMenu = ({image}: userIcon) => {
  return (
    <View>
      <UserProfileButton headerIcon={image} />
      <SearchFilter icon='search' placeholder='enter your fav recipe'/>

      <View className='items-start mx-5'>
        <Text className='text-xl font-bold'>Today's menu</Text>
      </View>
      <Slider itemList={ImageSlider}/>

      <View className='items-start mx-5'>
        <Text className='text-xl font-bold'>Suggested dishes</Text>
      </View>
      <RecipeCard/>
    </View>
  )
}

export default IndexMenu