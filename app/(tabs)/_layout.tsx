import { View, Text } from 'react-native'
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import "../../global.css";
import { Tabs } from 'expo-router';

const TabLayout = () => {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue' }}>
        <Tabs.Screen 
          name="index" 
          options={{title: 'Home',
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="home" color={color} />,
                    headerShown: false}}
        />
        <Tabs.Screen
          name="search" 
          options={{title: 'Search',
                    tabBarIcon: ({ color }) => <FontAwesome size={24} name="search" color={color} />,
                    headerShown: false}}
        />
        <Tabs.Screen
          name="saved" 
          options={{title: 'My menus',
                    headerShown: false}}
        />
  
    </Tabs>
  )
}

export default TabLayout