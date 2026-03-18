import { api } from "@/lib/api";
import type { ProductFormData } from "../schemas/product.schema";
import type { Product } from "../types/product.type";

type CreateProductParams = {
  token: string;
  data: ProductFormData;
};

export async function createProduct({ token, data }: CreateProductParams) {
  return api<Product>("/products", {
    method: "POST",
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
