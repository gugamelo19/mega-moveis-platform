"use client";

import { AdminHeader } from "./admin-header";
import { AdminSidebar } from "./admin-sidebar";
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
        <p className="text-sm text-(--mm-text-soft)">Carregando...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-sm text-(--mm-text-soft)">Redirecionando...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-(--mm-bg)">
      <div className="flex">
        <AdminSidebar />

        <div className="flex min-h-screen flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 p-6">{children}</main>
        </div>
      </div>
    </div>
  );
}