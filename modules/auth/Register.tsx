import React from "react";
import { View, TextInput, Text, Alert, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RegisterSchema } from "../../validations/schemas";

type RegisterFormData = z.infer<typeof RegisterSchema>;

export default function RegisterModule() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    Alert.alert("Registro Exitoso 🎉", `Nombre: ${data.name}\nUsuario: ${data.user}\nEmail: ${data.email}`);
  };

  return (
    <View className="flex-1 justify-center px-6 bg-gray-100">
      <Text className="text-2xl font-bold text-center mb-4 ">Registro</Text>

      <Text className="text-gray-700 text-xl">Nombre</Text>
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 bg-white h-14 rounded-md text-xl"
            placeholder="Nombre"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.name && <Text className="text-red-500">{errors.name.message}</Text>}

      <Text className="text-gray-700 mt-2 text-xl">Correo</Text>
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 h-14 rounded-md text-xl bg-white"
            placeholder="Correo"
            onChangeText={onChange}
            value={value}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text className="text-red-500">{errors.email.message}</Text>}

      <Text className="text-gray-700 mt-2 text-xl">Usuario</Text>
      <Controller
        control={control}
        name="user"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 h-14 rounded-md text-xl bg-white"
            placeholder="Usuario"
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.user && <Text className="text-red-500">{errors.user.message}</Text>}

      <Text className="text-gray-700 mt-2 text-xl">Contraseña</Text>
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 h-14 rounded-md text-xl bg-white"
            placeholder="Contraseña"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.password && <Text className="text-red-500">{errors.password.message}</Text>}

      <Text className="text-gray-700 mt-2 text-xl">Confirmar Contraseña</Text>
      <Controller
        control={control}
        name="confirm_password"
        render={({ field: { onChange, value } }) => (
          <TextInput
            className="border border-gray-300 p-2 h-14 rounded-md text-xl bg-white"
            placeholder="Confirmar Contraseña"
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
      />
      {errors.confirm_password && <Text className="text-red-500">{errors.confirm_password.message}</Text>}

      <TouchableOpacity className="bg-blue-500 p-3 rounded-md mt-4" onPress={handleSubmit(onSubmit)}>
        <Text className="text-white text-center font-bold text-xl">Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
}
