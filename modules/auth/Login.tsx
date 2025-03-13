import React from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../validations/schemas";
import { authStyles } from "../../components/tokens";
import AsyncStorage from "@react-native-async-storage/async-storage"; 

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginModule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    //AQUI HICE AJUSTES PA HACER LA SIMULACIÓN
    if (data.email === "test@example.com" && data.password === "123456") { 
      const fakeToken = "fake-jwt-token-12345";

      try {
        await AsyncStorage.setItem("@myToken", fakeToken); 
        const token = await AsyncStorage.getItem('@myToken')
        console.log("Token almacenado:", token);
      
      } catch (error) {
        console.error("Error guardando el token:", error); 
      }
    } else {
      Alert.alert("Credenciales incorrectas");
    }
  };

  return (
    <View className={authStyles.container}>
      <Text className={authStyles.title}>Iniciar Sesión</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={authStyles.input}
            placeholder="Correo"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text className={authStyles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className={authStyles.input}
            placeholder="Contraseña"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text className={authStyles.errorText}>{errors.password.message}</Text>}

      <TouchableOpacity className={authStyles.button} onPress={handleSubmit(onSubmit)}>
        <Text className={authStyles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
