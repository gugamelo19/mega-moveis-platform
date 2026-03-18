type ProductCategory = {
  id: string;
  name: string;
  slug: string;
};

type ProductBrand = {
  id: string;
  name: string;
  slug: string;
};

type ProductImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string;
  price: string;
  compareAtPrice: string | null;
  sku: string | null;
  isAvailable: boolean;
  isFeatured: boolean;
  isOnSale: boolean;
  categoryId: string;
  brandId: string;
  createdAt: string;
  updatedAt: string;
  category: ProductCategory;
  brand: ProductBrand;
  images: ProductImage[];
};
