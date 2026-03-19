"use client";

import Link from "next/link";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteBrand } from "@/features/brands/services/delete-brand";
import { getAdminBrands } from "@/features/brands/services/get-admin-brands";
import type { Brand } from "@/features/brands/types/brand.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");

  async function fetchBrands(currentSearch?: string) {
    const token = getAccessToken();
    if (!token) return null;

    return getAdminBrands({
      token,
      search: currentSearch,
    });
  }

  async function loadBrands(currentSearch?: string) {
    const response = await fetchBrands(currentSearch);
    if (!response) return;

    setBrands(response);
  }

  useEffect(() => {
    async function initializeBrands() {
      const response = await fetchBrands();
      if (!response) return;

      setBrands(response);
    }

    void initializeBrands();
  }, []);

  async function handleDelete(brand: Brand) {
    const confirmed = window.confirm(`Deseja excluir a marca "${brand.name}"?`);
    if (!confirmed) return;

    const token = getAccessToken();
    if (!token) return;

    await deleteBrand({
      token,
      id: brand.id,
    });

    await loadBrands(search);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="mm-page-title">Marcas</h1>
          <p className="mm-page-subtitle">Gerencie as marcas dos produtos</p>
        </div>

        <Link href="/admin/brands/new" className="mm-btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Nova Marca
        </Link>
      </div>

      <div className="mm-card overflow-hidden">
        <div className="border-b border-(--mm-border) p-6">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--mm-text-soft)" />
            <input
              className="mm-input w-full pl-11"
              placeholder="Buscar marca..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  await loadBrands(search);
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
                <th className="px-5 py-4 text-center font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>

            <tbody>
              {brands.map((brand) => (
                <tr
                  key={brand.id}
                  className="border-b border-(--mm-border) last:border-b-0"
                >
                  <td className="px-5 py-5 font-medium">{brand.name}</td>
                  <td className="px-5 py-5 text-center">
                    {brand.isActive ? "Ativa" : "Inativa"}
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/brands/${brand.id}`}
                        className="text-(--mm-text) transition hover:text-(--mm-primary)"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => void handleDelete(brand)}
                        className="text-(--mm-danger) transition hover:opacity-80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {brands.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-5 py-10 text-center text-(--mm-text-soft)"
                  >
                    Nenhuma marca encontrada.
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
