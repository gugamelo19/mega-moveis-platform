import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Novo produto</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cadastre um novo produto para o catálogo da loja.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}