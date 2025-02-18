import { View, Text, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'

const Login = () => {

    const [otro, setOtro] = useState('')

    const onSendInfo = () => {
        fetch('')
        .then()
    }

  return (
    <View>
      <View>
      <Text>Login</Text>
      <TextInput 
        placeholder='Login'
        secureTextEntry={true}
      />
      </View>
      <View>
      <Text>Otro</Text>
      <TextInput 
        placeholder='otro'
       onChangeText={setOtro}
      />
      </View>
      <Pressable onPress={onSendInfo}>

      </Pressable>
    </View>
  )
}

export default Login