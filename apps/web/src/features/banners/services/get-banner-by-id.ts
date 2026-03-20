import { api } from "@/lib/api";
import type { Banner } from "../types/banner.type";

type Params = {
  token: string;
  id: string;
};

export async function getBannerById({ token, id }: Params) {
  return api<Banner>(`/banners/admin/${id}`, {
    method: "GET",
    token,
  });
}
