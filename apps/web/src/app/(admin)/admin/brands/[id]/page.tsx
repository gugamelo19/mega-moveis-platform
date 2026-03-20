"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BrandForm } from "@/components/admin/brand-form";
import { getBrandById } from "@/features/brands/services/get-brand-by-id";
import type { Brand } from "@/features/brands/types/brand.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function EditBrandPage() {
  const params = useParams();
  const id = params.id as string;

  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBrand() {
      try {
        setError(null);

        const token = getAccessToken();

        if (!token) {
          setError("Sessão não encontrada");
          return;
        }

        const data = await getBrandById({
          token,
          id,
        });

        setBrand(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar a marca"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadBrand();
  }, [id]);

  if (loading) {
    return (
      <div className="mm-card p-8 text-sm text-(--mm-text-soft)">
        Carregando marca...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="mm-card p-8 text-sm text-(--mm-text-soft)">
        Marca não encontrada.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Editar marca</h1>
        <p className="mm-page-subtitle">
          Atualize os dados da marca selecionada.
        </p>
      </div>

      <BrandForm
        brandId={brand.id}
        defaultValues={{
          name: brand.name,
          logoUrl: brand.logoUrl ?? "",
          isActive: brand.isActive,
        }}
      />
    </div>
  );
}