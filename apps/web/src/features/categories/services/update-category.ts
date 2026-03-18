import { api } from "@/lib/api";
import type { CategoryFormData } from "../schemas/category.schema";
import type { Category } from "../types/category.type";

type Params = {
  token: string;
  id: string;
  data: CategoryFormData;
};

export async function updateCategory({ token, id, data }: Params) {
  return api<Category>(`/categories/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({
      name: data.name,
      description: data.description || undefined,
      imageUrl: data.imageUrl || undefined,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
    }),
  });
}
