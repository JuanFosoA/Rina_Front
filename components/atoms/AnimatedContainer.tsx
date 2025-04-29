import Animated from 'react-native-reanimated';
import React, { ReactNode } from 'react';
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('screen');
const ITEM_WIDTH = width * 0.8;
const ITEM_HEIGHT = ITEM_WIDTH * 0.6;

const styles = StyleSheet.create({
  container: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  },
});

interface AnimatedContainerProps {
  children: ReactNode;
  animatedStyle: any;
}

const AnimatedContainer: React.FC<AnimatedContainerProps> = ({ children, animatedStyle }) => {
  return (
    <Animated.View
      className="bg-white rounded-xl shadow-lg shadow-black/60 justify-center items-center overflow-hidden"
      style={[styles.container, animatedStyle]}
    >
      {children}
    </Animated.View>
  );
};

export default AnimatedContainer;
