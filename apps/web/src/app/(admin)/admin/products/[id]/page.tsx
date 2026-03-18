"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductForm } from "@/components/admin/product-form";
import { ProductImagesList } from "@/components/admin/product-images-list";
import { getProductById } from "@/features/products/services/get-product-by-id";
import type { Product } from "@/features/products/types/product.type";
import { getAccessToken } from "@/lib/auth-storage";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProduct() {
      try {
        setError(null);

        const token = getAccessToken();

        if (!token) {
          setError("Sessão não encontrada");
          return;
        }

        const data = await getProductById({
          token,
          id,
        });

        setProduct(data);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Não foi possível carregar o produto"
        );
      } finally {
        setLoading(false);
      }
    }

    void loadProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Carregando produto...
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!product) {
    return (
      <div className="rounded-xl border border-slate-200 bg-white p-6 text-sm text-slate-500">
        Produto não encontrado.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Editar produto</h1>
        <p className="mt-2 text-sm text-slate-600">
          Atualize os dados principais do produto selecionado.
        </p>
      </div>

      <ProductForm
        productId={product.id}
        defaultValues={{
          name: product.name,
          shortDescription: product.shortDescription ?? "",
          description: product.description,
          price: Number(product.price),
          compareAtPrice: product.compareAtPrice
            ? Number(product.compareAtPrice)
            : undefined,
          sku: product.sku ?? "",
          isAvailable: product.isAvailable,
          isFeatured: product.isFeatured,
          isOnSale: product.isOnSale,
          categoryId: product.categoryId,
          brandId: product.brandId,
        }}
      />

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Imagens</h2>

          <Button asChild>
            <Link href={`/admin/products/${product.id}/images`}>
              Adicionar imagem
            </Link>
          </Button>
        </div>

        <ProductImagesList productId={product.id} />
      </div>
    </div>
  );
}