"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ProductAvailabilityBadge } from "@/components/admin/product-availability-badge";
import { ProductFlags } from "@/components/admin/product-flags";
import { deleteProduct } from "@/features/products/services/delete-product";
import { getAdminProducts } from "@/features/products/services/get-admin-products";
import type { Product } from "@/features/products/types/product.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadProducts(currentSearch?: string) {
    try {
      setError(null);
      setLoading(true);

      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      const response = await getAdminProducts({
        token,
        search: currentSearch,
      });

      setProducts(response);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível carregar os produtos"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadProducts();
  }, []);

  async function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadProducts(search);
  }

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o produto "${product.name}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      await deleteProduct({
        token,
        id: product.id,
      });

      await loadProducts(search);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir o produto"
      );
    }
  }

  function formatCurrency(value: string) {
    const numericValue = Number(value);

    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(numericValue);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Produtos</h1>
          <p className="mt-2 text-sm text-slate-600">
            Gerencie os produtos exibidos no catálogo da loja.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/products/new">Novo produto</Link>
        </Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Lista de produtos</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="h-10 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
              type="text"
              placeholder="Buscar por nome do produto"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Button type="submit" variant="outline">
              Buscar
            </Button>
          </form>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              Carregando produtos...
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {!loading && !error && products.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              Nenhum produto encontrado.
            </div>
          ) : null}

          {!loading && !error && products.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Produto
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Categoria
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Marca
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Preço
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Disponibilidade
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Flags
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {products.map((product) => (
                    <tr key={product.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">
                          {product.name}
                        </div>

                        {product.sku ? (
                          <div className="mt-1 text-xs text-slate-500">
                            SKU: {product.sku}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {product.category.name}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        {product.brand.name}
                      </td>

                      <td className="px-4 py-3 text-slate-600">
                        <div>{formatCurrency(product.price)}</div>
                        {product.compareAtPrice ? (
                          <div className="text-xs text-slate-400 line-through">
                            {formatCurrency(product.compareAtPrice)}
                          </div>
                        ) : null}
                      </td>

                      <td className="px-4 py-3">
                        <ProductAvailabilityBadge
                          isAvailable={product.isAvailable}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <ProductFlags
                          isFeatured={product.isFeatured}
                          isOnSale={product.isOnSale}
                        />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/admin/products/${product.id}`}>
                              Editar
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void handleDelete(product)}
                          >
                            Excluir
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </CardContent>
      </Card>
    </div>
  );
}