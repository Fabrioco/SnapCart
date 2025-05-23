import { z } from "zod";

export const createAddressSchema = z.object({
  street: z.string().min(2, "Rua muito curta"),
  number: z.number().min(1, "Núúmero inválido"),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido"),
  city: z.string().min(2, "Cidade muito curta"),
  state: z.string().min(2, "Estado muito curto"),
  country: z.string().min(2, "País muito curto"),
  type: z.string().min(2, "Tipo de endereço inválido").optional(),
});

export const updateAddressSchema = z.object({
  street: z.string().min(2, "Rua muito curta").optional(),
  number: z.number().min(1, "Núúmero inválido").optional(),
  cep: z.string().regex(/^\d{5}-\d{3}$/, "CEP inválido").optional(),
  city: z.string().min(2, "Cidade muito curta").optional(),
  state: z.string().min(2, "Estado muito curto").optional(),
  country: z.string().min(2, "País muito curto").optional(),
  type: z.string().min(2, "Tipo de endereço inválido").optional(),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;