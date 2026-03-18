import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

export async function getPublicProducts() {
  return api<Product[]>("/products", {
    method: "GET",
  });
}
