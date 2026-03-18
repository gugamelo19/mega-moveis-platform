"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAdminAuth(
  isClient: boolean,
  isAuthenticated: boolean
) {
  const router = useRouter();

  useEffect(() => {
    if (!isClient) return;

    if (!isAuthenticated) {
      router.replace("/admin/login");
    }
  }, [isClient, isAuthenticated, router]);
}