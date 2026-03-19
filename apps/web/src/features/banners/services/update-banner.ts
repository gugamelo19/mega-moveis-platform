import type { BannerFormData } from "../schemas/banner.schema";
import type { Banner } from "../types/banner.type";
import { api } from "@/lib/api";

type UpdateBannerParams = {
  token: string;
  id: string;
  data: BannerFormData;
};

export async function updateBanner({
  token,
  id,
  data,
}: UpdateBannerParams) {
  return api<Banner>(`/banners/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify(data),
  });
}
