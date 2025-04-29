import { View, StyleSheet } from 'react-native'
import React from 'react'
import MenuCreator from '../../components/organism/MenuCreator';

const menu = () => {
  return (
    <View style={styles.container}>
      <MenuCreator/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1  },
});

export default menu