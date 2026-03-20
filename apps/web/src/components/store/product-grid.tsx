import type { Product } from "@/features/products/types/product.type";
import { ProductCard } from "./product-card";

type Props = {
  products: Product[];
};

export function ProductGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="text-center text-sm text-(--mm-text-soft)">
        Nenhum produto disponível.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}