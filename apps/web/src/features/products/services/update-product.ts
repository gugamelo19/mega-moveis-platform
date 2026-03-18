import { api } from "@/lib/api";
import type { Product } from "../types/product.type";
import type { ProductFormData } from "../schemas/product.schema";

type UpdateProductParams = {
  token: string;
  id: string;
  data: ProductFormData;
};

export async function updateProduct({ token, id, data }: UpdateProductParams) {
  return api<Product>(`/products/${id}`, {
    method: "PATCH",
    token,
    body: JSON.stringify({
      name: data.name,
      shortDescription: data.shortDescription || undefined,
      description: data.description,
      price: data.price,
      compareAtPrice:
        typeof data.compareAtPrice === "number" &&
        !Number.isNaN(data.compareAtPrice)
          ? data.compareAtPrice
          : undefined,
      sku: data.sku || undefined,
      isAvailable: data.isAvailable,
      isFeatured: data.isFeatured,
      isOnSale: data.isOnSale,
      categoryId: data.categoryId,
      brandId: data.brandId,
    }),
  });
}
