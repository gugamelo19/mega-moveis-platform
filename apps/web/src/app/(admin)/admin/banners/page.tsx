"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdminIcon } from "@/components/admin/admin-icons";
import { Button } from "@/components/ui/button";
import { deleteBanner } from "@/features/banners/services/delete-banner";
import { getAdminBanners } from "@/features/banners/services/get-admin-banners";
import type { Banner } from "@/features/banners/types/banner.type";
import { getAccessToken } from "@/lib/auth-storage";

function BannerPreview({ banner }: { banner: Banner }) {
  if (!banner.imageUrl) {
    return (
      <div className="flex h-full items-center justify-center bg-[var(--admin-primary-soft)] text-sm text-[var(--admin-muted)]">
        Sem imagem
      </div>
    );
  }

  return (
    <div
      className="h-full w-full bg-cover bg-center"
      style={{ backgroundImage: `url(${banner.imageUrl})` }}
      aria-label={banner.title}
    />
  );
}

export default function AdminBannersPage() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadBanners() {
    try {
      setError(null);
      setLoading(true);

      const token = getAccessToken();

      if (!token) {
        setError("Sessao nao encontrada");
        return;
      }

      const response = await getAdminBanners({ token });
      setBanners(response);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Nao foi possivel carregar os banners"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    void loadBanners();
  }, []);

  async function handleDelete(banner: Banner) {
    const confirmed = window.confirm(
      `Tem certeza que deseja excluir o banner "${banner.title}"?`
    );

    if (!confirmed) return;

    try {
      const token = getAccessToken();

      if (!token) {
        setError("Sessao nao encontrada");
        return;
      }

      await deleteBanner({
        token,
        id: banner.id,
      });

      await loadBanners();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Nao foi possivel excluir o banner"
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="font-display text-[2.3rem] font-semibold tracking-[-0.04em] text-[var(--admin-text)]">
            Banners
          </h1>
          <p className="mt-1 text-[15px] text-[var(--admin-muted)]">
            Gerencie os banners do site
          </p>
        </div>

        <Button
          asChild
          className="h-11 rounded-[14px] bg-[var(--admin-primary)] px-5 text-sm font-semibold text-white shadow-none hover:bg-[var(--admin-primary-strong)]"
        >
          <Link href="/admin/banners/new">
            <span className="inline-flex items-center gap-2">
              <AdminIcon name="plus" className="h-4 w-4" />
              Novo Banner
            </span>
          </Link>
        </Button>
      </div>

      {loading ? (
        <div className="rounded-[18px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-4 text-sm text-[var(--admin-muted)]">
          Carregando banners...
        </div>
      ) : null}

      {!loading && error ? (
        <div className="rounded-[18px] border border-[#f3c7c3] bg-[#fff1f0] px-5 py-4 text-sm text-[#b42318]">
          {error}
        </div>
      ) : null}

      {!loading && !error && banners.length === 0 ? (
        <div className="rounded-[18px] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-4 text-sm text-[var(--admin-muted)]">
          Nenhum banner cadastrado.
        </div>
      ) : null}

      {!loading && !error && banners.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {banners.map((banner) => (
            <article
              key={banner.id}
              className="overflow-hidden rounded-[20px] border border-[var(--admin-border)] bg-[var(--admin-surface)] shadow-[0_10px_30px_rgba(7,26,76,0.06)]"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[var(--admin-primary-soft)]">
                <BannerPreview banner={banner} />

                <span
                  className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
                    banner.isActive
                      ? "bg-[var(--admin-primary)] text-white"
                      : "bg-white/92 text-[var(--admin-muted)]"
                  }`}
                >
                  <AdminIcon
                    name={banner.isActive ? "eye" : "eye-off"}
                    className="h-3.5 w-3.5"
                  />
                  {banner.isActive ? "Ativo" : "Inativo"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 px-4 py-4">
                <div>
                  <p className="text-[15px] font-semibold text-[#171717]">
                    {banner.title}
                  </p>
                  <p className="mt-1 text-sm text-[var(--admin-muted)]">
                    Ordem: {banner.sortOrder}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/banners/${banner.id}`}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-[var(--admin-text)] transition hover:bg-[var(--admin-primary-soft)]"
                    aria-label={`Editar ${banner.title}`}
                  >
                    <AdminIcon name="pencil" className="h-4 w-4" />
                  </Link>

                  <button
                    type="button"
                    onClick={() => void handleDelete(banner)}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-[#ff4747] transition hover:bg-[#fff3f2]"
                    aria-label={`Excluir ${banner.title}`}
                  >
                    <AdminIcon name="trash" className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </div>
  );
}
