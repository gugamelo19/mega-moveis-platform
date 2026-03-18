"use client";

import { useEffect, useState } from "react";
import { DashboardSummaryCards } from "@/components/admin/dashboard-summary-cards";
import { getDashboardSummary } from "@/features/dashboard/services/get-dashboard-summary";
import type { DashboardSummary } from "@/features/dashboard/types/dashboard-summary.type"; 
import { getAccessToken } from "@/lib/auth-storage";

export default function AdminHomePage() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setError(null);

        const token = getAccessToken();

        if (!token) {
          setError("Sessão não encontrada");
          return;
        }

        const response = await getDashboardSummary(token);
        setSummary(response);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o dashboard"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadDashboard();
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <p className="mt-2 text-sm text-slate-600">
          Visão geral do catálogo e dos conteúdos da loja.
        </p>
      </div>

      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
          Carregando dados do dashboard...
        </div>
      ) : null}

      {!loading && error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {!loading && summary ? <DashboardSummaryCards summary={summary} /> : null}
    </div>
  );
}