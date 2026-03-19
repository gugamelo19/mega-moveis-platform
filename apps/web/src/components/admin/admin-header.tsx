"use client";

import { LayoutPanelLeft } from "lucide-react";

export function AdminHeader() {
  return (
    <header className="flex h-16 items-center gap-4 border-b border-(--mm-border) bg-(--mm-surface) px-6">
      <LayoutPanelLeft className="h-4 w-4 text-(--mm-text-soft)" />
      <span className="text-xl font-semibold text-(--mm-text)">
        Painel Administrativo
      </span>
    </header>
  );
}