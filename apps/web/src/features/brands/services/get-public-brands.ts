import { api } from "@/lib/api";
import type { Brand } from "../types/brand.type";

export async function getPublicBrands() {
  return api<Brand[]>("/brands", {
    method: "GET",
  });
}
