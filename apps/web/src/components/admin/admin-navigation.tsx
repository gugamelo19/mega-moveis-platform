import type { AdminIconName } from "./admin-icons";

export type AdminNavigationItem = {
  href: string;
  label: string;
  icon: AdminIconName;
};

export const adminNavigation: AdminNavigationItem[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/products", label: "Produtos", icon: "package" },
  { href: "/admin/brands", label: "Marcas", icon: "tag" },
  { href: "/admin/banners", label: "Banners", icon: "image" },
  { href: "/admin/categories", label: "Categorias", icon: "layers" },
];

export function isAdminRouteActive(pathname: string, href: string) {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}
