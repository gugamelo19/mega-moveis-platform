import { api } from "@/lib/api";
import type { Category } from "../types/category.type";

type GetAdminCategoriesParams = {
  token: string;
  search?: string;
};

export async function getAdminCategories({
  token,
  search,
}: GetAdminCategoriesParams) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  const path = queryString
    ? `/categories/admin?${queryString}`
    : "/categories/admin";

  return api<Category[]>(path, {
    method: "GET",
    token,
  });
}
