"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLoginForm } from "@/components/auth/admin-login-form";
import { AdminWordmark } from "@/components/brand/admin-wordmark";
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
    <section className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,#1b53cf,#0c2f7a_52%,#081c58)] px-6 py-10">
      <div className="w-full max-w-md rounded-[28px] border border-(--mm-border) bg-[rgba(255,255,255,0.96)] p-8 shadow-2xl">
        <div className="mb-8 text-center">
          <div className="flex justify-center">
            <AdminWordmark />
          </div>
          <p className="mt-3 text-sm text-(--mm-text-soft)">
            Painel Administrativo
          </p>
        </div>

        <AdminLoginForm />
      </div>
    </section>
  );
}
