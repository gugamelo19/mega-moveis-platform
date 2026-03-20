import { FloatingWhatsAppButton } from "@/components/store/floating-whatsapp-button";
import { StoreFooter } from "@/components/store/store-footer";
import { StoreHeader } from "@/components/store/store-header";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

type PublicLayoutProps = {
  children: React.ReactNode;
};

export default async function PublicLayout({ children }: PublicLayoutProps) {
  const storeSettings = await getPublicStoreSettings();

  return (
    <div className="min-h-screen bg-(--mm-bg) text-(--mm-text)">
      <StoreHeader storeSettings={storeSettings} />
      <main>{children}</main>
      <StoreFooter storeSettings={storeSettings} />
      <FloatingWhatsAppButton
        whatsappNumber={storeSettings.whatsappNumber}
        storeName={storeSettings.storeName}
      />
    </div>
  );
}