import { Image, View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import sandwich  from '../../assets/cubano.webp'

const DailyMenu = () => {
  return (
    <View className='flex items-center justify-center border-4 border-secondary-100' >
        <View className='w-[80%] border-4 border-secondary-200'>
            <Text className='text-4xl'>DailyMenu</Text>
            <Link href='/profile/details'>
                <Image 
                    className='w-40 h-36'
                    source={sandwich}/>
            </Link>
        </View>
    </View>
  )
}

export default DailyMenu