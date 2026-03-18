"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CategoryForm } from "@/components/admin/category-form";
import { getCategoryById } from "@/features/categories/services/get-category-by-id";
import type { Category } from "@/features/categories/types/category.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function EditCategoryPage() {
    
  const params = useParams();
  const id = params.id as string;

  console.log("EditCategoryPage renderizou")
  console.log("params", params)

  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCategory() {
      try {
        setError(null);

        const token = getAccessToken();

        if (!token) {
          setError("Sessão não encontrada");
          return;
        }

        const data = await getCategoryById({
          token,
          id,
        });

        setCategory(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar a categoria"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadCategory();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Carregando categoria...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!category) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Categoria não encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Editar categoria</h1>
        <p className="mt-2 text-sm text-slate-600">
          Atualize os dados da categoria selecionada.
        </p>
      </div>

      <CategoryForm
        categoryId={category.id}
        defaultValues={{
          name: category.name,
          description: category.description ?? "",
          imageUrl: category.imageUrl ?? "",
          isActive: category.isActive,
          sortOrder: category.sortOrder,
        }}
      />
    </div>
  );
}