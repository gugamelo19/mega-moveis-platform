import { HomeAbout } from "@/components/store/home-about";
import { HomeHero } from "@/components/store/home-hero";
import { HomeSection } from "@/components/store/home-section";
import { getPublicBanners } from "@/features/banners/services/get-public-banners";
import { getFeaturedProducts } from "@/features/products/services/get-featured-products";
import { getOnSaleProducts } from "@/features/products/services/get-on-sale-products";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

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
      <HomeHero
        banner={mainBanner}
        storeName={storeSettings.storeName}
      />

      <HomeSection
        title="Produtos em destaque"
        description="Confira alguns dos principais produtos do nosso catálogo."
        products={featuredProducts}
      />

      <HomeSection
        title="Ofertas"
        description="Aproveite os produtos marcados com preço promocional."
        products={onSaleProducts}
      />

      {storeSettings.aboutTitle && storeSettings.aboutText ? (
        <HomeAbout
          title={storeSettings.aboutTitle}
          text={storeSettings.aboutText}
        />
      ) : null}
    </div>
  );
}