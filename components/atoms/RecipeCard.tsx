import { Image, View, Text, FlatList, Pressable, ActivityIndicator, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { getRecetas } from '../../server/recetas.server';
import { Receta } from '../../server/recetas.server';
import { recetasData } from '../../server/token';

const RecipeCard = () => {
    const router = useRouter();
    const { userToken } = useAuth();
    const [recetas, setRecetas] = useState<Receta[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                if (!userToken) throw new Error('No autenticado');
                setLoading(true);
                const response = await getRecetas(userToken);
                if (response.error) throw new Error(response.error);
                if (response.data) setRecetas(response.data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Error desconocido');
            } finally {
                setLoading(false);
            }
        };
        fetchRecipes();
    }, [userToken]);

    if (loading) return (
        <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" color="#ff7514" />
        </View>
    );

    if (error) return (
        <View className="flex-1 justify-center items-center p-4">
            <Text className="text-red-500 text-center mb-4">Error: {error}</Text>
        </View>
    );

    if (recetas.length === 0) return (
        <View className="flex-1 justify-center items-center p-4">
            <Text className="text-gray-500 text-lg">No hay recetas disponibles</Text>
        </View>
    );

    return (
        <View className="pb-4">
            <FlatList<Receta>
                data={recetas}
                keyExtractor={(item, index) => item.id ?? index.toString()}
                renderItem={({ item }) => (
                    <Pressable
                        onPress={() => router.push(`/recipe/${item.id}`)} 
                        className="bg-white shadow-sm rounded-xl my-2 mx-4 items-center py-4 px-2"
                        style={{
                            shadowColor: '#000',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.1,
                            shadowRadius: 3,
                            elevation: 2
                        }}
                    >
                        <View className="w-32 h-32 rounded-lg bg-gray-100 justify-center items-center mb-2">
                            {item.imagenNombre ? (
                                <Image 
                                    source={{ uri: `${recetasData.getImagen}/${item.imagenNombre}` }} 
                                    className="w-full h-full rounded-lg"
                                    resizeMode="cover"
                                />
                            ) : (
                                <Text className="text-gray-400">Sin imagen</Text>
                            )}
                        </View>
                        <Text className="text-lg font-semibold text-center mt-1 px-2" numberOfLines={1}>
                            {item.nombre}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <FontAwesome name="clock-o" size={14} color="#666" />
                            <Text className="text-gray-600 ml-1">
                                {item.tiempoPreparacion} min
                            </Text>
                        </View>
                        {item.categorias && item.categorias.length > 0 && (
                            <View className="flex-row flex-wrap justify-center mt-2">
                                {item.categorias.slice(0, 2).map((categoria, index) => (
                                    <View key={`${item.id ?? 'no-id'}-${index}`} className="bg-orange-100 px-2 py-1 rounded-full mx-1 mb-1">
                                        <Text className="text-xs text-orange-800">{categoria}</Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </Pressable>
                )}
                scrollEnabled={false}
                numColumns={2}
                columnWrapperStyle={{
                    justifyContent: 'space-between'
                }}
                contentContainerStyle={{
                    paddingBottom: 20
                }}
            />
        </View>
    );
};

export default RecipeCard;