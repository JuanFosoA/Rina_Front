import React from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../validations/schemas";

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginModule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    Alert.alert("Inicio de sesión exitoso", `Correo: ${data.email}`);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-4">Iniciar Sesión</Text>

      <Text className="text-gray-700 text-xl">Correo</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 bg-white h-14 rounded-md text-xl"
            placeholder="Correo"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Text className="text-gray-500 mt-2 text-xl">Contraseña</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 rounded-md bg-white h-14 text-xl"
            placeholder="Contraseña"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

      <TouchableOpacity className="bg-blue-500 p-3 rounded-md mt-4 h-14" onPress={handleSubmit(onSubmit)}>
        <Text className="text-white text-center font-bold text-xl">Iniciar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}
