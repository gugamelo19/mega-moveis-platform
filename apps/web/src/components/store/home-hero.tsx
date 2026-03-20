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
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#081c58_0%,#0c2f7a_56%,#ef232b_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.18),transparent_30%)]" />

        <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 py-20">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
              Transforme seu lar
            </span>

            <h1 className="mt-6 font-(--font-heading) text-5xl leading-[0.95] text-white md:text-7xl">
              Móveis que contam a{" "}
              <span className="text-[#ffb4b8]">sua história</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              Descubra móveis e eletrodomésticos com design, conforto e qualidade
              para cada ambiente da sua casa.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link href="/products" className="mm-btn-primary h-14 px-8 text-base">
                Explorar Catálogo
              </Link>

              <Link
                href="/contact"
                className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
              >
                Fale Conosco
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-10 border-t border-white/15 pt-8">
              <div>
                <p className="text-3xl font-semibold text-white">
                  500+
                </p>
                <p className="text-sm text-white/60">Produtos</p>
              </div>

              <div>
                <p className="font-(--font-heading) text-3xl text-white">
                  10+
                </p>
                <p className="text-sm text-white/60">Anos no mercado</p>
              </div>

              <div>
                <p className="font-(--font-heading) text-3xl text-white">
                  5.000+
                </p>
                <p className="text-sm text-white/60">Clientes felizes</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={banner.imageUrl}
          alt={banner.title}
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,28,88,0.92)_0%,rgba(8,28,88,0.62)_48%,rgba(8,28,88,0.16)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-[82vh] max-w-7xl items-center px-4 py-20">
        <div className="max-w-3xl">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium text-white">
           {storeName}
          </span>

          <h1 className="mt-6 font-(--font-heading) text-5xl leading-[0.95] text-white md:text-7xl">
            {banner.title}
          </h1>

          {banner.subtitle ? (
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80">
              {banner.subtitle}
            </p>
          ) : null}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href={banner.linkUrl || "/products"}
              className="mm-btn-primary h-14 px-8 text-base"
            >
              Explorar Catálogo
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-14 items-center justify-center rounded-2xl border border-white/25 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              Fale Conosco
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
