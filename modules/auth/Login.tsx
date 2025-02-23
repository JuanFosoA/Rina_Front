import React from "react";
import { View, TextInput, Text, TouchableOpacity, Alert } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { loginSchema } from "../../validations/schemas";
import { authStyles } from "../../components/tokens";

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
    <View className={authStyles.container}>
      <Text className={authStyles.title}>Iniciar Sesión</Text>

      <Text className={authStyles.label}>Correo</Text>
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

      <Text className={authStyles.label}>Contraseña</Text>
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
