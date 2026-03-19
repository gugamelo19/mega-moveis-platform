"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImage = {
  id: string;
  imageUrl: string;
  altText: string | null;
  isPrimary: boolean;
  sortOrder: number;
};

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({
  images,
  productName,
}: ProductGalleryProps) {
  const sortedImages = [...images].sort((a, b) => {
    if (a.isPrimary && !b.isPrimary) return -1;
    if (!a.isPrimary && b.isPrimary) return 1;
    return a.sortOrder - b.sortOrder;
  });

  const [selectedImage, setSelectedImage] = useState<ProductImage | null>(
    sortedImages[0] ?? null
  );

  return (
    <div className="space-y-4">
      <div className="relative h-80 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-105">
        {selectedImage ? (
          <Image
            src={selectedImage.imageUrl}
            alt={selectedImage.altText ?? productName}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Sem imagem disponível
          </div>
        )}
      </div>

      {sortedImages.length > 1 ? (
        <div className="grid grid-cols-4 gap-3">
          {sortedImages.map((image) => {
            const isSelected = selectedImage?.id === image.id;

            return (
              <button
                key={image.id}
                type="button"
                onClick={() => setSelectedImage(image)}
                className={`relative h-24 overflow-hidden rounded-xl border ${
                  isSelected ? "border-slate-900" : "border-slate-200"
                }`}
              >
                <Image
                  src={image.imageUrl}
                  alt={image.altText ?? productName}
                  fill
                  className="object-cover"
                  sizes="25vw"
                />
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}