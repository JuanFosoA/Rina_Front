import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  Modal,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { CalendarHeart } from "lucide-react-native";
import { useFetchMenu } from "../../../hooks/useFetchMenu";
import { useWeeklyMenuSubmit } from "../hooks/useWeeklyMenuSubmit";

export default function WeeklyMenuSetter() {
  const [modalVisible, setModalVisible] = useState(false);

  const { data, loading, error } = useFetchMenu();

  const { menuId, loading: loadingSubmit, submitMenu, refresh } = useWeeklyMenuSubmit();

  const handleMenuSelect = async (menu: any) => {
    try {
      await submitMenu(menu.id);
      Alert.alert("Éxito", `El menú "${menu.name}" fue guardado`);
      refresh();
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "No se pudo guardar el menú");
    } finally {
      setModalVisible(false);
    }
  };

  if (loading) {
    return (
      <View className="items-center my-4">
        <Text>Cargando menús...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center my-4">
        <Text>Error al cargar menús: {error}</Text>
      </View>
    );
  }

  return (
    <View className="items-center my-4">
      <Pressable
        className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-lg mr-2">
          {loadingSubmit
            ? "Guardando..."
            : menuId
            ? "Cambiar Menú"
            : "Seleccionar Menú"}
        </Text>
        <CalendarHeart color="white" />
      </Pressable>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="w-4/5 bg-white rounded-lg p-6 max-h-96">
            <Text className="text-lg font-bold mb-4">Selecciona un Menú</Text>
            <FlatList
              data={data}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 bg-gray-200 rounded-lg mb-2"
                  onPress={() => handleMenuSelect(item)}
                >
                  <Text className="text-base">{item.name}</Text>
                </TouchableOpacity>
              )}
            />
            <Pressable
              className="mt-4 p-3 bg-red-500 rounded-lg"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white text-center">Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
