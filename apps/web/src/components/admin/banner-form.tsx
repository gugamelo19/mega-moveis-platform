"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  bannerSchema,
  type BannerFormData,
  type BannerFormInput,
} from "@/features/banners/schemas/banner.schema";
import { createBanner } from "@/features/banners/services/create-banner";
import { updateBanner } from "@/features/banners/services/update-banner";
import { getAccessToken } from "@/lib/auth-storage";

type BannerFormProps = {
  bannerId?: string;
  defaultValues?: BannerFormInput;
};

export function BannerForm({ bannerId, defaultValues }: BannerFormProps) {
  const router = useRouter();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<BannerFormInput, unknown, BannerFormData>({
    resolver: zodResolver(bannerSchema),
    defaultValues: defaultValues ?? {
      title: "",
      subtitle: "",
      imageUrl: "",
      linkUrl: "",
      isActive: true,
      sortOrder: 0,
    },
  });

  async function onSubmit(data: BannerFormData) {
    try {
      setServerError(null);

      const token = getAccessToken();
      if (!token) {
        setServerError("Sessão não encontrada");
        return;
      }

      if (bannerId) {
        await updateBanner({
          token,
          id: bannerId,
          data,
        });
      } else {
        await createBanner({
          token,
          data,
        });
      }

      router.push("/admin/banners");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : bannerId
            ? "Não foi possível atualizar o banner"
            : "Não foi possível criar o banner"
      );
    }
  }

  return (
    <div className="mm-card p-8">
      <div className="mb-8">
        <h2 className="font-(--font-heading) text-4xl text-(--mm-text)">
          {bannerId ? "Editar banner" : "Novo banner"}
        </h2>
        <p className="mt-2 text-sm text-(--mm-text-soft)">
          Configure banners que destaquem promoções, campanhas e lançamentos.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-(--mm-text)">
            Título
          </label>
          <input
            id="title"
            placeholder="Ex.: Promoção de verão"
            className="mm-input w-full"
            {...register("title")}
          />
          {errors.title ? (
            <p className="text-sm text-(--mm-danger)">{errors.title.message}</p>
          ) : null}
        </div>

        <div className="space-y-2">
          <label htmlFor="subtitle" className="text-sm font-medium text-(--mm-text)">
            Subtítulo
          </label>
          <input
            id="subtitle"
            placeholder="Texto complementar"
            className="mm-input w-full"
            {...register("subtitle")}
          />
          {errors.subtitle ? (
            <p className="text-sm text-(--mm-danger)">{errors.subtitle.message}</p>
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
          <label htmlFor="linkUrl" className="text-sm font-medium text-(--mm-text)">
            Link de destino
          </label>
          <input
            id="linkUrl"
            placeholder="/products"
            className="mm-input w-full"
            {...register("linkUrl")}
          />
          {errors.linkUrl ? (
            <p className="text-sm text-(--mm-danger)">{errors.linkUrl.message}</p>
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
          <span className="text-sm text-(--mm-text)">Banner ativo</span>
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
              : bannerId
                ? "Salvar alterações"
                : "Salvar banner"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/admin/banners")}
            className="mm-btn-outline"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}