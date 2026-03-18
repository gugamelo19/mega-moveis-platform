"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { getProductImages } from "@/features/products/services/get-product-images";
import { deleteProductImage } from "@/features/products/services/delete-product-image";
import { getAccessToken } from "@/lib/auth-storage";

type ProductImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
};

type Props = {
  productId: string;
};

export function ProductImagesList({ productId }: Props) {
  const [images, setImages] = useState<ProductImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadImages = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      const data = await getProductImages({
        token,
        productId,
      });

      setImages(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao carregar imagens"
      );
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    void loadImages();
  }, [loadImages]);

  async function handleDelete(imageId: string) {
    const confirmed = window.confirm("Excluir esta imagem?");

    if (!confirmed) return;

    try {
      const token = getAccessToken();

      if (!token) {
        setError("Sessão não encontrada");
        return;
      }

      await deleteProductImage({
        token,
        imageId,
      });

      await loadImages();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Erro ao excluir imagem"
      );
    }
  }

  if (loading) {
    return (
      <p className="text-sm text-slate-500">
        Carregando imagens...
      </p>
    );
  }

  if (error) {
    return (
      <div className="text-sm text-red-600">
        {error}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className="text-sm text-slate-500">
        Nenhuma imagem cadastrada.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {images.map((img) => (
        <div
          key={img.id}
          className="relative rounded-lg border p-2"
        >
          <div className="relative h-32 w-full overflow-hidden rounded">
            <Image
              src={img.imageUrl}
              alt={img.altText ?? ""}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>

          {img.isPrimary && (
            <span className="absolute left-2 top-2 rounded bg-green-600 px-2 py-1 text-xs text-white">
              Principal
            </span>
          )}

          <div className="mt-2 flex justify-between">
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(img.id)}
            >
              Excluir
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}