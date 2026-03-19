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
    if (token) router.replace("/admin");
  }, [isClient, token, router]);

  if (!isClient) return null;

  return (
    <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#6a432c,#3a2418_55%,#2b1a11)] px-6 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-white/10 bg-(--mm-surface) p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <h1 className="font-(--font-heading) text-4xl text-(--mm-text)">
            MEGA <span className="text-(--mm-primary)">MÓVEIS</span>
          </h1>
          <p className="mt-3 text-sm text-(--mm-text-soft)">
            Painel Administrativo
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </section>
  );
}