import { number, z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  number: z.string().min(2, "Número muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha muito curta"),
});

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),
  number: z.string().min(2).optional(),
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});

export const signInUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Senha muito curta"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type UpdateUserInput = z.infer<typeof updateUserSchema>;
export type SignInInput = z.infer<typeof signInUserSchema>;
