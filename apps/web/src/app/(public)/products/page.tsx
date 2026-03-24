import Link from "next/link";
import { CatalogPagination } from "@/components/store/catalog-pagination";
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
    sort?: "newest" | "price_asc" | "price_desc" | "name_asc";
    page?: string;
  }>;
};

export default async function ProductsPage({
  searchParams,
}: ProductsPageProps) {
  const params = searchParams ? await searchParams : undefined;

  const currentSearch = params?.search ?? "";
  const currentCategoryId = params?.categoryId ?? "";
  const currentBrandId = params?.brandId ?? "";
  const currentSort = params?.sort ?? "newest";
  const currentPage = Math.max(Number(params?.page ?? "1") || 1, 1);

  const [productsResponse, categories, brands, storeSettings] = await Promise.all([
    getPublicProducts({
      search: currentSearch || undefined,
      categoryId: currentCategoryId || undefined,
      brandId: currentBrandId || undefined,
      sort: currentSort,
      page: currentPage,
    }),
    getPublicCategories(),
    getPublicBrands(),
    getPublicStoreSettings(),
  ]);

  const selectedCategory = categories.find((item) => item.id === currentCategoryId);
  const selectedBrand = brands.find((item) => item.id === currentBrandId);

  const baseParams = new URLSearchParams();
  if (currentSearch) baseParams.set("search", currentSearch);
  if (currentCategoryId) baseParams.set("categoryId", currentCategoryId);
  if (currentBrandId) baseParams.set("brandId", currentBrandId);
  if (currentSort) baseParams.set("sort", currentSort);

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
            <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr_1fr_1fr_auto]">
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

              <select
                name="sort"
                defaultValue={currentSort}
                className="mm-input w-full"
              >
                <option value="newest">Mais recentes</option>
                <option value="price_asc">Menor preço</option>
                <option value="price_desc">Maior preço</option>
                <option value="name_asc">Nome A-Z</option>
              </select>

              <button type="submit" className="mm-btn-primary whitespace-nowrap">
                Filtrar
              </button>
            </div>

            <div className="flex justify-end">
              <Link
                href="/products"
                className="text-sm font-medium text-(--mm-primary) transition hover:opacity-80"
              >
                Limpar filtros
              </Link>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14">
        {currentSearch || currentCategoryId || currentBrandId || currentSort !== "newest" ? (
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="text-sm text-(--mm-text-soft)">
              Filtros aplicados:
            </span>

            {currentSearch ? (
              <span className="rounded-full border border-(--mm-border) bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text)">
                Busca: {currentSearch}
              </span>
            ) : null}

            {selectedCategory ? (
              <span className="rounded-full border border-(--mm-border) bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text)">
                Categoria: {selectedCategory.name}
              </span>
            ) : null}

            {selectedBrand ? (
              <span className="rounded-full border border-(--mm-border) bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text)">
                Marca: {selectedBrand.name}
              </span>
            ) : null}

            {currentSort !== "newest" ? (
              <span className="rounded-full border border-(--mm-border) bg-(--mm-surface) px-3 py-1 text-sm text-(--mm-text)">
                Ordenação ativa
              </span>
            ) : null}
          </div>
        ) : null}

        <ProductGrid
          products={productsResponse.items}
          whatsappNumber={storeSettings.whatsappNumber}
        />

        <CatalogPagination
          currentPage={productsResponse.meta.page}
          totalPages={productsResponse.meta.totalPages}
          baseParams={baseParams}
        />
      </section>
    </div>
  );
}