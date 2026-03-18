import { api } from "@/lib/api";
import type { Brand } from "../types/brand.type";

type GetAdminBrandsParams = {
  token: string;
  search?: string;
};

export async function getAdminBrands({ token, search }: GetAdminBrandsParams) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  const path = queryString ? `/brands/admin?${queryString}` : "/brands/admin";

  return api<Brand[]>(path, {
    method: "GET",
    token,
  });
}
