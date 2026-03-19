import { ContactInfoList } from "@/components/store/contact-info-list";
import { SocialLinks } from "@/components/store/social-links";
import { WhatsAppCta } from "@/components/store/whatsapp-cta";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

export default async function ContactPage() {
  const storeSettings = await getPublicStoreSettings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1fr_1fr]">
        <section>
          <p className="text-sm font-medium text-slate-500">Contato</p>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            Entre em contato com a {storeSettings.storeName}
          </h1>

          <p className="mt-4 text-sm leading-7 text-slate-600">
            Estamos disponíveis para falar sobre produtos, orçamento,
            disponibilidade e atendimento da loja.
          </p>

          <div className="mt-6">
            <WhatsAppCta
              whatsappNumber={storeSettings.whatsappNumber}
              storeName={storeSettings.storeName}
              message={`Olá! Gostaria de falar com a equipe da ${storeSettings.storeName}.`}
            />
          </div>
        </section>

        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Informações da loja
            </h2>

            <div className="mt-4">
              <ContactInfoList
                phoneNumber={storeSettings.phoneNumber}
                contactEmail={storeSettings.contactEmail}
                addressLine={storeSettings.addressLine}
                city={storeSettings.city}
                state={storeSettings.state}
                zipCode={storeSettings.zipCode}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Redes sociais</h3>
            <div className="mt-3">
              <SocialLinks
                instagramUrl={storeSettings.instagramUrl}
                facebookUrl={storeSettings.facebookUrl}
              />
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}