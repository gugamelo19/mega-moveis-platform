"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { uploadProductImage } from "@/features/products/services/upload-product-image";
import { getAccessToken } from "@/lib/auth-storage";

type ProductImageUploadFormProps = {
  productId: string;
};

export function ProductImageUploadForm({
  productId,
}: ProductImageUploadFormProps) {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [altText, setAltText] = useState("");
  const [sortOrder, setSortOrder] = useState("0");
  const [isPrimary, setIsPrimary] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      setServerError(null);

      const token = getAccessToken();

      if (!token) {
        setServerError("Sessão não encontrada");
        return;
      }

      if (!file) {
        setServerError("Selecione uma imagem");
        return;
      }

      setSubmitting(true);

      await uploadProductImage({
        token,
        productId,
        file,
        altText: altText || undefined,
        sortOrder: Number(sortOrder),
        isPrimary,
      });

      router.push(`/admin/products/${productId}`);
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Não foi possível enviar a imagem"
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">Upload de imagem</CardTitle>
      </CardHeader>

      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="file">Imagem</Label>
            <Input
              id="file"
              type="file"
              accept="image/*"
              onChange={(event) =>
                setFile(event.target.files?.[0] ?? null)
              }
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="altText">Texto alternativo</Label>
            <Input
              id="altText"
              value={altText}
              onChange={(event) => setAltText(event.target.value)}
              placeholder="Ex.: Frente da geladeira"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sortOrder">Ordem</Label>
            <Input
              id="sortOrder"
              type="number"
              min={0}
              value={sortOrder}
              onChange={(event) => setSortOrder(event.target.value)}
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isPrimary}
              onChange={(event) => setIsPrimary(event.target.checked)}
            />
            <span className="text-sm text-slate-700">Definir como principal</span>
          </label>

          {serverError ? (
            <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {serverError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Enviando..." : "Enviar imagem"}
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(`/admin/products/${productId}`)}
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}