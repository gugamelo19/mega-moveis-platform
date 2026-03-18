import { api } from "@/lib/api";
import type { Brand } from "../types/brand.type";

type Params = {
  token: string;
  id: string;
};

export async function getBrandById({ token, id }: Params) {
  return api<Brand>(`/brands/admin/${id}`, {
    method: "GET",
    token,
  });
}
