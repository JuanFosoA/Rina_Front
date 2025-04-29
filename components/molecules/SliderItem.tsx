import { Text, Dimensions } from 'react-native';
import React from 'react';
import { ImageSliderType } from '../../data/SliderData';
import {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import AnimatedContainer from '../atoms/AnimatedContainer';
import SliderImage from '../atoms/SliderImage';

type Props = {
  item: ImageSliderType;
  index: number;
  scrollX: SharedValue<number>;
};

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;

const SliderItem: React.FC<Props> = ({ item, index, scrollX }) => {
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
    <AnimatedContainer animatedStyle={rnAnimatedStyle}>
      <SliderImage source={item.image} />
      <Text className="text-lg font-bold text-white absolute bottom-2 right-2 p-1 rounded">
        {item.title}
      </Text>
    </AnimatedContainer>
  );
};

export default SliderItem;
