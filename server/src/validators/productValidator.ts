import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  description: z.string().min(2, "Descrição muito curta"),
  category: z.string().min(2, "Categoria inválida"),
  price: z.number().min(1, "Preço inválido"),
  image: z.string().min(2, "Link da imagem inválido"),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;
