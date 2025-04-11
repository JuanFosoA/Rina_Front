import { View, Text, Image, ActivityIndicator, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { Receta } from "../../server/recetas.server";
import { getRecetaById } from "../../server/recetas.server";
import { apiFast } from "../../server/token";

const RecipeDetail = () => {
  const { id } = useLocalSearchParams();
  const { userToken } = useAuth();
  const [receta, setReceta] = useState<Receta | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    
    const fetchReceta = async () => {
      try {
        if (!userToken) throw new Error('No autenticado');
        
        setLoading(true);
        const response = await getRecetaById(id as string, userToken);
        
        if (response.error) throw new Error(response.error);
        if (!response.data) throw new Error('Receta no encontrada');
        
        setReceta(response.data);
        
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchReceta();
  }, [id, userToken]);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#ff7514" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  if (!receta) {
    return (
      <View style={styles.container}>
        <Text>Receta no encontrada</Text>
      </View>
    );
  }

  return (
    <View className="bg-red-400 h-full">
      <View className="bg-white flex-1 rounded-tr-[56px] rounded-tl-[56px] mt-60 items-center">
        <View className="bg-red-600 h-[300px] w-[300px] absolute -top-[150px] rounded-2xl">
          {receta.imagenNombre ? (<Image
            source={{ uri: `${apiFast}uploads/${receta.imagenNombre}` }}
            className="w-full h-full rounded-2xl"
            resizeMode="cover"
          />): (
            <View className="flex-1 justify-center items-center">
                <FontAwesome name="cutlery" size={32} color="#ccc" />
                <Text className="text-gray-400 mt-2">Sin imagen</Text>
            </View>
        )}
        </View>
        <View className="mt-52 justify-center items-center">
          <Text className="text-2xl font-bold mb-4">{receta.nombre}</Text>
          <Text>Porciones: {receta.porciones}</Text>
          <Text>Tiempo: {receta.tiempoPreparacion}</Text>
          <Text>Ingredientes: {receta.tiempoPreparacion}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default RecipeDetail;