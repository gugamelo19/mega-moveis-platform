import { BannerForm } from "@/components/admin/banner-form";

export default function NewBannerPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Novo banner</h1>
        <p className="mm-page-subtitle">
          Cadastre um novo banner para campanhas e destaques da loja.
        </p>
      </div>

      <BannerForm />
    </div>
  );
}