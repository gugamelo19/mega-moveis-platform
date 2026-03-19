"use client";

import { Box, ImageIcon, Layers3, ShoppingCart, Tags, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { getDashboardSummary } from "@/features/dashboard/services/get-dashboard-summary";
import type { DashboardSummary } from "@/features/dashboard/types/dashboard-summary.type";
import { getAccessToken } from "@/lib/auth-storage";

const statCards = [
  { key: "products", label: "Produtos", icon: Box },
  { key: "brands", label: "Marcas", icon: Tags },
  { key: "banners", label: "Banners", icon: ImageIcon },
  { key: "categories", label: "Categorias", icon: Layers3 },
] as const;

export default function AdminHomePage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const token = getAccessToken();
      if (!token) return;

      try {
        const data = await getDashboardSummary(token);
        setSummary(data);
      } finally {
        setLoading(false);
      }
    }

    void load();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="mm-page-title">Dashboard</h1>
        <p className="mm-page-subtitle">Visão geral do seu painel administrativo</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card) => {
          const Icon = card.icon;
          const value = summary
            ? card.key === "products"
              ? summary.products.total
              : card.key === "brands"
                ? summary.brands.total
                : card.key === "banners"
                  ? summary.banners.total
                  : summary.categories.total
            : 0;

          return (
            <div key={card.key} className="mm-card p-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--mm-surface-2)">
                  <Icon className="h-6 w-6 text-(--mm-primary)" />
                </div>

                <div>
                  <p className="text-sm text-(--mm-text-soft)">{card.label}</p>
                  <p className="text-4xl font-semibold text-(--mm-text)">
                    {loading ? "-" : value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <section className="mm-card p-6">
          <div className="mb-5 flex items-center gap-2">
            <ShoppingCart className="h-5 w-5 text-(--mm-primary)" />
            <h2 className="text-2xl font-semibold">
              Produtos Recentes
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-(--mm-surface-2) px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Sofá Retrátil 3 Lugares</p>
                  <p className="text-sm text-(--mm-text-soft)">Sala de Estar</p>
                </div>
                <span className="font-semibold text-(--mm-primary)">R$ 2.499,00</span>
              </div>
            </div>

            <div className="rounded-2xl bg-(--mm-surface-2) px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Mesa de Jantar Rústica</p>
                  <p className="text-sm text-(--mm-text-soft)">Cozinha</p>
                </div>
                <span className="font-semibold text-(--mm-primary)">R$ 1.899,00</span>
              </div>
            </div>

            <div className="rounded-2xl bg-(--mm-surface-2) px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Cama Box Queen Size</p>
                  <p className="text-sm text-(--mm-text-soft)">Quartos</p>
                </div>
                <span className="font-semibold text-(--mm-primary)">R$ 3.199,00</span>
              </div>
            </div>

            <div className="rounded-2xl bg-(--mm-surface-2) px-4 py-3">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="font-semibold">Escrivaninha Moderna</p>
                  <p className="text-sm text-(--mm-text-soft)">Escritório</p>
                </div>
                <span className="font-semibold text-(--mm-primary)">R$ 899,00</span>
              </div>
            </div>
          </div>
        </section>

        <section className="mm-card p-6">
          <div className="mb-5 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-(--mm-primary)" />
            <h2 className="text-2xl font-semibold">
              Resumo Rápido
            </h2>
          </div>

          <div className="space-y-4">
            <div className="rounded-2xl bg-(--mm-surface-2) p-4">
              <p className="text-sm text-(--mm-text-soft)">Produtos em destaque</p>
              <p className="mt-2 text-xl font-semibold">
                {summary ? summary.products.featured : "-"} produtos
              </p>
            </div>

            <div className="rounded-2xl bg-(--mm-surface-2) p-4">
              <p className="text-sm text-(--mm-text-soft)">Produtos em oferta</p>
              <p className="mt-2 text-xl font-semibold">
                {summary ? summary.products.onSale : "-"} produtos
              </p>
            </div>

            <div className="rounded-2xl bg-(--mm-surface-2) p-4">
              <p className="text-sm text-(--mm-text-soft)">Produtos disponíveis</p>
              <p className="mt-2 text-xl font-semibold">
                {summary ? summary.products.available : "-"} produtos
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}