import { api } from "@/lib/api";

type DeleteBannerParams = {
  token: string;
  id: string;
};

type DeleteBannerResponse = {
  message: string;
};

export async function deleteBanner({ token, id }: DeleteBannerParams) {
  return api<DeleteBannerResponse>(`/banners/${id}`, {
    method: "DELETE",
    token,
  });
}
