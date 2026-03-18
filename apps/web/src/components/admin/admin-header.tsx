"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { removeAccessToken } from "@/lib/auth-storage";

export function AdminHeader() {
  const router = useRouter();

  function handleLogout() {
    removeAccessToken();
    router.replace("/admin/login");
  }

  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6">
      <span className="text-sm text-slate-500">
        Painel administrativo
      </span>

      <Button variant="outline" onClick={handleLogout}>
        Sair
      </Button>
    </header>
  );
}