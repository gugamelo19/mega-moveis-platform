import { z } from "zod";

export const categorySchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(255, "A descrição deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  imageUrl: z
    .string()
    .max(255, "A URL da imagem deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  sortOrder: z.coerce
    .number()
    .int("A ordem deve ser um número inteiro")
    .min(0, "A ordem não pode ser negativa"),
});

export type CategoryFormInput = z.input<typeof categorySchema>;
export type CategoryFormData = z.output<typeof categorySchema>;
