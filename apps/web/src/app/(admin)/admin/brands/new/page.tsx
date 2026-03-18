import { BrandForm } from "@/components/admin/brand-form";

export default function NewBrandPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nova marca</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cadastre uma nova marca para organizar o catálogo da loja.
        </p>
      </div>

      <BrandForm />
    </div>
  );
}