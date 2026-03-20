import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

export async function getPublicCategories() {
  return api<Category[]>("/categories", {
    method: "GET",
  });
}
