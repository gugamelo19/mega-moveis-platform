import { api } from "@/lib/api";
import type { Banner } from "../types/banner.type";

type GetAdminBannersParams = {
  token: string;
  search?: string;
};

export async function getAdminBanners({
  token,
  search,
}: GetAdminBannersParams) {
  const query = new URLSearchParams();

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  const path = queryString ? `/banners/admin?${queryString}` : "/banners/admin";

  return api<Banner[]>(path, {
    method: "GET",
    token,
  });
}
