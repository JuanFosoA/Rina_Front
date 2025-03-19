import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .nonempty({ message: "El email no puede estar vacío" }),
    //.email({ message: "Debe ser un correo válido" }),

  password: z
    .string()
    .nonempty({ message: "La contraseña no puede estar vacía" })
    .min(3, { message: "El campo debe tener mínimo 5 caracteres" })
    .max(50, { message: "El campo debe tener máximo 50 caracteres" }),

  remember: z.boolean().optional(),
});

export const registerSchema = z.object({
  name: z
    .string()
    .nonempty({ message: "El nombre no puede estar vacío" })
    .min(5, { message: "El nombre debe tener mínimo 5 caracteres" })
    .max(50, { message: "El nombre debe tener máximo 50 caracteres" }),

  email: z
    .string()
    .nonempty({ message: "El email no puede estar vacío" })
    .email({ message: "Debe ser un correo válido" }),

  user: z
    .string()
    .nonempty({ message: "El usuario no puede estar vacío" })
    .min(5, { message: "El usuario debe tener mínimo 5 caracteres" })
    .max(50, { message: "El usuario debe tener máximo 50 caracteres" }),

  password: z
    .string()
    .nonempty({ message: "La contraseña no puede estar vacía" })
    .min(5, { message: "El campo debe tener mínimo 5 caracteres" })
    .max(50, { message: "El campo debe tener máximo 50 caracteres" }),
});
