import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

type GetPublicProductsParams = {
  search?: string;
  categoryId?: string;
  brandId?: string;
  sort?: "newest" | "price_asc" | "price_desc" | "name_asc";
  page?: number;
};

type GetPublicProductsResponse = {
  items: Product[];
  meta: {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
  };
};

export async function getPublicProducts(params?: GetPublicProductsParams) {
  const searchParams = new URLSearchParams();

  if (params?.search) searchParams.set("search", params.search);
  if (params?.categoryId) searchParams.set("categoryId", params.categoryId);
  if (params?.brandId) searchParams.set("brandId", params.brandId);
  if (params?.sort) searchParams.set("sort", params.sort);
  if (params?.page) searchParams.set("page", String(params.page));

  const queryString = searchParams.toString();
  const endpoint = queryString ? `/products?${queryString}` : "/products";

  return api<GetPublicProductsResponse>(endpoint, {
    method: "GET",
  });
}
