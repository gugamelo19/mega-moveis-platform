import { api } from "@/lib/api";

type DeleteBrandParams = {
  token: string;
  id: string;
};

type DeleteBrandResponse = {
  message: string;
};

export async function deleteBrand({ token, id }: DeleteBrandParams) {
  return api<DeleteBrandResponse>(`/brands/${id}`, {
    method: "DELETE",
    token,
  });
}
