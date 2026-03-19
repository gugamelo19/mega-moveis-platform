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
          setError("Sessao nao encontrada");
          return;
        }

        const data = await getBannerById({
          token,
          id,
        });

        setBanner(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Nao foi possivel carregar o banner"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadBanner();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-[18px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-4 text-sm text-[var(--admin-muted)]">
        Carregando banner...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-[18px] border border-[#f3c7c3] bg-[#fff1f0] px-5 py-4 text-sm text-[#b42318]">
        {error}
      </div>
    );
  }

  if (!banner) {
    return (
      <div className="rounded-[18px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-4 text-sm text-[var(--admin-muted)]">
        Banner nao encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[2.3rem] font-semibold tracking-[-0.04em] text-[var(--admin-text)]">
          {banner.title}
        </h1>
        <p className="mt-1 text-[15px] text-[var(--admin-muted)]">
          Atualize os dados do banner selecionado
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
