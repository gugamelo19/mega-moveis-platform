import { api } from "@/lib/api";

type Params = {
  token: string;
  imageId: string;
};

export async function deleteProductImage({ token, imageId }: Params) {
  return api<{ message: string }>(`/uploads/product-image/${imageId}`, {
    method: "DELETE",
    token,
  });
}
