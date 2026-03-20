import type { BannerFormData } from "../schemas/banner.schema";
import type { Banner } from "../types/banner.type";
import { api } from "@/lib/api";

type CreateBannerParams = {
  token: string;
  data: BannerFormData;
};

export async function createBanner({ token, data }: CreateBannerParams) {
  return api<Banner>("/banners", {
    method: "POST",
    token,
    body: JSON.stringify(data),
  });
}
