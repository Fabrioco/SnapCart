import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  description: z.string().min(2, "Descrição muito curta"),
  price: z.number().min(1, "Preço inválido"),
  quantity: z.number().min(1, "Quantidade inválida"),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;
