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
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          {brandId ? "Editar marca" : "Nova marca"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Ex.: Electrolux" {...register("name")} />
            {errors.name ? (
              <p className="text-sm text-red-600">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="logoUrl">URL da logo</Label>
            <Input
              id="logoUrl"
              placeholder="https://..."
              {...register("logoUrl")}
            />
            {errors.logoUrl ? (
              <p className="text-sm text-red-600">{errors.logoUrl.message}</p>
            ) : null}
          </div>

          <div className="flex items-center gap-3">
            <input
              id="isActive"
              type="checkbox"
              className="h-4 w-4 rounded border-slate-300"
              {...register("isActive")}
            />
            <Label htmlFor="isActive">Marca ativa</Label>
          </div>

          {serverError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting
                ? brandId
                  ? "Salvando..."
                  : "Criando..."
                : brandId
                  ? "Salvar alterações"
                  : "Salvar marca"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin/brands")}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}