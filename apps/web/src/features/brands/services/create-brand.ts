import { api } from "@/lib/api";
import type { BrandFormData } from "../schemas/brand.schema";
import type { Brand } from "../types/brand.type";

type CreateBrandParams = {
  token: string;
  data: BrandFormData;
};

export async function createBrand({ token, data }: CreateBrandParams) {
  return api<Brand>("/brands", {
    method: "POST",
    token,
    body: JSON.stringify({
      name: data.name,
      logoUrl: data.logoUrl || undefined,
      isActive: data.isActive,
    }),
  });
}
