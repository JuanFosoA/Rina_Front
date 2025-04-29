import { Text, View } from 'react-native';
import React from 'react';

interface Props {
  label: string;
  isSelected: boolean;
}

const CategoryButton: React.FC<Props> = ({ label, isSelected }) => {
  return (
    <View
      className="mr-4 rounded-lg px-4 py-3 my-4 shadow-black shadow-lg"
      style={{
        backgroundColor: isSelected ? '#EF233C' : '#FFF',
        shadowOpacity: 0.1,
        shadowRadius: 7,
      }}
    >
      <Text style={{ color: isSelected ? '#FFF' : '#000' }}>{label}</Text>
    </View>
  );
};

export default CategoryButton;
