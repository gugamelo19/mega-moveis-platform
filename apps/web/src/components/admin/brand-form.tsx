"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  brandSchema,
  type BrandFormData,
  type BrandFormInput,
} from "@/features/brands/schemas/brand.schema";
import { createBrand } from "@/features/brands/services/create-brand";
import { updateBrand } from "@/features/brands/services/update-brand";
import { getAccessToken } from "@/lib/auth-storage";

type BrandFormProps = {
  brandId?: string;
  defaultValues?: BrandFormInput;
};

export function BrandForm({ brandId, defaultValues }: BrandFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BrandFormInput, unknown, BrandFormData>({
    resolver: zodResolver(brandSchema),
    defaultValues: defaultValues ?? {
      name: "",
      logoUrl: "",
      isActive: true,
    },
  });

  async function onSubmit(data: BrandFormData) {
    try {
      setServerError(null);

      const token = getAccessToken();

      if (!token) {
        setServerError("Sessão não encontrada");
        return;
      }

      if (brandId) {
        await updateBrand({
          token,
          id: brandId,
          data,
        });
      } else {
        await createBrand({
          token,
          data,
        });
      }

      router.push("/admin/brands");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : brandId
            ? "Não foi possível atualizar a marca"
            : "Não foi possível criar a marca"
      );
    }
  }

  return (
    <div className="mm-card p-8">
      <div className="mb-8">
        <h2 className="font-(--font-heading) text-4xl text-(--mm-text)">
          {brandId ? "Editar marca" : "Nova marca"}
        </h2>
        <p className="mt-2 text-sm text-(--mm-text-soft)">
          Preencha os dados da marca para organizar melhor o catálogo.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium text-(--mm-text)">
            Nome
          </label>
          <input
            id="name"
            placeholder="Ex.: Electrolux"
            className="mm-input w-full"
            {...register("name")}
          />
          {errors.name ? (
            <p className="text-sm text-(--mm-danger)">{errors.name.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="logoUrl" className="text-sm font-medium text-(--mm-text)">
            URL da logo
          </label>
          <input
            id="logoUrl"
            placeholder="https://..."
            className="mm-input w-full"
            {...register("logoUrl")}
          />
          {errors.logoUrl ? (
            <p className="text-sm text-(--mm-danger)">{errors.logoUrl.message}</p>
          ) : null}
        </div>

        <label className="flex items-center gap-3 rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) px-4 py-3">
          <input type="checkbox" {...register("isActive")} />
          <span className="text-sm text-(--mm-text)">Marca ativa</span>
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
              : brandId
                ? "Salvar alterações"
                : "Salvar marca"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/brands")}
            className="mm-btn-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}