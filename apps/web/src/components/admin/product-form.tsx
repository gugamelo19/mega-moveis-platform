"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
    <div className="mm-card p-8">
      <div className="mb-8">
        <h2 className="font-(--font-heading) text-4xl text-(--mm-text)">
          {productId ? "Editar produto" : "Novo produto"}
        </h2>
        <p className="mt-2 text-sm text-(--mm-text-soft)">
          Cadastre produtos com informações claras, organizadas e comerciais.
        </p>
      </div>

      {loadingOptions ? (
        <div className="rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) p-4 text-sm text-(--mm-text-soft)">
          Carregando categorias e marcas...
        </div>
      ) : (
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium text-(--mm-text)">
              Nome
            </label>
            <input
              id="name"
              placeholder="Ex.: Sofá Retrátil 3 Lugares"
              className="mm-input w-full"
              {...register("name")}
            />
            {errors.name ? (
              <p className="text-sm text-(--mm-danger)">{errors.name.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="shortDescription"
              className="text-sm font-medium text-(--mm-text)"
            >
              Descrição curta
            </label>
            <input
              id="shortDescription"
              placeholder="Resumo comercial do produto"
              className="mm-input w-full"
              {...register("shortDescription")}
            />
            {errors.shortDescription ? (
              <p className="text-sm text-(--mm-danger)">
                {errors.shortDescription.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="description"
              className="text-sm font-medium text-(--mm-text)"
            >
              Descrição
            </label>
            <textarea
              id="description"
              className="min-h-35 w-full rounded-[22px] border border-(--mm-border) bg-white px-4 py-3 text-sm outline-none transition focus:border-(--mm-primary)"
              placeholder="Descreva o produto..."
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-(--mm-danger)">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="price" className="text-sm font-medium text-(--mm-text)">
                Preço
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                min={0}
                className="mm-input w-full"
                {...register("price")}
              />
              {errors.price ? (
                <p className="text-sm text-(--mm-danger)">{errors.price.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="compareAtPrice"
                className="text-sm font-medium text-(--mm-text)"
              >
                Preço comparativo
              </label>
              <input
                id="compareAtPrice"
                type="number"
                step="0.01"
                min={0}
                className="mm-input w-full"
                {...register("compareAtPrice")}
              />
              {errors.compareAtPrice ? (
                <p className="text-sm text-(--mm-danger)">
                  {errors.compareAtPrice.message as string}
                </p>
              ) : null}
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="sku" className="text-sm font-medium text-(--mm-text)">
                SKU
              </label>
              <input
                id="sku"
                placeholder="Ex.: SOFA-RT-03"
                className="mm-input w-full"
                {...register("sku")}
              />
              {errors.sku ? (
                <p className="text-sm text-(--mm-danger)">{errors.sku.message}</p>
              ) : null}
            </div>

            <div className="space-y-2">
              <label
                htmlFor="categoryId"
                className="text-sm font-medium text-(--mm-text)"
              >
                Categoria
              </label>
              <select
                id="categoryId"
                className="mm-input w-full"
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
                <p className="text-sm text-(--mm-danger)">
                  {errors.categoryId.message}
                </p>
              ) : null}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="brandId" className="text-sm font-medium text-(--mm-text)">
              Marca
            </label>
            <select id="brandId" className="mm-input w-full" {...register("brandId")}>
              <option value="">Selecione uma marca</option>
              {brands.map((brand) => (
                <option key={brand.id} value={brand.id}>
                  {brand.name}
                </option>
              ))}
            </select>
            {errors.brandId ? (
              <p className="text-sm text-(--mm-danger)">{errors.brandId.message}</p>
            ) : null}
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <label className="flex items-center gap-3 rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) px-4 py-3">
              <input type="checkbox" {...register("isAvailable")} />
              <span className="text-sm text-(--mm-text)">Disponível</span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) px-4 py-3">
              <input type="checkbox" {...register("isFeatured")} />
              <span className="text-sm text-(--mm-text)">Destaque</span>
            </label>

            <label className="flex items-center gap-3 rounded-2xl border border-(--mm-border) bg-(--mm-surface-2) px-4 py-3">
              <input type="checkbox" {...register("isOnSale")} />
              <span className="text-sm text-(--mm-text)">Oferta</span>
            </label>
          </div>

          {serverError ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {serverError}
            </div>
          ) : null}

          <div className="flex items-center gap-3">
            <button type="submit" disabled={isSubmitting} className="mm-btn-primary">
              {isSubmitting
                ? "Salvando..."
                : productId
                  ? "Salvar alterações"
                  : "Salvar produto"}
            </button>

            <button
              type="button"
              onClick={() => router.push("/admin/products")}
              className="mm-btn-outline"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}