import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Novo produto</h1>
        <p className="mm-page-subtitle">
          Cadastre um novo produto para o catálogo da Mega Móveis.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}