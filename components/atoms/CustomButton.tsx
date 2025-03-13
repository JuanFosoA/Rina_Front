import { Text, Pressable } from 'react-native'
import React from 'react'

interface CustonButtonProps {
    color: ''
    text: string
    actionFunction: () => void
}

const CustomButton = ({ color, text, actionFunction}: CustonButtonProps) => {
  return (
    <Pressable className=''>
      <Text>CustomButton</Text>
    </Pressable>
  )
}

export default CustomButton