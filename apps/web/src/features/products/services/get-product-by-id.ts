import { api } from "@/lib/api";
import type { Product } from "../types/product.type";

type Params = {
  token: string;
  id: string;
};

export async function getProductById({ token, id }: Params) {
  return api<Product>(`/products/admin/${id}`, {
    method: "GET",
    token,
  });
}
