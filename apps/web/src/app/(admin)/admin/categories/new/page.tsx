import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Nova categoria</h1>
        <p className="mt-2 text-sm text-slate-600">
          Cadastre uma nova categoria para organizar o catálogo da loja.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}