import { ScrollView, View } from 'react-native';
import React from 'react';
import { FoodCategory } from '../../data/CategoriesData';
import CategoryButton from '../atoms/CategoryButton';

const CategoriesFilter = () => {
  return (
    <View className="mx-5">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {FoodCategory.map((category, index) => (
          <CategoryButton
            key={category.id}
            label={category.category}
            isSelected={index === 0}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesFilter;
