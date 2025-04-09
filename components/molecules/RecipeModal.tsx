import { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Modal, FlatList, View } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { getRecetas } from '../../server/recetas.server';

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
          const recipeList = response.data.map((receta: { id: any; nombre: any; }) => ({
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

  return (
    <>
      <TouchableOpacity
        className={`bg-secondary rounded-full p-4 my-2 ${selectedRecipeId ? 'bg-green-500' : ''}`}
        style={{ width: 120, height: 120, justifyContent: 'center', alignItems: 'center' }} 
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white">
          {selectedRecipeId 
            ? recipes.find(r => r.id === selectedRecipeId)?.name ?? 'Receta seleccionada' 
            : 'Seleccionar receta'}
        </Text>

      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-gray-500 bg-opacity-100">
          <View className="bg-white p-4 rounded-lg w-3/4">
            <Text className="text-lg font-bold mb-4">Selecciona una receta para {mealType}</Text>

            {loading ? (
              <Text>Cargando recetas...</Text>
            ) : (
              <FlatList
                data={recipes}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <TouchableOpacity 
                    className="p-3 border-b border-gray-200"
                    onPress={() => handleSelect(item.id)}
                  >
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            )}

            <TouchableOpacity 
              className="mt-4 p-3 bg-gray-200 rounded"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center">Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};
