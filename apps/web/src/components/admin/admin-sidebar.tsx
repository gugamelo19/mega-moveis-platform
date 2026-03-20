"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ImageIcon,
  LayoutDashboard,
  Layers3,
  LogOut,
  Package,
  Tags,
} from "lucide-react";
import { AdminWordmark } from "@/components/brand/admin-wordmark";
import { cn } from "@/lib/utils";
import { removeAccessToken } from "@/lib/auth-storage";

const menuItems = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Produtos", href: "/admin/products", icon: Package },
  { title: "Marcas", href: "/admin/brands", icon: Tags },
  { title: "Banners", href: "/admin/banners", icon: ImageIcon },
  { title: "Categorias", href: "/admin/categories", icon: Layers3 },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    removeAccessToken();
    router.replace("/admin/login");
  }

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-(--mm-border) bg-(--mm-surface)">
      <div className="border-b border-(--mm-border) px-6 py-5">
        <Link href="/admin" className="block">
          <AdminWordmark />
        </Link>
      </div>

      <div className="flex-1 px-4 py-8">
        <p className="mb-4 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-(--mm-text-soft)">
          Menu
        </p>

        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition",
                  active
                    ? "bg-(--mm-surface-2) text-(--mm-text)"
                    : "text-(--mm-text-soft) hover:bg-(--mm-surface-2) hover:text-(--mm-text)"
                )}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.title}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="border-t border-(--mm-border) p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-(--mm-text-soft) transition hover:bg-(--mm-surface-2) hover:text-(--mm-danger)"
        >
          <LogOut className="h-4 w-4" />
          <span>Sair</span>
        </button>
      </div>
    </aside>
  );
}
