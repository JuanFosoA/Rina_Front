import { Image, Pressable, ImageSourcePropType } from 'react-native'
import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from "expo-router";

type Props = {
  headerIcon: ImageSourcePropType;
}

const UserProfileButton = ({headerIcon}: Props) => {
  const navigation = useNavigation();
  return (
    <Pressable 
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      className="w-16 h-16 rounded-full overflow-hidden m-1"
    >
      <Image source={headerIcon } className="w-full h-full" />
    </Pressable>
  )
}

export default UserProfileButton