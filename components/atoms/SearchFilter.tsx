import { View, TextInput } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

type Props = {
    icon: keyof typeof FontAwesome.glyphMap;
    placeholder: string
}

const SearchFilter = ({ icon, placeholder}: Props) => {
  return (
    <View 
        className='bg-white flex-row py-2 rounded-lg items-center px-4 my-4 mx-6 shadow-black shadow-lg'
        style={{shadowOpacity: 0.1, shadowRadius: 7}}
    >
      <FontAwesome name={icon} size={20} color='#f96163'/>
      <TextInput className='px-2 text-base text-gray-500' placeholder={placeholder}></TextInput>
      
    </View>
  )
}

export default SearchFilter