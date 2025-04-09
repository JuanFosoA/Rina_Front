import { View, Text, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { authStyles } from '../../components/tokens';
import { Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const Auth = () => {
  return (
    <View className={authStyles.container}>
      <Text className='text-fith text-7xl p-6'>Bienvenido</Text>

      <Image
        source={require('../../assets/anby.jpeg')}
        style={{ width: width * 0.9, height: 200, borderRadius: 10 }}
        resizeMode="contain"
      />
      

      <View className='flex-row space-x-4'>
        <Link href='/auth/login' className={authStyles.button}>
          <Text className={authStyles.buttonText}>login</Text>
        </Link>
        <Link href='/auth/register' className={authStyles.button}>
          <Text className={authStyles.buttonText}>register</Text>
        </Link>
      </View>
    </View>
  );
};

export default Auth;
