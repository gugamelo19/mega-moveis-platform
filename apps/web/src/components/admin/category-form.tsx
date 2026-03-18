"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          {categoryId ? "Editar categoria" : "Nova categoria"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Ex.: Sofás" {...register("name")} />
            {errors.name ? (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição</Label>
            <Input
              id="description"
              placeholder="Ex.: Sofás para sala de estar"
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-red-600">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da imagem</Label>
            <Input
              id="imageUrl"
              placeholder="https://..."
              {...register("imageUrl")}
            />
            {errors.imageUrl ? (
              <p className="text-sm text-red-600">{errors.imageUrl.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Ordem</Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              {...register("sortOrder")}
            />
            {errors.sortOrder ? (
              <p className="text-sm text-red-600">{errors.sortOrder.message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
              {...register("isActive")}
            />
            <Label htmlFor="isActive">Categoria ativa</Label>
          </div>

          {serverError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? categoryId
                  ? "Salvando..."
                  : "Criando..."
                : categoryId
                  ? "Salvar alterações"
                  : "Salvar categoria"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/categories")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}