"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  categorySchema,
  type CategoryFormData,
  type CategoryFormInput,
} from "@/features/categories/schemas/category.schema";
import { createCategory } from "@/features/categories/services/create-category";
import { updateCategory } from "@/features/categories/services/update-category";
import { getAccessToken } from "@/lib/auth-storage";

type CategoryFormProps = {
  categoryId?: string;
  defaultValues?: CategoryFormInput;
};

export function CategoryForm({
  categoryId,
  defaultValues,
}: CategoryFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CategoryFormInput, unknown, CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: defaultValues ?? {
      name: "",
      description: "",
      imageUrl: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  async function onSubmit(data: CategoryFormData) {
    try {
      setServerError(null);

      const token = getAccessToken();
      if (!token) {
        setServerError("Sessão não encontrada");
        return;
      }

      if (categoryId) {
        await updateCategory({
          token,
          id: categoryId,
          data,
        });
      } else {
        await createCategory({
          token,
          data,
        });
      }

      router.push("/admin/categories");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : categoryId
            ? "Não foi possível atualizar a categoria"
            : "Não foi possível criar a categoria"
      );
    }
  }

  return (
    <div className="mm-card p-8">
      <div className="mb-8">
        <h2 className="font-(--font-heading) text-4xl text-(--mm-text)">
          {categoryId ? "Editar categoria" : "Nova categoria"}
        </h2>
        <p className="mt-2 text-sm text-(--mm-text-soft)">
          Organize o catálogo definindo categorias claras e bem estruturadas.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-(--mm-text)">
            Nome
          </label>
          <input
            id="name"
            placeholder="Ex.: Sala de Estar"
            className="mm-input w-full"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-(--mm-danger)">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-(--mm-text)">
            Descrição
          </label>
          <input
            id="description"
            placeholder="Descrição breve da categoria"
            className="mm-input w-full"
            {...register("description")}
          />
          {errors.description ? (
            <p className="text-sm text-(--mm-danger)">
              {errors.description.message}
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="imageUrl" className="text-sm font-medium text-(--mm-text)">
            URL da imagem
          </label>
          <input
            id="imageUrl"
            placeholder="https://..."
            className="mm-input w-full"
            {...register("imageUrl")}
          />
          {errors.imageUrl ? (
            <p className="text-sm text-(--mm-danger)">{errors.imageUrl.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="sortOrder" className="text-sm font-medium text-(--mm-text)">
            Ordem
          </label>
          <input
            id="sortOrder"
            type="number"
            min={0}
            className="mm-input w-full"
            {...register("sortOrder")}
          />
          {errors.sortOrder ? (
            <p className="text-sm text-(--mm-danger)">{errors.sortOrder.message}</p>
          ) : null}
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) px-4 py-3">
          <input type="checkbox" {...register("isActive")} />
          <span className="text-sm text-(--mm-text)">Categoria ativa</span>
        </label>

        {serverError ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {serverError}
          </div>
        ) : null}

        <div className="flex items-center gap-3">
          <button type="submit" disabled={isSubmitting} className="mm-btn-primary">
            {isSubmitting
              ? "Salvando..."
              : categoryId
                ? "Salvar alterações"
                : "Salvar categoria"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/categories")}
            className="mm-btn-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}