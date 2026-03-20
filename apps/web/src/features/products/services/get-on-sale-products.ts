import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

export async function getOnSaleProducts() {
  return api<Product[]>("/products/on-sale", {
    method: "GET",
  });
}
