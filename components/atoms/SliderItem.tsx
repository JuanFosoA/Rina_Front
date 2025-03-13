import { Image, Text, Dimensions, StyleSheet } from "react-native";
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
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

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
    <Animated.View className='bg-white rounded-xl shadow-lg shadow-black/60 justify-center items-center overflow-hidden' style={[styles.itemContainer, rnAnimatedStyle]}>
      <Image source={item.image} style={styles.image} />
      <Text className='text-lg font-bold text-white absolute bottom-2 right-2 p-1 rounded'>{item.title}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});

export default SliderItem;
