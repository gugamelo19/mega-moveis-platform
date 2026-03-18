import { api } from "@/lib/api";
import type { BrandFormData } from "../schemas/brand.schema";
import type { Brand } from "../types/brand.type";

type Params = {
  token: string;
  id: string;
  data: BrandFormData;
};

export async function updateBrand({ token, id, data }: Params) {
  return api<Brand>(`/brands/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({
      name: data.name,
      logoUrl: data.logoUrl || undefined,
      isActive: data.isActive,
    }),
  });
}
