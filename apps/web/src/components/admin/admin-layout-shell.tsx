"use client";

import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { useAccessToken } from "@/hooks/use-access-token";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import { useIsClient } from "@/hooks/use-is-client";

type Props = {
  children: React.ReactNode;
};

export function AdminLayoutShell({ children }: Props) {
  const isClient = useIsClient();
  const token = useAccessToken();

  const isAuthenticated = isClient && Boolean(token);

  useAdminAuth(isClient, isAuthenticated);

  if (!isClient) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Carregando painel...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-slate-500">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-100">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader />

        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}