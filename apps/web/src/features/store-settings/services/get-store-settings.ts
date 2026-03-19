import { api } from "@/lib/api";
import type { StoreSettings } from "../types/store-settings.type";

export async function getStoreSettings() {
  return api<StoreSettings>("/store-settings", {
    method: "GET",
  });
}
