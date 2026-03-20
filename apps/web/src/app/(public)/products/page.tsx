import { ProductGrid } from "@/components/store/product-grid";
import { getPublicProducts } from "@/features/products/services/get-public-products";

type ProductsPageProps = {
  searchParams?: Promise<{
    search?: string;
    categoryId?: string;
    brandId?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = searchParams ? await searchParams : undefined;
  const products = await getPublicProducts();

  const currentSearch = params?.search ?? "";

  return (
    <div className="bg-(--mm-bg)">
      <section className="border-b border-(--mm-border) bg-(--mm-surface)">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
              Nosso catálogo
            </span>

            <h1 className="mt-4 font-(--font-heading) text-5xl text-(--mm-text) md:text-6xl">
              Produtos
            </h1>

            <p className="mt-4 text-base leading-8 text-(--mm-text-soft)">
              Explore móveis e eletrodomésticos selecionados para transformar
              cada ambiente da sua casa.
            </p>
          </div>

          <form className="mt-8">
            <div className="flex max-w-xl items-center gap-3 rounded-3xl border border-(--mm-border) bg-white p-2 shadow-sm">
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Buscar produto..."
                className="h-12 flex-1 rounded-2xl border-0 bg-transparent px-4 text-sm outline-none"
              />

              <button type="submit" className="mm-btn-primary px-6">
                Buscar
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        <ProductGrid products={products} />
      </section>
    </div>
  );
}