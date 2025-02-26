import { Image, View, Text, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { ImageSliderType } from "../../data/SliderData";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;

const SliderItem = ({ item, index, scrollX }: Props) => {
  const rnAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [0.9, 1, 0.9],
      Extrapolation.CLAMP
    );

    const opacity = interpolate(
      scrollX.value,
      [(index - 1) * ITEM_WIDTH, index * ITEM_WIDTH, (index + 1) * ITEM_WIDTH],
      [0.6, 1, 0.6], 
      Extrapolation.CLAMP
    );

    return { transform: [{ scale }], opacity };
  });

  return (
    <Animated.View className='bg-white rounded-xl shadow-lg shadow-black/60 justify-center items-center p-4 gap-2' style={[styles.itemContainer, rnAnimatedStyle]}>
      <Image source={item.image} className='w-[270px] h-[180px] rounded-lg' />
      <Text className='text-lg font-bold text-center'>{item.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH
  }
});

export default SliderItem;
