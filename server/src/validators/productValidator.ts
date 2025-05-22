import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(2, "Nome muito curto"),
  description: z.string().min(2, "Descrição muito curta"),
  category: z.string().min(2, "Categoria inválida"),
  price: z.number().min(1, "Preço inválido"),
  image: z.string().min(2, "Link da imagem inválido"),
});

export const updateProductSchema = z.object({
  name: z.string().min(2, "Nome muito curto").optional(),
  description: z.string().min(2, "Descrição muito curta").optional(),
  category: z.string().min(2, "Categoria inválida").optional(),
  price: z.number().min(1, "Preço inválido").optional(),
  image: z.string().min(2, "Link da imagem inválido").optional(),
});

export type CreateProductInput = z.TypeOf<typeof createProductSchema>;
export type UpdateProductInput = z.TypeOf<typeof updateProductSchema>;