import { ProductGrid } from "@/components/store/product-grid";
import { getPublicBrands } from "@/features/brands/services/get-public-brands";
import { getPublicCategories } from "@/features/categories/services/get-public-categories";
import { getPublicProducts } from "@/features/products/services/get-public-products";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";


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

  const currentSearch = params?.search ?? "";
  const currentCategoryId = params?.categoryId ?? "";
  const currentBrandId = params?.brandId ?? "";

  const [products, categories, brands, storeSettings] = await Promise.all([
    getPublicProducts({
      search: currentSearch || undefined,
      categoryId: currentCategoryId || undefined,
      brandId: currentBrandId || undefined,
    }),
    getPublicCategories(),
    getPublicBrands(),
    getPublicStoreSettings(),
  ]);

  return (
    <div className="bg-(--mm-bg)">
      <section className="border-b border-(--mm-border) bg-(--mm-surface)">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <div className="max-w-3xl">
            <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
              Nosso catálogo
            </span>

            <h1 className="mt-4 text-5xl font-semibold text-(--mm-text) md:text-6xl">
              Produtos
            </h1>

            <p className="mt-4 text-base leading-8 text-(--mm-text-soft)">
              Explore móveis e eletrodomésticos selecionados para transformar
              cada ambiente da sua casa.
            </p>
          </div>

          <form className="mt-8 space-y-4">
            <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr_1fr_auto]">
              <input
                type="text"
                name="search"
                defaultValue={currentSearch}
                placeholder="Buscar produto..."
                className="mm-input w-full"
              />

              <select
                name="categoryId"
                defaultValue={currentCategoryId}
                className="mm-input w-full"
              >
                <option value="">Todas as categorias</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>

              <select
                name="brandId"
                defaultValue={currentBrandId}
                className="mm-input w-full"
              >
                <option value="">Todas as marcas</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>

              <button type="submit" className="mm-btn-primary whitespace-nowrap">
                Filtrar
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        {currentSearch || currentCategoryId || currentBrandId ? (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-(--mm-text-soft)">
              Filtros aplicados:
            </span>

            {currentSearch ? (
              <span className="rounded-full bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text) border border-(--mm-border)">
                Busca: {currentSearch}
              </span>
            ) : null}

            {currentCategoryId ? (
              <span className="rounded-full bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text) border border-(--mm-border)">
                Categoria selecionada
              </span>
            ) : null}

            {currentBrandId ? (
              <span className="rounded-full bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text) border border-(--mm-border)">
                Marca selecionada
              </span>
            ) : null}
          </div>
        ) : null}

        <ProductGrid
          products={products}
          whatsappNumber={storeSettings.whatsappNumber}
        />
      </section>
    </div>
  );
}