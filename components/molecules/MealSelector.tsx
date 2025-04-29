import { useState, useEffect } from 'react';
import { Modal, FlatList, View, Text } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getRecetas } from '../../server/recetas.server';
import MealButton from '../atoms/MealButton';
import PrimaryButton from '../atoms/PrimaryButton';

type MealSelectorProps = {
  day: string;
  mealType: string;
  selectedRecipeId: string;
  onSelect: (day: string, mealType: string, recipeId: string) => void;
};

type Recipe = {
  id: string;
  name: string;
};

export const MealSelector = ({ day, mealType, selectedRecipeId, onSelect }: MealSelectorProps) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const { userToken } = useAuth();

  useEffect(() => {
    const fetchRecipes = async () => {
      if (!modalVisible) return;

      setLoading(true);
      try {
        const response = await getRecetas(userToken);
        if (response.data) {
          const recipeList = response.data.map((receta: { id: string; nombre: string; }) => ({
            id: receta.id,
            name: receta.nombre,
          }));
          setRecipes(recipeList);
        } else {
          console.error('Error al obtener recetas:', response.error);
          setRecipes([]);
        }
      } catch (error) {
        console.error('Error fetching recipes:', error);
        setRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, [modalVisible, userToken]);

  const handleSelect = (recipeId: string) => {
    onSelect(day, mealType, recipeId);
    setModalVisible(false);
  };

  const selectedName = recipes.find(r => r.id === selectedRecipeId)?.name || '';

  return (
    <>
      <MealButton
        label={selectedRecipeId ? selectedName : 'Seleccionar receta'}
        selected={!!selectedRecipeId}
        onPress={() => setModalVisible(true)}
      />

      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-80">
          <View className="bg-white p-4 rounded-lg w-3/4">
            <Text className="text-lg font-bold mb-4 capitalize">Selecciona una receta para {mealType}</Text>

            {loading ? (
              <Text>Cargando recetas...</Text>
            ) : (
              <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <PrimaryButton
                    title={item.name}
                    onPress={() => handleSelect(item.id)}
                    style={{ marginVertical: 4 }}
                  />
                )}
              />
            )}

            <PrimaryButton
              title="Cancelar"
              onPress={() => setModalVisible(false)}
              style={{ marginTop: 10, backgroundColor: '#ccc' }}
            />
          </View>
        </View>
      </Modal>
    </>
  );
};
