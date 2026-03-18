import { api } from "@/lib/api";

type DeleteProductParams = {
  token: string;
  id: string;
};

type DeleteProductResponse = {
  message: string;
};

export async function deleteProduct({ token, id }: DeleteProductParams) {
  return api<DeleteProductResponse>(`/products/${id}`, {
    method: "DELETE",
    token,
  });
}
