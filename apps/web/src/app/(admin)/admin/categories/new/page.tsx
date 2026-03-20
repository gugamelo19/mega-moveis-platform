import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="mm-page-title">Nova categoria</h1>
        <p className="mm-page-subtitle">
          Cadastre uma nova categoria para organizar os produtos.
        </p>
      </div>

      <CategoryForm />
    </div>
  );
}