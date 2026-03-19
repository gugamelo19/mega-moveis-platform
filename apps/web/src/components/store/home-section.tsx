import Link from "next/link";
import type { Product } from "@/features/products/types/product.type";
import { ProductGrid } from "./product-grid";

type HomeSectionProps = {
  title: string;
  description: string;
  products: Product[];
};

export function HomeSection({
  title,
  description,
  products,
}: HomeSectionProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">{title}</h2>
          <p className="mt-2 text-sm text-slate-600">{description}</p>
        </div>

        <Link
          href="/products"
          className="text-sm font-medium text-slate-900 transition hover:text-slate-700"
        >
          Ver todos
        </Link>
      </div>

      <ProductGrid products={products} />
    </section>
  );
}