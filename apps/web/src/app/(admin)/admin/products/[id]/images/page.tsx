import { ProductImageUploadForm } from "@/components/admin/product-image-upload-form";

type ProductImagesPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProductImagesPage({
  params,
}: ProductImagesPageProps) {
  const { id } = await params;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Adicionar imagem ao produto</h1>
        <p className="mt-2 text-sm text-slate-600">
          Faça upload de uma nova imagem para este produto.
        </p>
      </div>

      <ProductImageUploadForm productId={id} />
    </div>
  );
}