import { Image, View, Text } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import sandwich  from '../../assets/cubano.webp'

const DailyMenu = () => {
  return (
    <View className='flex items-center justify-center w-full h-60 border-4 border-secondary-100' >
        <View className='flex w-[80%] h-full border-4 border-secondary-200'>
            <Text className='font-montserrat text-2xl'>DailyMenu</Text>
            <Link href='/profile/details'>
                <Image 
                    className='h-[85%]'
                    source={sandwich}
                    resizeMode='cover'
                    />
            </Link>
        </View>
    </View>
  )
}

export default DailyMenu