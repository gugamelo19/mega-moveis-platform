import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

export async function getPublicProductBySlug(slug: string) {
  return api<Product>(`/products/slug/${slug}`, {
    method: "GET",
  });
}
