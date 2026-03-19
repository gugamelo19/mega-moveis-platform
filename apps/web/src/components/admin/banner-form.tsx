"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const inputClassName =
  "h-11 rounded-[14px] border-[var(--admin-border)] bg-[var(--admin-surface)] px-4 text-[15px] text-[var(--admin-text)] shadow-none placeholder:text-[var(--admin-muted)] focus:border-[var(--admin-primary)] focus:ring-4 focus:ring-[rgba(22,58,143,0.14)]";

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
        setServerError("Sessao nao encontrada");
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
            ? "Nao foi possivel atualizar o banner"
            : "Nao foi possivel criar o banner"
      );
    }
  }

  return (
    <section className="rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-6 shadow-[0_10px_30px_rgba(7,26,76,0.06)]">
      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="title"
              className="text-[15px] font-semibold text-[var(--admin-text)]"
            >
              Titulo
            </Label>
            <Input
              id="title"
              placeholder="Ex.: Promocao de Verao"
              className={inputClassName}
              {...register("title")}
            />
            {errors.title ? (
              <p className="text-sm text-[#b42318]">{errors.title.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="subtitle"
              className="text-[15px] font-semibold text-[var(--admin-text)]"
            >
              Subtitulo
            </Label>
            <Input
              id="subtitle"
              placeholder="Texto opcional para complementar o banner"
              className={inputClassName}
              {...register("subtitle")}
            />
            {errors.subtitle ? (
              <p className="text-sm text-[#b42318]">{errors.subtitle.message}</p>
            ) : null}
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label
              htmlFor="imageUrl"
              className="text-[15px] font-semibold text-[var(--admin-text)]"
            >
              URL da imagem
            </Label>
            <Input
              id="imageUrl"
              placeholder="https://..."
              className={inputClassName}
              {...register("imageUrl")}
            />
            {errors.imageUrl ? (
              <p className="text-sm text-[#b42318]">{errors.imageUrl.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="linkUrl"
              className="text-[15px] font-semibold text-[var(--admin-text)]"
            >
              Link de destino
            </Label>
            <Input
              id="linkUrl"
              placeholder="https://..."
              className={inputClassName}
              {...register("linkUrl")}
            />
            {errors.linkUrl ? (
              <p className="text-sm text-[#b42318]">{errors.linkUrl.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="sortOrder"
              className="text-[15px] font-semibold text-[var(--admin-text)]"
            >
              Ordem
            </Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              className={inputClassName}
              {...register("sortOrder")}
            />
            {errors.sortOrder ? (
              <p className="text-sm text-[#b42318]">{errors.sortOrder.message}</p>
            ) : null}
          </div>
        </div>

        <label className="flex items-center gap-3 rounded-[14px] border border-[var(--admin-border)] bg-[var(--admin-primary-soft)] px-4 py-3 text-[15px] text-[var(--admin-text)]">
          <input
            id="isActive"
            type="checkbox"
            className="h-4 w-4 rounded border-[#d9cebf]"
            {...register("isActive")}
          />
          <span>Banner ativo</span>
        </label>

        {serverError ? (
          <div className="rounded-[14px] border border-[#f3c7c3] bg-[#fff1f0] px-4 py-3 text-sm text-[#b42318]">
            {serverError}
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-11 rounded-[14px] bg-[var(--admin-primary)] px-5 text-sm font-semibold text-white shadow-none hover:bg-[var(--admin-primary-strong)]"
          >
            {isSubmitting
              ? bannerId
                ? "Salvando..."
                : "Criando..."
              : bannerId
                ? "Salvar alteracoes"
                : "Salvar banner"}
          </Button>

          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-[14px] border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 text-sm font-semibold text-[var(--admin-text)] shadow-none hover:bg-[var(--admin-primary-soft)]"
            onClick={() => router.push("/admin/banners")}
          >
            Cancelar
          </Button>
        </div>
      </form>
    </section>
  );
}
