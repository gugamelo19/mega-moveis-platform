"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAdminBrands } from "@/features/brands/services/get-admin-brands";
import type { Brand } from "@/features/brands/types/brand.type";
import { getAdminCategories } from "@/features/categories/services/get-admin-categories";
import type { Category } from "@/features/categories/types/category.type";
import {
  productSchema,
  type ProductFormData,
  type ProductFormInput,
} from "@/features/products/schemas/product.schema";
import { createProduct } from "@/features/products/services/create-product";
import { updateProduct } from "@/features/products/services/update-product";
import { getAccessToken } from "@/lib/auth-storage";

type ProductFormProps = {
  productId?: string;
  defaultValues?: ProductFormInput;
};

export function ProductForm({
  productId,
  defaultValues,
}: ProductFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loadingOptions, setLoadingOptions] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormInput, unknown, ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: defaultValues ?? {
      name: "",
      shortDescription: "",
      description: "",
      price: 0,
      compareAtPrice: undefined,
      sku: "",
      isAvailable: true,
      isFeatured: false,
      isOnSale: false,
      categoryId: "",
      brandId: "",
    },
  });

  useEffect(() => {
    async function loadOptions() {
      try {
        const token = getAccessToken();

        if (!token) {
          setServerError("Sessão não encontrada");
          return;
        }

        const [categoriesResponse, brandsResponse] = await Promise.all([
          getAdminCategories({ token }),
          getAdminBrands({ token }),
        ]);

        setCategories(categoriesResponse);
        setBrands(brandsResponse);
      } catch (error) {
        setServerError(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar categorias e marcas"
        );
      } finally {
        setLoadingOptions(false);
      }
    }

    void loadOptions();
  }, []);

  async function onSubmit(data: ProductFormData) {
    try {
      setServerError(null);

      const token = getAccessToken();

      if (!token) {
        setServerError("Sessão não encontrada");
        return;
      }

      if (productId) {
        await updateProduct({
          token,
          id: productId,
          data,
        });
      } else {
        await createProduct({
          token,
          data,
        });
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : productId
            ? "Não foi possível atualizar o produto"
            : "Não foi possível criar o produto"
      );
    }
  }

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle className="text-xl">
          {productId ? "Editar produto" : "Novo produto"}
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loadingOptions ? (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-500">
            Carregando categorias e marcas...
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div className="space-y-2">
              <Label htmlFor="name">Nome</Label>
              <Input
                id="name"
                placeholder="Ex.: Geladeira Electrolux Frost Free 400L"
                {...register("name")}
              />
              {errors.name ? (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="shortDescription">Descrição curta</Label>
              <Input
                id="shortDescription"
                placeholder="Ex.: Geladeira frost free com 400 litros"
                {...register("shortDescription")}
              />
              {errors.shortDescription ? (
                <p className="text-sm text-red-600">
                  {errors.shortDescription.message}
                </p>
              ) : null}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <textarea
                id="description"
                className="min-h-30 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-slate-500"
                placeholder="Descreva o produto..."
                {...register("description")}
              />
              {errors.description ? (
                <p className="text-sm text-red-600">
                  {errors.description.message}
                </p>
              ) : null}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Preço</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("price")}
                />
                {errors.price ? (
                  <p className="text-sm text-red-600">{errors.price.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="compareAtPrice">Preço comparativo</Label>
                <Input
                  id="compareAtPrice"
                  type="number"
                  step="0.01"
                  min={0}
                  {...register("compareAtPrice")}
                />
                {errors.compareAtPrice ? (
                  <p className="text-sm text-red-600">
                    {errors.compareAtPrice.message as string}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="sku">SKU</Label>
                <Input
                  id="sku"
                  placeholder="Ex.: GEL-ELETRO-400"
                  {...register("sku")}
                />
                {errors.sku ? (
                  <p className="text-sm text-red-600">{errors.sku.message}</p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoryId">Categoria</Label>
                <select
                  id="categoryId"
                  className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
                  {...register("categoryId")}
                >
                  <option value="">Selecione uma categoria</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.categoryId ? (
                  <p className="text-sm text-red-600">
                    {errors.categoryId.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="brandId">Marca</Label>
              <select
                id="brandId"
                className="h-10 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-500"
                {...register("brandId")}
              >
                <option value="">Selecione uma marca</option>
                {brands.map((brand) => (
                  <option key={brand.id} value={brand.id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brandId ? (
                <p className="text-sm text-red-600">{errors.brandId.message}</p>
              ) : null}
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  {...register("isAvailable")}
                />
                <span className="text-sm text-slate-700">Disponível</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  {...register("isFeatured")}
                />
                <span className="text-sm text-slate-700">Destaque</span>
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-slate-300"
                  {...register("isOnSale")}
                />
                <span className="text-sm text-slate-700">Oferta</span>
              </label>
            </div>

            {serverError ? (
              <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {serverError}
              </div>
            ) : null}

            <div className="flex items-center gap-3">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting
                  ? "Salvando..."
                  : productId
                    ? "Salvar alterações"
                    : "Salvar produto"}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={() => router.push("/admin/products")}
              >
                Cancelar
              </Button>
            </div>
          </form>
        )}
      </CardContent>
    </Card>
  );
}