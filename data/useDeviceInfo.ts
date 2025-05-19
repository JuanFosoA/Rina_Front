import * as Device from 'expo-device';
import * as Application from 'expo-application';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAndroidDeviceId = async (): Promise<string> => {
  const storedId = await AsyncStorage.getItem('@androidDeviceId');
  if (storedId) return storedId;

  const androidId = await Application.getAndroidId(); 
  const hardwareId = [
    Device.brand || 'unknownBrand',
    Device.modelId ||'unknownModel',
    Device.osVersion || 'unknownOS',
    androidId || 'error'
  ].join('|');

  await AsyncStorage.setItem('@androidDeviceId', hardwareId);

  return hardwareId;
};