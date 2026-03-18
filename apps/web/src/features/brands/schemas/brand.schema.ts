import { z } from "zod";

export const brandSchema = z.object({
  name: z
    .string()
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),
  logoUrl: z
    .string()
    .max(255, "A URL da logo deve ter no máximo 255 caracteres")
    .optional()
    .or(z.literal("")),
  isActive: z.boolean(),
});

export type BrandFormInput = z.input<typeof brandSchema>;
export type BrandFormData = z.output<typeof brandSchema>;
