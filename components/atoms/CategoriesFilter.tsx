import { ScrollView, View, Text } from 'react-native'
import React from 'react'
import { FoodCategory } from '../../data/CategoriesData'

const CategoriesFilter = () => {
  return (
    <View className='mx-5'>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FoodCategory.map((category, index) => {
            return <View 
                    key={category.id}
                    className='mr-4 rounded-lg px-4 py-3 my-4 shadow-black shadow-lg'
                    style={{backgroundColor: index === 0 ? '#EF233C':'#FFF' ,shadowOpacity: 0.1, shadowRadius: 7}}>
                <Text style={{color: index === 0 ? '#FFF':'#000'}}>{category.category}</Text>
            </View>
        })}
      </ScrollView>
    </View>
  )
}

export default CategoriesFilter