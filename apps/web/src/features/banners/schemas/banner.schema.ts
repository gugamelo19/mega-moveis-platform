import { z } from "zod";

export const bannerSchema = z.object({
  title: z
    .string()
    .min(2, "O titulo deve ter pelo menos 2 caracteres")
    .max(150, "O titulo deve ter no maximo 150 caracteres"),
  subtitle: z
    .string()
    .max(255, "O subtitulo deve ter no maximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  imageUrl: z
    .string()
    .min(1, "A URL da imagem e obrigatoria")
    .max(255, "A URL da imagem deve ter no maximo 255 caracteres"),
  linkUrl: z
    .string()
    .max(255, "O link deve ter no maximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
  sortOrder: z.coerce
    .number()
    .int("A ordem deve ser um numero inteiro")
    .min(0, "A ordem nao pode ser negativa"),
});

export type BannerFormInput = z.input<typeof bannerSchema>;
export type BannerFormData = z.output<typeof bannerSchema>;
