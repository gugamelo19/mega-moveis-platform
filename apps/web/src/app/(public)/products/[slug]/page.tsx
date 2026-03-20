import { ProductGallery } from "@/components/store/product-gallery";
import { StoreContactCard } from "@/components/store/store-contact-card";
import { getPublicProductBySlug } from "@/features/products/services/get-public-product-by-slug";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

type ProductDetailsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function formatCurrency(value: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;

  const [product, storeSettings] = await Promise.all([
    getPublicProductBySlug(slug),
    getPublicStoreSettings(),
  ]);

  return (
    <div className="bg-(--mm-bg)">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <ProductGallery images={product.images} productName={product.name} />

          <div className="space-y-8">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-(--mm-primary)">
                {product.category.name} • {product.brand.name}
              </p>

              <h1 className="mt-3 font-(--font-heading) text-5xl leading-tight text-(--mm-text)">
                {product.name}
              </h1>

              {product.shortDescription ? (
                <p className="mt-5 text-base leading-8 text-(--mm-text-soft)">
                  {product.shortDescription}
                </p>
              ) : null}
            </div>

            <div className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-6">
              <div className="flex flex-wrap items-end gap-3">
                <span className="text-4xl font-semibold text-(--mm-primary)">
                  {formatCurrency(product.price)}
                </span>

                {product.compareAtPrice ? (
                  <span className="text-xl text-(--mm-text-soft) line-through">
                    {formatCurrency(product.compareAtPrice)}
                  </span>
                ) : null}
              </div>

              <p className="mt-2 text-sm text-(--mm-text-soft)">
                ou em até 12x no cartão
              </p>

              {product.isOnSale ? (
                <p className="mt-3 text-sm font-semibold text-(--mm-primary)">
                  Produto em oferta
                </p>
              ) : null}
            </div>

            <StoreContactCard
              storeSettings={storeSettings}
              productName={product.name}
            />

            <div className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-6">
              <h2 className="font-(--font-heading) text-3xl text-(--mm-text)">
                Descrição
              </h2>

              <p className="mt-4 whitespace-pre-line text-base leading-8 text-(--mm-text-soft)">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}