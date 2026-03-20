import { BannerForm } from "@/components/admin/banner-form";

export default function NewBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-[2.3rem] font-semibold tracking-[-0.04em] text-[var(--admin-text)]">
          Novo Banner
        </h1>
        <p className="mt-1 text-[15px] text-[var(--admin-muted)]">
          Cadastre uma nova campanha visual para a home da loja
        </p>
      </div>

      <BannerForm />
    </div>
  );
}
