import React, { useEffect, useState } from 'react';
import { FlatList, View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import MenuCard from '../molecules/MenuCard';
import { getMenu } from '../../server/menu.server';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'expo-router';

export default function Gallery() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userToken } = useAuth();
  const router = useRouter();

const handlePress = (id: string) => {
  router.push(`(menu)/${id}`);
};

  useEffect(() => {
  const fetchData = async () => {
    try {
      const res = await getMenu(userToken);
      if (res.error) {
        setError(res.error);
        return;
      }

      const menuArray = Object.entries(res.data).map(([dia, comidas]) => ({
        id: dia,
        dia,
        ...(typeof comidas === 'object' && comidas !== null ? comidas : {}),
      }));

      setData(menuArray);
    } catch (err) {
      console.error('Error al obtener menú:', err);
      setError("Hubo un problema al obtener el menú.");
    } finally {
      setLoading(false);
    }
  };
  fetchData();
}, [userToken]);


  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MenuCard item={item} onPress={() => handlePress(item.id)} />
        )}
        contentContainerStyle={{ paddingBottom: 16 }}
        style={{ flex: 1 }}
/>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});
