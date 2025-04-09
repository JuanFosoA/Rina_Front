import { SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ProfileMenu from '../../../modules/profile/ProfileMenu'

const profile = () => {
  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <ProfileMenu />
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile