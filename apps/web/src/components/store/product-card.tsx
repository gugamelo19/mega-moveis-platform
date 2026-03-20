import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/features/products/types/product.type";

type Props = {
  product: Product;
  whatsappNumber?: string;
};

function formatCurrency(value: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export function ProductCard({ product, whatsappNumber }: Props) {
  const mainImage = product.images.find((img) => img.isPrimary) ?? product.images[0];

  let tag: string | null = null;

  if (product.isFeatured) tag = "Mais vendido";
  else if (product.isOnSale) tag = "Oferta";
  else if (product.isAvailable) tag = "Disponível";

  const whatsappHref = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        `Olá! Tenho interesse no produto: ${product.name}`
      )}`
    : null;

  return (
    <article className="overflow-hidden rounded-[28px] border border-(--mm-border) bg-(--mm-surface) transition hover:shadow-lg">
      <Link href={`/products/${product.slug}`} className="group block">
        <div className="relative aspect-square overflow-hidden bg-(--mm-surface-2)">
          {mainImage ? (
            <Image
              src={mainImage.imageUrl}
              alt={mainImage.altText ?? product.name}
              fill
              className="object-cover transition duration-500 group-hover:scale-[1.03]"
              sizes="(max-width: 768px) 100vw, 25vw"
            />
          ) : null}

          {tag ? (
            <span className="absolute left-3 top-3 rounded-full bg-(--mm-primary) px-3 py-1 text-xs font-semibold text-(--mm-primary-foreground)">
              {tag}
            </span>
          ) : null}
        </div>
      </Link>

      <div className="p-5">
        <Link href={`/products/${product.slug}`}>
          <h3 className="font-(--font-heading) text-2xl text-(--mm-text) transition hover:text-(--mm-primary)">
            {product.name}
          </h3>
        </Link>

        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-[2rem] font-semibold text-(--mm-primary)">
            {formatCurrency(product.price)}
          </span>

          {product.compareAtPrice ? (
            <span className="text-lg text-(--mm-text-soft) line-through">
              {formatCurrency(product.compareAtPrice)}
            </span>
          ) : null}
        </div>

        <p className="mt-1 text-sm text-(--mm-text-soft)">
          ou em até 12x no cartão
        </p>

        {whatsappHref ? (
          <Link
            href={whatsappHref}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-2xl border-2 border-(--mm-primary) bg-transparent px-4 text-sm font-semibold text-(--mm-primary) transition hover:bg-(--mm-primary) hover:text-(--mm-primary-foreground)"
          >
            Consultar via WhatsApp
          </Link>
        ) : (
          <Link
            href={`/products/${product.slug}`}
            className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-2xl border-2 border-(--mm-primary) bg-transparent px-4 text-sm font-semibold text-(--mm-primary) transition hover:bg-(--mm-primary) hover:text-(--mm-primary-foreground)"
          >
            Ver produto
          </Link>
        )}
      </div>
    </article>
  );
}