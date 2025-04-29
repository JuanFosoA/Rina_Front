import { View, Dimensions } from 'react-native'
import React from 'react'
import {ImageSliderType } from '../../data/SliderData'
import Animated, { useAnimatedScrollHandler, useSharedValue } from 'react-native-reanimated'
import SliderItem from './SliderItem'

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
    <View className='my-2'>
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