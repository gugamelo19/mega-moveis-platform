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
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <ProductGallery
          images={product.images}
          productName={product.name}
        />

        <div className="space-y-6">
          <div>
            <p className="text-sm text-slate-500">
              {product.category.name} • {product.brand.name}
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-slate-900">
              {product.name}
            </h1>

            {product.shortDescription ? (
              <p className="mt-3 text-base text-slate-600">
                {product.shortDescription}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="text-3xl font-bold text-slate-900">
                {formatCurrency(product.price)}
              </span>

              {product.compareAtPrice ? (
                <span className="text-lg text-slate-400 line-through">
                  {formatCurrency(product.compareAtPrice)}
                </span>
              ) : null}
            </div>

            {product.isOnSale ? (
              <p className="text-sm font-medium text-rose-600">
                Produto em oferta
              </p>
            ) : null}
          </div>

          <StoreContactCard
            storeSettings={storeSettings}
            productName={product.name}
          />

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Descrição
            </h2>
            <p className="whitespace-pre-line text-sm leading-6 text-slate-600">
              {product.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}