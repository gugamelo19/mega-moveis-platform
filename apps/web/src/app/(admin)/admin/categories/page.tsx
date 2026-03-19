"use client";

import Link from "next/link";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteCategory } from "@/features/categories/services/delete-category";
import { getAdminCategories } from "@/features/categories/services/get-admin-categories";
import type { Category } from "@/features/categories/types/category.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");

  async function fetchCategories(currentSearch?: string) {
    const token = getAccessToken();
    if (!token) return null;

    return getAdminCategories({
      token,
      search: currentSearch,
    });
  }

  async function loadCategories(currentSearch?: string) {
    const response = await fetchCategories(currentSearch);
    if (!response) return;

    setCategories(response);
  }

  useEffect(() => {
    async function initializeCategories() {
      const response = await fetchCategories();
      if (!response) return;

      setCategories(response);
    }

    void initializeCategories();
  }, []);

  async function handleDelete(category: Category) {
    const confirmed = window.confirm(
      `Deseja excluir a categoria "${category.name}"?`
    );
    if (!confirmed) return;

    const token = getAccessToken();
    if (!token) return;

    await deleteCategory({
      token,
      id: category.id,
    });

    await loadCategories(search);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="mm-page-title">Categorias</h1>
          <p className="mm-page-subtitle">Gerencie as categorias de produtos</p>
        </div>

        <Link href="/admin/categories/new" className="mm-btn-primary gap-2">
          <Plus className="h-4 w-4" />
          Nova Categoria
        </Link>
      </div>

      <div className="mm-card overflow-hidden">
        <div className="border-b border-(--mm-border) p-6">
          <div className="relative max-w-sm">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-(--mm-text-soft)" />
            <input
              className="mm-input w-full pl-11"
              placeholder="Buscar categoria..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={async (event) => {
                if (event.key === "Enter") {
                  await loadCategories(search);
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
                <th className="px-5 py-4 font-medium">Slug</th>
                <th className="px-5 py-4 text-center font-medium">Ordem</th>
                <th className="px-5 py-4 text-center font-medium">Status</th>
                <th className="px-5 py-4 text-right font-medium">Ações</th>
              </tr>
            </thead>

            <tbody>
              {categories.map((category) => (
                <tr
                  key={category.id}
                  className="border-b border-(--mm-border) last:border-b-0"
                >
                  <td className="px-5 py-5 font-medium">{category.name}</td>
                  <td className="px-5 py-5 text-(--mm-text-soft)">
                    {category.slug}
                  </td>
                  <td className="px-5 py-5 text-center">{category.sortOrder}</td>
                  <td className="px-5 py-5 text-center">
                    {category.isActive ? "Ativa" : "Inativa"}
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/categories/${category.id}`}
                        className="text-(--mm-text) transition hover:text-(--mm-primary)"
                      >
                        <Pencil className="h-4 w-4" />
                      </Link>

                      <button
                        type="button"
                        onClick={() => void handleDelete(category)}
                        className="text-(--mm-danger) transition hover:opacity-80"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {categories.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-10 text-center text-(--mm-text-soft)"
                  >
                    Nenhuma categoria encontrada.
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
