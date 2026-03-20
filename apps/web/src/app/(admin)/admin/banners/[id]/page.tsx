"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { BannerForm } from "@/components/admin/banner-form";
import { getBannerById } from "@/features/banners/services/get-banner-by-id";
import type { Banner } from "@/features/banners/types/banner.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function EditBannerPage() {
  const params = useParams();
  const id = params.id as string;

  const [banner, setBanner] = useState<Banner | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBanner() {
      try {
        setError(null);

        const token = getAccessToken();

        if (!token) {
          setError("Sessão não encontrada");
          return;
        }

        const data = await getBannerById({
          token,
          id,
        });

        setBanner(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o banner"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadBanner();
  }, [id]);

  if (loading) {
    return (
      <div className="mm-card p-8 text-sm text-(--mm-text-soft)">
        Carregando banner...
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

  if (!banner) {
    return (
      <div className="mm-card p-8 text-sm text-(--mm-text-soft)">
        Banner não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Editar banner</h1>
        <p className="mm-page-subtitle">
          Atualize os dados do banner selecionado.
        </p>
      </div>

      <BannerForm
        bannerId={banner.id}
        defaultValues={{
          title: banner.title,
          subtitle: banner.subtitle ?? "",
          imageUrl: banner.imageUrl,
          linkUrl: banner.linkUrl ?? "",
          isActive: banner.isActive,
          sortOrder: banner.sortOrder,
        }}
      />
    </div>
  );
}