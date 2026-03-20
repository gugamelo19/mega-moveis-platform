import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

export async function getFeaturedProducts() {
  return api<Product[]>("/products/featured", {
    method: "GET",
  });
}
