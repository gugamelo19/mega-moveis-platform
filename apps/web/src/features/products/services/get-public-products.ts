import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

type GetPublicProductsParams = {
  search?: string;
  categoryId?: string;
  brandId?: string;
};

export async function getPublicProducts(params?: GetPublicProductsParams) {
  const searchParams = new URLSearchParams();

  if (params?.search) {
    searchParams.set("search", params.search);
  }

  if (params?.categoryId) {
    searchParams.set("categoryId", params.categoryId);
  }

  if (params?.brandId) {
    searchParams.set("brandId", params.brandId);
  }

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";

  return api<Product[]>(endpoint, {
    method: "GET",
  });
}
