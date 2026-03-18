"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BrandStatusBadge } from "@/components/admin/brand-status-badge";
import { deleteBrand } from "@/features/brands/services/delete-brand";
import { getAdminBrands } from "@/features/brands/services/get-admin-brands";
import type { Brand } from "@/features/brands/types/brand.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBrands(currentSearch?: string) {
    try {
      setError(null);
      setLoading(true);

      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      const response = await getAdminBrands({
        token,
        search: currentSearch,
      });

      setBrands(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Não foi possível carregar as marcas"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBrands();
  }, []);

  async function handleSearchSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loadBrands(search);
  }

  async function handleDelete(brand: Brand) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir a marca "${brand.name}"?`
    );

    if (!confirmed) return;

    try {
      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      await deleteBrand({
        token,
        id: brand.id,
      });

      await loadBrands(search);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Não foi possível excluir a marca"
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Marcas</h1>
          <p className="mt-2 text-sm text-slate-600">
            Gerencie as marcas exibidas no catálogo da loja.
          </p>
        </div>

        <Button asChild>
          <Link href="/admin/brands/new">Nova marca</Link>
        </Button>
      </div>

      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="text-base">Lista de marcas</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <form
            className="flex flex-col gap-3 sm:flex-row"
            onSubmit={handleSearchSubmit}
          >
            <input
              className="h-10 flex-1 rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
              type="text"
              placeholder="Buscar por nome da marca"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <Button type="submit" variant="outline">
              Buscar
            </Button>
          </form>

          {loading ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              Carregando marcas...
            </div>
          ) : null}

          {!loading && error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {!loading && !error && brands.length === 0 ? (
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
              Nenhuma marca encontrada.
            </div>
          ) : null}

          {!loading && !error && brands.length > 0 ? (
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="min-w-full divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Nome
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Slug
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-medium text-slate-600">
                      Ações
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 bg-white">
                  {brands.map((brand) => (
                    <tr key={brand.id}>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-900">
                          {brand.name}
                        </div>
                        {brand.logoUrl ? (
                          <div className="mt-1 text-xs text-slate-500">
                            Logo cadastrada
                          </div>
                        ) : null}
                      </td>

                      <td className="px-4 py-3 text-slate-600">{brand.slug}</td>

                      <td className="px-4 py-3">
                        <BrandStatusBadge isActive={brand.isActive} />
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Button asChild size="sm" variant="outline">
                            <Link href={`/admin/brands/${brand.id}`}>
                              Editar
                            </Link>
                          </Button>

                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => void handleDelete(brand)}
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