import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface SliderImageProps {
  source: any;
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});

const SliderImage: React.FC<SliderImageProps> = ({ source }) => {
  return <Image source={source} style={styles.image} />;
};

export default SliderImage;
