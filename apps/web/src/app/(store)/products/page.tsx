import { getPublicProducts } from "@/features/products/services/get-public-products";
import { ProductGrid } from "@/components/store/product-grid";

export default async function ProductsPage() {
  const products = await getPublicProducts();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Produtos</h1>
        <p className="mt-2 text-sm text-slate-600">
          Confira os produtos disponíveis na loja.
        </p>
      </div>

      <ProductGrid products={products} />
    </div>
  );
}