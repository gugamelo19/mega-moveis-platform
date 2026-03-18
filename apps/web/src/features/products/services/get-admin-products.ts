import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

type GetAdminProductsParams = {
  token: string;
  search?: string;
};

export async function getAdminProducts({
  token,
  search,
}: GetAdminProductsParams) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  const path = queryString
    ? `/products/admin?${queryString}`
    : "/products/admin";

  return api<Product[]>(path, {
    method: "GET",
    token,
  });
}
