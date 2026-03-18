import { api } from "@/lib/api";
import type { CategoryFormData } from "../schemas/category.schema";
import type { Category } from "../types/category.type";

type CreateCategoryParams = {
  token: string;
  data: CategoryFormData;
};

export async function createCategory({ token, data }: CreateCategoryParams) {
  return api<Category>("/categories", {
    method: "POST",
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
