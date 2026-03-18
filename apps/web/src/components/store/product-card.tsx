import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/products/types/product.type";

type Props = {
  product: Product;
};

export function ProductCard({ product }: Props) {
  const mainImage =
    product.images.find((img) => img.isPrimary) ??
    product.images[0];

  function formatCurrency(value: string) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md"
    >
      <div className="relative h-48 w-full overflow-hidden rounded-xl bg-slate-100">
        {mainImage ? (
          <Image
            src={mainImage.imageUrl}
            alt={mainImage.altText ?? product.name}
            fill
            className="object-cover transition group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 25vw"
          />
        ) : null}
      </div>

      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium text-slate-900 line-clamp-2">
          {product.name}
        </h3>

        <div className="flex items-center gap-2">
          <span className="text-base font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>

          {product.compareAtPrice ? (
            <span className="text-sm text-slate-400 line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}