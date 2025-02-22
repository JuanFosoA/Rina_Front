import { Image, View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import sandwich  from '../../assets/cubano.webp'

const DailyMenu = () => {
  return (
    <View>
      <Text>DailyMenu</Text>
      <Link href='/profile/details'>
        <Image 
            source={sandwich}/>
      </Link>
    
    </View>
  )
}

export default DailyMenu