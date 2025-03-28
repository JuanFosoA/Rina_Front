import React, { useState } from 'react';
import { View, Text, TextInput, Button, Image, Alert, ActivityIndicator, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { crearRecetaConImagen } from '../../server/recetas.server';
import { useAuth } from '../../context/AuthContext';
import { Receta, Ingrediente, Cantidad, Instruccion, InformacionNutricional } from '../../server/recetas.server';

const CreateRecipeScreen = () => {
  const { userToken } = useAuth();
  const [loading, setLoading] = useState(false);
  
  const [receta, setReceta] = useState<Omit<Receta, 'id'>>({
    nombre: '',
    tiempoPreparacion: 0,
    porciones: 1,
    ingredientes: [],
    instrucciones: [],
    categorias: [],
    informacionNutricional: undefined,
    imagenNombre: undefined
  });

  const [nuevoIngrediente, setNuevoIngrediente] = useState<Omit<Ingrediente, 'cantidad'> & { cantidad: Partial<Cantidad> }>({
    nombre: '',
    cantidad: {
      valor: 0,
      unidad: 'gramos'
    }
  });

  const [nuevaInstruccion, setNuevaInstruccion] = useState<Omit<Instruccion, 'orden'>>({
    paso: ''
  });

  const [nuevaCategoria, setNuevaCategoria] = useState('');

  const [infoNutricional, setInfoNutricional] = useState<Partial<InformacionNutricional>>({
    calorias: 0,
    proteinas: '0g',
    carbohidratos: '0g',
    grasas: '0g'
  });

  const [imagenUri, setImagenUri] = useState<string | null>(null);

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permisos necesarios', 'Se requiere acceso a la galería');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      setImagenUri(result.assets[0].uri);
    }
  };

  const handleChange = <T extends keyof Omit<Receta, 'id'>>(field: T, value: Omit<Receta, 'id'>[T]) => {
    setReceta(prev => ({ ...prev, [field]: value }));
  };

  const agregarIngrediente = () => {
    if (!nuevoIngrediente.nombre || !nuevoIngrediente.cantidad.valor) {
      Alert.alert('Error', 'Nombre y cantidad son requeridos');
      return;
    }

    const ingredienteCompleto: Ingrediente = {
      nombre: nuevoIngrediente.nombre,
      cantidad: {
        valor: nuevoIngrediente.cantidad.valor || 0,
        unidad: nuevoIngrediente.cantidad.unidad || 'gramos'
      }
    };

    handleChange('ingredientes', [...(receta.ingredientes || []), ingredienteCompleto]);
    setNuevoIngrediente({
      nombre: '',
      cantidad: { valor: 0, unidad: 'gramos' }
    });
  };

  const agregarInstruccion = () => {
    if (!nuevaInstruccion.paso) {
      Alert.alert('Error', 'La descripción del paso es requerida');
      return;
    }

    const instruccionCompleta: Instruccion = {
      ...nuevaInstruccion,
      orden: (receta.instrucciones?.length || 0) + 1
    };

    handleChange('instrucciones', [...(receta.instrucciones || []), instruccionCompleta]);
    setNuevaInstruccion({ paso: '' });
  };

  const agregarCategoria = () => {
    if (!nuevaCategoria) {
      Alert.alert('Error', 'La categoría no puede estar vacía');
      return;
    }

    handleChange('categorias', [...(receta.categorias || []), nuevaCategoria]);
    setNuevaCategoria('');
  };

  const actualizarInfoNutricional = <T extends keyof InformacionNutricional>(field: T, value: InformacionNutricional[T]) => {
    setInfoNutricional(prev => ({ ...prev, [field]: value }));
  };

  const enviarReceta = async () => {
    if (!receta.nombre || receta.tiempoPreparacion <= 0) {
      Alert.alert('Error', 'Nombre y tiempo de preparación son requeridos');
      return;
    }

    if (!userToken) {
      Alert.alert('Error', 'Debes iniciar sesión para crear recetas');
      return;
    }

    setLoading(true);

    try {
      const recetaCompleta = {
        ...receta,
        informacionNutricional: infoNutricional as InformacionNutricional
      };

      const response = await crearRecetaConImagen(
        recetaCompleta,
        imagenUri,
        userToken
      );

      if (response.error) {
        Alert.alert('Error', response.error);
      } else if (response.data) {
        Alert.alert('Éxito', 'Receta creada correctamente');
        setReceta({
          nombre: '',
          tiempoPreparacion: 0,
          porciones: 1,
          ingredientes: [],
          instrucciones: [],
          categorias: [],
          informacionNutricional: undefined,
          imagenNombre: undefined
        });
        setImagenUri(null);
        setInfoNutricional({
          calorias: 0,
          proteinas: '0g',
          carbohidratos: '0g',
          grasas: '0g'
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un problema al crear la receta');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="p-4 bg-gray-50">
      <Text className="text-lg font-bold mb-2">Información Básica</Text>
      
      <Text className="text-sm font-medium mb-1">Nombre de la receta*</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-3"
        value={receta.nombre}
        onChangeText={(text) => handleChange('nombre', text)}
        placeholder="Ej: Tacos al pastor"
      />

      <Text className="text-sm font-medium mb-1">Tiempo (minutos)*</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-3"
        value={receta.tiempoPreparacion.toString()}
        onChangeText={(text) => handleChange('tiempoPreparacion', Number(text) || 0)}
        keyboardType="numeric"
      />

      <Text className="text-sm font-medium mb-1">Porciones</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-3"
        value={receta.porciones?.toString() || '1'}
        onChangeText={(text) => handleChange('porciones', Number(text) || 1)}
        keyboardType="numeric"
      />

      <Text className="text-lg font-bold mt-4 mb-2">Imagen</Text>
      <Button title="Seleccionar imagen" onPress={seleccionarImagen} />
      {imagenUri && (
        <Image 
          source={{ uri: imagenUri }} 
          className="w-full h-48 mt-2 rounded" 
          resizeMode="cover"
        />
      )}

      <Text className="text-lg font-bold mt-4 mb-2">Ingredientes</Text>
      <View className="flex-row mb-2 space-x-2">
        <TextInput
          className="flex-1 bg-white p-3 rounded border border-gray-200"
          placeholder="Nombre"
          value={nuevoIngrediente.nombre}
          onChangeText={(text) => setNuevoIngrediente(prev => ({ ...prev, nombre: text }))}
        />
        <TextInput
          className="w-20 bg-white p-3 rounded border border-gray-200"
          placeholder="Cantidad"
          value={nuevoIngrediente.cantidad.valor?.toString() || ''}
          onChangeText={(text) => setNuevoIngrediente(prev => ({
            ...prev,
            cantidad: { ...prev.cantidad, valor: Number(text) || 0 }
          }))}
          keyboardType="numeric"
        />
        <TextInput
          className="w-24 bg-white p-3 rounded border border-gray-200"
          placeholder="Unidad"
          value={nuevoIngrediente.cantidad.unidad}
          onChangeText={(text) => setNuevoIngrediente(prev => ({
            ...prev,
            cantidad: { ...prev.cantidad, unidad: text }
          }))}
        />
      </View>
      <Button title="Agregar Ingrediente" onPress={agregarIngrediente} />

      {receta.ingredientes?.map((ing, index) => (
        <View key={index} className="bg-white p-3 rounded border border-gray-200 mt-2">
          <Text>{ing.nombre} - {ing.cantidad.valor} {ing.cantidad.unidad}</Text>
        </View>
      ))}

      <Text className="text-lg font-bold mt-4 mb-2">Instrucciones</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-2 h-20"
        placeholder="Describe el paso"
        value={nuevaInstruccion.paso}
        onChangeText={(text) => setNuevaInstruccion({ paso: text })}
        multiline
      />
      <Button title="Agregar Instrucción" onPress={agregarInstruccion} />

      {receta.instrucciones?.map((inst, index) => (
        <View key={index} className="bg-white p-3 rounded border border-gray-200 mt-2">
          <Text>{inst.orden}. {inst.paso}</Text>
        </View>
      ))}

      <Text className="text-lg font-bold mt-4 mb-2">Información Nutricional</Text>
      
      <Text className="text-sm font-medium mb-1">Calorías</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-2"
        value={infoNutricional.calorias?.toString() || '0'}
        onChangeText={(text) => actualizarInfoNutricional('calorias', Number(text) || 0)}
        keyboardType="numeric"
      />

      <Text className="text-sm font-medium mb-1">Proteínas</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-2"
        value={infoNutricional.proteinas}
        onChangeText={(text) => actualizarInfoNutricional('proteinas', text)}
      />

      <Text className="text-sm font-medium mb-1">Carbohidratos</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-2"
        value={infoNutricional.carbohidratos}
        onChangeText={(text) => actualizarInfoNutricional('carbohidratos', text)}
      />

      <Text className="text-sm font-medium mb-1">Grasas</Text>
      <TextInput
        className="bg-white p-3 rounded border border-gray-200 mb-3"
        value={infoNutricional.grasas}
        onChangeText={(text) => actualizarInfoNutricional('grasas', text)}
      />

      <Text className="text-lg font-bold mt-4 mb-2">Categorías</Text>
      <View className="flex-row mb-2 space-x-2">
        <TextInput
          className="flex-1 bg-white p-3 rounded border border-gray-200"
          placeholder="Ej: Mexicana"
          value={nuevaCategoria}
          onChangeText={setNuevaCategoria}
        />
        <Button title="Agregar" onPress={agregarCategoria} />
      </View>

      {receta.categorias?.map((cat, index) => (
        <View key={index} className="bg-white p-3 rounded border border-gray-200 mt-2">
          <Text>{cat}</Text>
        </View>
      ))}

      <View className="my-6">
        {loading ? (
          <ActivityIndicator size="large" color="#3b82f6" />
        ) : (
          <Button 
            title="Crear Receta" 
            onPress={enviarReceta}
            disabled={!receta.nombre || receta.tiempoPreparacion <= 0}
          />
        )}
      </View>
    </ScrollView>
  );
};

export default CreateRecipeScreen;