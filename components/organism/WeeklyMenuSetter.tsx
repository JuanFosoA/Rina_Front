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

const WeeklyMenuSetter = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [, setSelectedMenu] = useState(null);

  const menus = [
    { id: 1, name: "Menu 1" },
    { id: 2, name: "Menu 2" },
    { id: 3, name: "Menu 3" },
  ];

  const handleMenuSelect = async (menu: any) => {
    setSelectedMenu(menu);
    setModalVisible(false);

    try {
      const response = await fetch("https://api.example.com/weekly-menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ menuId: menu.id }),
      });

      if (response.ok) {
        Alert.alert("Éxito", `El menú "${menu.name}" ha sido enviado.`);
      } else {
        Alert.alert("Error", "No se pudo enviar el menú.");
      }
    } catch (error) {
      Alert.alert("Error", "Ocurrió un error al enviar el menú." + error);
    }
  };

  return (
    <View className="justify-center items-center my-4">
      {/* Botón para abrir el modal */}
      <Pressable
        className="flex-row items-center bg-blue-500 px-4 py-2 rounded-lg"
        onPress={() => setModalVisible(true)}
      >
        <Text className="text-white text-lg mr-2">Seleccionar Menú</Text>
        <CalendarHeart color="white" />
      </Pressable>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/20">
          <View className="w-4/5 bg-white rounded-lg p-6">
            <Text className="text-lg font-bold mb-4">Selecciona un Menú</Text>
            <FlatList
              data={menus}
              keyExtractor={(item) => item.id.toString()}
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
};

export default WeeklyMenuSetter;
