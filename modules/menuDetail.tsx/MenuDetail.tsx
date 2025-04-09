import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useAuth } from "../../context/AuthContext";
import { getMenuById, getListaMenu } from "../../server/menu.server";
import { fetchRecipeById } from "../../server/recipe.server";

interface Cantidad {
  valor: number;
  unidad: string;
}

interface IngredienteCompra {
  nombre: string;
  cantidad: Cantidad;
}

interface Receta {
  id: string;
  nombre: string;
  imagenNombre: string | null;
  categorias: string[];
  porciones: number;
  tiempoPreparacion: number;
  informacionNutricional: {
    calorias: number;
    carbohidratos: string;
    grasas: string;
    proteinas: string;
  };
  ingredientes: {
    nombre: string;
    cantidad: Cantidad;
  }[];
  instrucciones: {
    orden: number;
    paso: string;
  }[];
}

interface Menu {
  [dia: string]: {
    [comida: string]: string;
  };
}

const MenuDetail: React.FC = () => {
  const params = useLocalSearchParams();
  const id = params.id as string;
  const { userToken } = useAuth();
  const [menu, setMenu] = useState<Menu | null>(null);
  const [loading, setLoading] = useState(true);
  const [recipes, setRecipes] = useState<Record<string, Receta>>({});
  const [listaCompras, setListaCompras] = useState<IngredienteCompra[] | null>(null);

  useEffect(() => {
  const loadMenu = async () => {
    try {
      const menuResponse = await getMenuById(id, userToken);

      if (!menuResponse || !menuResponse.data || !menuResponse.data.dias) {
        console.error("Formato de menú inválido:", menuResponse);
        return;
      }

      const menuData = menuResponse.data.dias as Menu;
      setMenu(menuData);

      const allIds = Object.values(menuData)
        .flatMap((comidas) => Object.values(comidas))
        .filter((recetaId): recetaId is string => typeof recetaId === 'string');

      const uniqueIds = Array.from(new Set(allIds));

      const recetasData = await Promise.all(
        uniqueIds.map(async (recetaId) => {
          const receta = await fetchRecipeById(recetaId, userToken);
          return receta as unknown as Receta;
        })
      );

      const recetaMap: Record<string, Receta> = {};
      recetasData.forEach((receta) => {
        recetaMap[receta.id] = receta;
      });

      setRecipes(recetaMap);

      const listaResponse = await getListaMenu(menuData, userToken);

      if (listaResponse.data) {
        setListaCompras(listaResponse.data);
      } else {
        console.error("Error en lista de compras:", listaResponse.error);
      }

    } catch (err) {
      console.error("Error cargando menú:", err);
    } finally {
      setLoading(false);
    }
  };

  loadMenu();
}, [id, userToken]);



  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <ScrollView className="bg-white h-full">
      <View className="p-6">
        <Text className="text-2xl font-bold mb-4 text-center">Detalle del Menú</Text>

        {menu &&
          Object.entries(menu).map(([dia, comidas]) => (
            <View key={dia} className="mb-6">
              <Text className="text-xl font-semibold capitalize mb-2">{dia}</Text>
              {Object.entries(comidas).map(([tipoComida, recetaId]) => {
                const receta = recipes[recetaId];
                return receta ? (
                  <View key={tipoComida} className="mb-4 bg-quaternary rounded-lg p-3">
                    <Text className="text-base font-bold">{receta.nombre}</Text>
                  </View>
                ) : (
                  <Text key={tipoComida} className="text-red-500">Sin receta para {tipoComida}</Text>
                );
              })}
            </View>
          ))}

        {listaCompras && (
          <View className="mt-8">
            <Text className="text-xl font-bold mb-2">Lista de Compras</Text>
            {listaCompras.map((item, index) => (
              <Text key={index}>- {item.nombre}: {item.cantidad.valor} {item.cantidad.unidad}</Text>
            ))}
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default MenuDetail;
