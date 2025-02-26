import { View, Text, StyleSheet, Pressable, ScrollView, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import SearchMenu from '../../../modules/tabs/SearchMenu'

const Search = () => {

  return (
    <SafeAreaView style={{flex:1}}>
      <ScrollView>
        <SearchMenu image={require("../../../assets/cubano.webp")}/>
      </ScrollView>
    </SafeAreaView>

  )
}


export default Search