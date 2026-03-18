import { api } from "@/lib/api";

type ProductImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

type Params = {
  token: string;
  productId: string;
};

export async function getProductImages({ token, productId }: Params) {
  return api<ProductImage[]>(`/uploads/product-images/${productId}`, {
    method: "GET",
    token,
  });
}
