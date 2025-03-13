import { View, Text, ImageSourcePropType } from 'react-native'
import React from 'react'
import UserProfileButton from '../../components/atoms/UserProfileButton'
import SearchFilter from '../../components/atoms/SearchFilter'
import CategoriesFilter from '../../components/atoms/CategoriesFilter'
import RecipeCard from '../../components/atoms/RecipeCard'

type userIcon = {
        image: ImageSourcePropType;
    }

const SearchMenu = ({image}: userIcon) => {
  return (
    <View>
      <UserProfileButton headerIcon={image} />
      <SearchFilter icon='search' placeholder='enter your fav recipe'/>

      <View className='items-start mx-5'>
        <Text className='text-xl font-bold'>Categories</Text>
      </View>
      <CategoriesFilter/>
      <View className='items-start mx-5'>
        <Text className='text-xl font-bold'>Suggested dishes</Text>
      </View>
      <RecipeCard/>

    </View>
  )
}

export default SearchMenu