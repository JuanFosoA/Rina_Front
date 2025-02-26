import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'

const Search = () => {
  const [changeColor, setChangeColor] = useState(false)

  const handlePress = () => {
    setChangeColor(!changeColor)
  }

  return (
    <View className={changeColor ? 'bg-slate-400' : 'bg-slate-100'} style={{marginTop: 30}}>
      <Text style={changeColor && styles.changeTextColor} className='text-orange-600 text-2xl mb-10'>Profile</Text>
      <Pressable onPress={handlePress}>
        <Text className='bg-slate-400 text-red-500 font-semibold p-5 rounded-lg'>Change Color</Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create(
  {
    changeTextColor: {
      color: 'red'
    },
  }
)

export default Search