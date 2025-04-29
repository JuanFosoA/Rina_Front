import { View, Text, Pressable, Image } from 'react-native';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { Receta } from '../../server/recetas.server';

interface RecipeItemCardProps {
  receta: Receta;
}

const RecipeItemCard: React.FC<RecipeItemCardProps> = ({ receta }) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(`/recipe/${receta.id}`)}
      className="bg-white shadow-sm rounded-xl my-2 mx-4 items-center py-4 px-2"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 2,
      }}
    >
      <View className="w-32 h-32 rounded-lg bg-gray-100 justify-center items-center mb-2 overflow-hidden">
        {receta.imagenNombre ? (
          <Image
            source={{ uri: receta.imagenNombre }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
            onError={() => console.log('Error cargando imagen:', receta.imagenNombre)}
          />
        ) : (
          <View className="flex-1 justify-center items-center">
            <FontAwesome name="cutlery" size={32} color="#ccc" />
            <Text className="text-gray-400 mt-2">Sin imagen</Text>
          </View>
        )}
      </View>
      <Text className="text-lg font-semibold text-center mt-1 px-2" numberOfLines={1}>
        {receta.nombre}
      </Text>
      <View className="flex-row items-center mt-1">
        <FontAwesome name="clock-o" size={14} color="#666" />
        <Text className="text-gray-600 ml-1">
          {receta.tiempoPreparacion} min
        </Text>
      </View>
      {receta.categorias?.length > 0 && (
        <View className="flex-row flex-wrap justify-center mt-2">
          {receta.categorias.slice(0, 2).map((categoria, index) => (
            <View
              key={`${receta.id ?? 'no-id'}-${index}`}
              className="bg-orange-100 px-2 py-1 rounded-full mx-1 mb-1"
            >
              <Text className="text-xs text-orange-800">{categoria}</Text>
            </View>
          ))}
        </View>
      )}
    </Pressable>
  );
};

export default RecipeItemCard;
