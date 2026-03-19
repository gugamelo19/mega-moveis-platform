import Image from "next/image";
import Link from "next/link";
import type { Banner } from "@/features/banners/types/banner.type";

type HomeHeroProps = {
  banner: Banner | null;
  storeName: string;
};

export function HomeHero({ banner, storeName }: HomeHeroProps) {
  if (!banner) {
    return (
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-16 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-slate-500">
              Bem-vindo à {storeName}
            </p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
              Móveis e eletrodomésticos para sua casa
            </h1>
            <p className="mt-4 text-base text-slate-600">
              Encontre produtos com ótima apresentação e fale com nossa equipe
              pelo WhatsApp.
            </p>

            <div className="mt-6">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-b border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-medium text-slate-500">{storeName}</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900">
            {banner.title}
          </h1>

          {banner.subtitle ? (
            <p className="mt-4 text-base text-slate-600">{banner.subtitle}</p>
          ) : null}

          <div className="mt-6 flex gap-3">
            <Link
              href={banner.linkUrl || "/products"}
              className="inline-flex h-11 items-center justify-center rounded-md bg-slate-900 px-5 text-sm font-medium text-white transition hover:bg-slate-800"
            >
              Ver agora
            </Link>

            <Link
              href="/products"
              className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Explorar catálogo
            </Link>
          </div>
        </div>

        <div className="relative h-72 overflow-hidden rounded-2xl bg-slate-100 md:h-105">
          <Image
            src={banner.imageUrl}
            alt={banner.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  );
}