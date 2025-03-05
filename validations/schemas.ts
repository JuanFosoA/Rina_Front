import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),

  password: z
    .string({
      required_error: "Mensaje personalizado"
    })
    .min(5, { message: "el campo debe tener minimo 5 caracteres" })
    .max(50, { message: "el campo debe tener minimo 50 caracteres" }),

  remember: z.boolean().optional(),
});

export const RegisterSchema = z.object({
  name: z
    .string()
    .min(5, { message: "el campo debe tener minimo 5 caracteres" })
    .max(50, { message: "el campo debe tener minimo 50 caracteres" }),
  email: z.string().email(),
  user: z
    .string()
    .min(5, { message: "el campo debe tener minimo 5 caracteres" })
    .max(50, { message: "el campo debe tener minimo 50 caracteres" }),
  password: z
    .string()
    .min(5, { message: "el campo debe tener minimo 5 caracteres" })
    .max(50, { message: "el campo debe tener minimo 50 caracteres" }),
  confirm_password: z
    .string()
    .min(5, { message: "el campo debe tener minimo 5 caracteres" })
    .max(50, { message: "el campo debe tener minimo 50 caracteres" }),
});
