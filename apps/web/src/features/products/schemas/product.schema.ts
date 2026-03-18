import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(150, "O nome deve ter no máximo 150 caracteres"),
  shortDescription: z
    .string()
    .max(255, "A descrição curta deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(1, "A descrição é obrigatória")
    .max(5000, "A descrição deve ter no máximo 5000 caracteres"),
  price: z.coerce.number().min(0, "O preço não pode ser negativo"),
  compareAtPrice: z
    .union([
      z.coerce.number().min(0, "O preço comparativo não pode ser negativo"),
      z.nan(),
    ])
    .optional(),
  sku: z
    .string()
    .max(100, "O SKU deve ter no máximo 100 caracteres")
    .optional()
    .or(z.literal("")),
  isAvailable: z.boolean(),
  isFeatured: z.boolean(),
  isOnSale: z.boolean(),
  categoryId: z.string().min(1, "Selecione uma categoria"),
  brandId: z.string().min(1, "Selecione uma marca"),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormData = z.output<typeof productSchema>;
