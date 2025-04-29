import { View, FlatList } from 'react-native';
import React from 'react';
import { Receta } from '../../server/recetas.server';
import { useFetchRecipes } from '../../hooks/useFetchRecipes';
import LoadingIndicator from '../atoms/LoadingIndicator';
import ErrorMessage from '../atoms/ErrorMessage';
import EmptyRecipes from '../atoms/EmptyRecipes';
import RecipeItemCard from '../molecules/RecipeItemCard';

const RecipeCard = () => {
  const { recetas, loading, error, handleRetry } = useFetchRecipes();

  if (loading) return <LoadingIndicator />;
  if (error) return <ErrorMessage error={error} onRetry={handleRetry} />;
  if (recetas.length === 0) return <EmptyRecipes />;

  return (
    <View className="pb-4">
      <FlatList<Receta>
        data={recetas}
        keyExtractor={(item, index) => item.id ?? `recipe-${index}`}
        renderItem={({ item }) => <RecipeItemCard receta={item} />}
        scrollEnabled={false}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      />
    </View>
  );
};

export default RecipeCard;
