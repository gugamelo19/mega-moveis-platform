import { BrandForm } from "@/components/admin/brand-form";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Nova marca</h1>
        <p className="mm-page-subtitle">
          Cadastre uma nova marca para organizar o catálogo.
        </p>
      </div>

      <BrandForm />
    </div>
  );
}