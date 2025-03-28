import React from "react";
import { View, TextInput, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../validations/schemas";
import { authStyles } from "../../components/tokens";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { login } from "../../server/auth.server";
import { useAuth } from "../../context/AuthContext";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginModule() {
  const { login_AuthContext, isLoggingIn  } = useAuth();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      const response = await login(data.email, data.password);
      const token = response.token;
      if (typeof token === "string") {
        await AsyncStorage.setItem("@myToken", token);
        await login_AuthContext(token);
      } else {
        throw new Error("Token inválido o no recibido");
      }
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Error desconocido");
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
            placeholder="username"
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
        {isLoggingIn ? (
          <ActivityIndicator size="small" color="#fff" />
            ) : (
          <Text className={authStyles.buttonText}>Iniciar Sesión</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}