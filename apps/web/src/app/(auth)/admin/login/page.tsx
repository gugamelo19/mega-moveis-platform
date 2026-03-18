"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { useAccessToken } from "@/hooks/use-access-token";
import { useIsClient } from "@/hooks/use-is-client";

export default function AdminLoginPage() {
  const router = useRouter();
  const isClient = useIsClient();
  const token = useAccessToken();

  useEffect(() => {
    if (!isClient) return;

    if (token) {
      router.replace("/admin");
    }
  }, [isClient, router, token]);

  if (!isClient) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-10">
        <p className="text-sm text-slate-500">Carregando...</p>
      </section>
    );
  }

  if (token) {
    return (
      <section className="flex min-h-screen items-center justify-center px-6 py-10">
        <p className="text-sm text-slate-500">Redirecionando...</p>
      </section>
    );
  }

  return (
    <section className="flex min-h-screen items-center justify-center px-6 py-10">
      <AdminLoginForm />
    </section>
  );
}