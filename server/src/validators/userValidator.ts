import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "Senha muito curta"),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
