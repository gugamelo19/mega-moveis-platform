import { z } from "zod";

export const bannerSchema = z.object({
  title: z
    .string()
    .min(2, "O título deve ter pelo menos 2 caracteres")
    .max(120, "O título deve ter no máximo 120 caracteres"),
  subtitle: z
    .string()
    .max(255, "O subtítulo deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  imageUrl: z
    .string()
    .min(1, "A imagem é obrigatória")
    .max(255, "A URL da imagem deve ter no máximo 255 caracteres"),
  linkUrl: z
    .string()
    .max(255, "O link deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  sortOrder: z.coerce
    .number()
    .int("A ordem deve ser um número inteiro")
    .min(0, "A ordem não pode ser negativa"),
});

export type BannerFormInput = z.input<typeof bannerSchema>;
export type BannerFormData = z.output<typeof bannerSchema>;
