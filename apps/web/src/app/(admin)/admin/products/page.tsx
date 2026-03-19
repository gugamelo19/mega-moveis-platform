"use client";

import Link from "next/link";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteProduct } from "@/features/products/services/delete-product";
import { getAdminProducts } from "@/features/products/services/get-admin-products";
import type { Product } from "@/features/products/types/product.type";
import { getAccessToken } from "@/lib/auth-storage";

function formatCurrency(value: string) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value));
}

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  async function fetchProducts(currentSearch?: string) {
    const token = getAccessToken();
    if (!token) return null;

    return getAdminProducts({
      token,
      search: currentSearch,
    });
  }

  async function loadProducts(currentSearch?: string) {
    const response = await fetchProducts(currentSearch);
    if (!response) return;

    setProducts(response);
  }

  useEffect(() => {
    async function initializeProducts() {
      const response = await fetchProducts();
      if (!response) return;

      setProducts(response);
    }

    void initializeProducts();
  }, []);

  async function handleDelete(product: Product) {
    const confirmed = window.confirm(
      `Deseja excluir o produto "${product.name}"?`
    );

    if (!confirmed) return;

    const token = getAccessToken();
    if (!token) return;

    await deleteProduct({
      token,
      id: product.id,
    });

    await loadProducts(search);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="mm-page-title">Produtos</h1>
          <p className="mm-page-subtitle">Gerencie seus produtos</p>
        </div>

        <Link href="/admin/products/new" className="mm-btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Novo Produto
        </Link>
      </div>

      <div className="mm-card overflow-hidden">
        <div className="border-b border-(--mm-border) p-6">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--mm-text-soft)" />
            <input
              className="mm-input w-full pl-11"
              placeholder="Buscar produto..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  await loadProducts(search);
                }
              }}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="border-b border-(--mm-border) text-left text-(--mm-text-soft)">
                <th className="px-5 py-4 font-medium">Nome</th>
                <th className="px-5 py-4 font-medium">Categoria</th>
                <th className="px-5 py-4 font-medium">Marca</th>
                <th className="px-5 py-4 font-medium">Preço</th>
                <th className="px-5 py-4 text-center font-medium">Estoque</th>
                <th className="px-5 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-(--mm-border) last:border-b-0"
                >
                  <td className="px-5 py-5 font-medium">{product.name}</td>
                  <td className="px-5 py-5">{product.category.name}</td>
                  <td className="px-5 py-5">{product.brand.name}</td>
                  <td className="px-5 py-5 font-semibold text-(--mm-primary)">
                    {formatCurrency(product.price)}
                  </td>
                  <td className="px-5 py-5 text-center">
                    {product.isAvailable ? "Disponível" : "Indisponível"}
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-(--mm-text) transition hover:text-(--mm-primary)"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => void handleDelete(product)}
                        className="text-(--mm-danger) transition hover:opacity-80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {products.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-(--mm-text-soft)"
                  >
                    Nenhum produto encontrado.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
