import { View, StyleSheet } from 'react-native'
import React from 'react'
import CreateMenu from '../../../components/atoms/CreateMenu'
import Gallery from '../../../components/organism/MenuGallery'

const saved = () => {
  return (
    <View style={styles.container}>
       <Gallery />
      <CreateMenu/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1  },
});

export default saved