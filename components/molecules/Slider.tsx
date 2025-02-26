import { FlatList, Image, View, Text, Dimensions } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import {ImageSliderType } from '../../data/SliderData'
import SliderItem from '../atoms/SliderItem'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'

type Props = {
  itemList : ImageSliderType[] 
}

const {width} = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const SPACING = (width - ITEM_WIDTH) / 2;

const Slider = ({itemList} : Props) => {
  const scrollX = useSharedValue(0);

  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollX.value = e.contentOffset.x;
    } 
  })

  return (
    <View>
      <Animated.FlatList 
          data={itemList} 
          renderItem={({item, index}) => (
            <SliderItem item={item} index={index} scrollX={scrollX}/>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled={false}
          snapToInterval={ITEM_WIDTH}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: SPACING }}
          onScroll={onScrollHandler}
      />
    </View>
  )
}

export default Slider