import React from "react";
import { View, TextInput, Text, Alert, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { registerSchema } from "../../validations/schemas";
import { authStyles } from "../../components/tokens";
import { register } from "../../server/auth.server";
import { useRouter } from 'expo-router';

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterModule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });
  const router = useRouter();
  const onSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.name, data.user, data.email, data.password);
      router.replace('/auth/login');
    } catch (error) {
      Alert.alert("Error", error instanceof Error ? error.message : "Error desconocido");
    }
  };

  return (
    <View className={authStyles.container}>
      <Text className={authStyles.title}>Registro</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput className={authStyles.input} placeholder="Nombre" onChangeText={onChange} value={value} />
        )}
      />
      {errors.name && <Text className={authStyles.errorText}>{errors.name.message}</Text>}
      
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput className={authStyles.input} placeholder="Correo" onChangeText={onChange} value={value} keyboardType="email-address" />
        )}
      />
      {errors.email && <Text className={authStyles.errorText}>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="user"
        render={({ field: { onChange, value } }) => (
          <TextInput className={authStyles.input} placeholder="Usuario" onChangeText={onChange} value={value} />
        )}
      />
      {errors.user && <Text className={authStyles.errorText}>{errors.user.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput className={authStyles.input} placeholder="Contraseña" onChangeText={onChange} value={value} secureTextEntry />
        )}
      />
      {errors.password && <Text className={authStyles.errorText}>{errors.password.message}</Text>}


      <TouchableOpacity className={authStyles.button} onPress={handleSubmit(onSubmit)}>
        <Text className={authStyles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
