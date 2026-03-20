import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/features/categories/types/category.type";

type HomeCategoriesProps = {
  categories: Category[];
};

export function HomeCategories({ categories }: HomeCategoriesProps) {
  if (categories.length === 0) {
    return null;
  }

  const visibleCategories = categories.slice(0, 4);

  return (
    <section className="bg-(--mm-bg) py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-14 text-center">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
            Navegue por
          </span>

          <h2 className="mt-4 font-(--font-heading) text-5xl text-(--mm-text)">
            Categorias
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {visibleCategories.map((category) => (
            <Link
              key={category.id}
              href={`/products?categoryId=${category.id}`}
              className="group relative overflow-hidden rounded-[28px]"
            >
              <div className="relative aspect-4/5 bg-(--mm-surface-2)">
                {category.imageUrl ? (
                  <Image
                    src="/logo.png"
                    alt="Mega Móveis"
                    fill
                    className="object-cover transition duration-700 group-hover:scale-105"
                    sizes="(max-width: 1280px) 50vw, 25vw"
                  />
                ) : null}

                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(43,26,17,0.82),rgba(43,26,17,0.18),transparent)]" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-(--font-heading) text-3xl text-white">
                  {category.name}
                </h3>

                <p className="mt-1 text-sm text-white/75">
                  Explorar categoria
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}