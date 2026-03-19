import { ProductGallery } from "@/components/store/product-gallery";
import { WhatsAppButton } from "@/components/store/whatsapp-button";
import { getPublicProductBySlug } from "@/features/products/services/get-public-product-by-slug";

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
  const product = await getPublicProductBySlug(slug);

  const whatsappNumber = "5575999999999";

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

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
            <h2 className="text-sm font-semibold text-slate-900">
              Interesse neste produto?
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Fale com nossa equipe pelo WhatsApp e tire suas dúvidas.
            </p>

            <div className="mt-4">
              <WhatsAppButton
                phoneNumber={whatsappNumber}
                productName={product.name}
              />
            </div>
          </div>

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