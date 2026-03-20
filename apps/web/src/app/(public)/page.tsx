import { HomeAbout } from "@/components/store/home-about";
import { HomeHero } from "@/components/store/home-hero";
import { HomeSection } from "@/components/store/home-section";
import { getPublicBanners } from "@/features/banners/services/get-public-banners";
import { getFeaturedProducts } from "@/features/products/services/get-featured-products";
import { getOnSaleProducts } from "@/features/products/services/get-on-sale-products";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";
import { Truck, ShieldCheck, CreditCard, Headphones, Headset } from "lucide-react";

export default async function PublicHomePage() {
  const [storeSettings, banners, featuredProducts, onSaleProducts] =
    await Promise.all([
      getPublicStoreSettings(),
      getPublicBanners(),
      getFeaturedProducts(),
      getOnSaleProducts(),
    ]);

  const mainBanner = banners[0] ?? null;

  return (
    <div>
      <HomeHero banner={mainBanner} storeName={storeSettings.storeName} />

      <section className="border-y border-(--mm-border) bg-(--mm-surface-2) py-16 md:py-20">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--mm-primary) text-white">
              <Truck size={28} />
            </div>
            <h3 className="font-(--font-heading) text-2xl">Entrega Rápida</h3>
            <p className="mt-2 text-sm leading-7 text-(--mm-text-soft)">
              Entregamos e montamos em toda a região com agilidade.
            </p>
          </div>

          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--mm-primary) text-white">
                <ShieldCheck size={28} />
            </div>
            <h3 className="font-(--font-heading) text-2xl">Garantia de Fábrica</h3>
            <p className="mt-2 text-sm leading-7 text-(--mm-text-soft)">
              Todos os produtos possuem garantia oficial do fabricante.
            </p>
          </div>
            
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--mm-primary) text-white">
              <CreditCard size={28} />
            </div>
            <h3 className="font-(--font-heading) text-2xl">Parcele em até 12x</h3>
            <p className="mt-2 text-sm leading-7 text-(--mm-text-soft)">
              Condiçõess facilitadas para você mobiliar sua casa.
            </p>
          </div>
            
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-(--mm-primary) text-white">
              <Headphones size={28} />
            </div>
            <h3 className="font-(--font-heading) text-2xl">Atendimento Premium</h3>
            <p className="mt-2 text-sm leading-7 text-(--mm-text-soft)">
              Equipe especializada para ajudar na melhor escolha.
            </p>
          </div>
        </div>
      </section>

      <HomeSection
        eyebrow="Selecionados para você"
        title="Produtos em Destaque"
        description="Confira alguns dos principais produtos do nosso catálogo."
        products={featuredProducts}
        id="destaques"
      />

      <HomeSection
        eyebrow="Aproveite agora"
        title="Ofertas Especiais"
        description="Produtos com condições especiais para você renovar sua casa."
        products={onSaleProducts}
      />

      <section className="bg-[linear-gradient(135deg,#081c58_0%,#0c2f7a_55%,#1441a3_100%)] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-4 text-center">
          
          {/* Ícone */}
          <div className="mx-auto mb-6 flex justify-center text-(--mm-primary) transition-transform hover:scale-110">
            <Headset className="h-14 w-14" />
          </div>

          <h2 className="font-(--font-heading) text-5xl text-white md:text-6xl">
            Fale com um especialista
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-white/80">
            Tire dúvidas, veja orçamentos ou agende uma visita. Nossa equipe está
            pronta para ajudar você a encontrar o móvel perfeito.
          </p>

          <a
            href={`https://wa.me/${storeSettings.whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
            className="mt-10 inline-flex h-16 items-center justify-center rounded-2xl bg-(--mm-primary) px-10 text-lg font-semibold text-(--mm-primary-foreground) transition hover:bg-(--mm-primary-hover) hover:scale-105"
          >
            Chamar no WhatsApp
          </a>

          <p className="mt-5 text-sm text-white/50">
            Respondemos em minutos durante o horário comercial
          </p>
        </div>
      </section>

      {storeSettings.aboutTitle && storeSettings.aboutText ? (
        <HomeAbout title={storeSettings.aboutTitle} text={storeSettings.aboutText} />
      ) : null}
    </div>
  );
}
