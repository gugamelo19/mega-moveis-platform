import { AdminLayoutShell } from "@/components/admin/admin-layout-shell";

type Props = {
  children: React.ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return <AdminLayoutShell>{children}</AdminLayoutShell>;
}