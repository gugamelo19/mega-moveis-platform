import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

type Params = {
  token: string;
  id: string;
};

export async function getCategoryById({ token, id }: Params) {
  return api<Category>(`/categories/admin/${id}`, {
    method: "GET",
    token,
  });
}
