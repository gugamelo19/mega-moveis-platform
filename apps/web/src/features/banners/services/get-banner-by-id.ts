import { api } from "@/lib/api";
import type { Banner } from "../types/banner.type";

type GetBannerByIdParams = {
  token: string;
  id: string;
};

export async function getBannerById({ token, id }: GetBannerByIdParams) {
  return api<Banner>(`/banners/admin/${id}`, {
    method: "GET",
    token,
  });
}
