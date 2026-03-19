import { ContactInfoList } from "@/components/store/contact-info-list";
import { SocialLinks } from "@/components/store/social-links";
import { WhatsAppCta } from "@/components/store/whatsapp-cta";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

export default async function AboutPage() {
  const storeSettings = await getPublicStoreSettings();

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-[1.4fr_0.8fr]">
        <section>
          <p className="text-sm font-medium text-slate-500">Sobre a loja</p>

          <h1 className="mt-2 text-3xl font-semibold text-slate-900">
            {storeSettings.aboutTitle || `Conheça a ${storeSettings.storeName}`}
          </h1>

          <div className="mt-6">
            <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
              {storeSettings.aboutText ||
                `${storeSettings.storeName} oferece móveis, eletrodomésticos e itens para casa com atendimento próximo e foco em confiança.`}
            </p>
          </div>
        </section>

        <aside className="space-y-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Fale com a gente
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Tire dúvidas sobre produtos, disponibilidade e atendimento.
            </p>

            <div className="mt-4">
              <WhatsAppCta
                whatsappNumber={storeSettings.whatsappNumber}
                storeName={storeSettings.storeName}
              />
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900">Contato</h3>
            <div className="mt-3">
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