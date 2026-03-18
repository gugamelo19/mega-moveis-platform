import { api } from "@/lib/api";

type DeleteCategoryParams = {
  token: string;
  id: string;
};

type DeleteCategoryResponse = {
  message: string;
};

export async function deleteCategory({ token, id }: DeleteCategoryParams) {
  return api<DeleteCategoryResponse>(`/categories/${id}`, {
    method: "DELETE",
    token,
  });
}
