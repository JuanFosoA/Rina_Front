import { FlatList, View, StyleSheet } from 'react-native';
import React from 'react';
import MenuCard from '../molecules/MenuCard';
import { useRouter } from 'expo-router';
import { useFetchMenu } from '../../hooks/useFetchMenu';
import MenuLoadingIndicator from '../atoms/MenuLoadingIndicator';
import MenuErrorMessage from '../atoms/MenuErrorMessage';

export default function MenuGallery() {
  const { data, loading, error } = useFetchMenu();
  const router = useRouter();

  const handlePress = (id: string) => {
    router.push(`(menu)/${id}`);
  };

  if (loading) return <MenuLoadingIndicator />;
  if (error) return <MenuErrorMessage error={error} />;

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
});
