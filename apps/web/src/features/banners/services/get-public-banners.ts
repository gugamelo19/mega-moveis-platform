import { api } from "@/lib/api";
import type { Banner } from "../types/banner.type";

export async function getPublicBanners() {
  return api<Banner[]>("/banners", {
    method: "GET",
  });
}
