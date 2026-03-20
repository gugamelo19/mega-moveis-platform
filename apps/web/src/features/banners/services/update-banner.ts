import { api } from "@/lib/api";
import type { Banner } from "../types/banner.type";
import type { BannerFormData } from "../schemas/banner.schema";

type UpdateBannerParams = {
  token: string;
  id: string;
  data: BannerFormData;
};

export async function updateBanner({ token, id, data }: UpdateBannerParams) {
  return api<Banner>(`/banners/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({
      title: data.title,
      subtitle: data.subtitle || undefined,
      imageUrl: data.imageUrl,
      linkUrl: data.linkUrl || undefined,
      isActive: data.isActive,
      sortOrder: data.sortOrder,
    }),
  });
}
