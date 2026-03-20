import Link from "next/link";
import type { Product } from "@/features/products/types/product.type";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";
import { ProductGrid } from "./product-grid";

type HomeSectionProps = {
  id?: string;
  title: string;
  eyebrow: string;
  description: string;
  products: Product[];
};

export async function HomeSection({
  id,
  title,
  eyebrow,
  description,
  products,
}: HomeSectionProps) {
  if (products.length === 0) {
    return null;
  }

  const storeSettings = await getPublicStoreSettings();

  return (
    <section id={id} className="bg-(--mm-bg) py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
            {eyebrow}
          </span>

          <h2 className="mt-4 text-5xl font-semibold text-(--mm-text)">
            {title}
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-7 text-(--mm-text-soft)">
            {description}
          </p>
        </div>

        <ProductGrid
          products={products}
          whatsappNumber={storeSettings.whatsappNumber}
        />

        <div className="mt-10 text-center">
          <Link
            href="/products"
            className="inline-flex items-center justify-center rounded-2xl border border-(--mm-primary) px-6 py-3 text-sm font-semibold text-(--mm-primary) transition hover:bg-[rgba(201,120,27,0.06)]"
          >
            Ver todos os produtos
          </Link>
        </div>
      </div>
    </section>
  );
}