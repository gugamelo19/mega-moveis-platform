import { ContactInfoList } from "@/components/store/contact-info-list";
import { SocialLinks } from "@/components/store/social-links";
import { WhatsAppCta } from "@/components/store/whatsapp-cta";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

export default async function AboutPage() {
  const storeSettings = await getPublicStoreSettings();

  return (
    <div className="bg-(--mm-bg)">
      <section className="border-b border-(--mm-border) bg-(--mm-surface)">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
            Sobre a loja
          </span>

          <h1 className="mt-4 text-5xl font-semibold text-(--mm-text) md:text-6xl">
            {storeSettings.aboutTitle || `Conheça a ${storeSettings.storeName}`}
          </h1>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-8">
          <p className="whitespace-pre-line text-base leading-8 text-(--mm-text-soft)">
            {storeSettings.aboutText ||
              `${storeSettings.storeName} oferece móveis, eletrodomésticos e itens para casa com atendimento próximo, confiança e foco em qualidade.`}
          </p>
        </section>

        <aside className="space-y-6 rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-8">
          <div>
            <h2 className="font-(--font-heading) text-3xl text-(--mm-text)">
              Fale com a gente
            </h2>

            <p className="mt-3 text-sm leading-7 text-(--mm-text-soft)">
              Tire dúvidas sobre produtos, disponibilidade, orçamento e atendimento.
            </p>

            <div className="mt-5">
              <WhatsAppCta
                whatsappNumber={storeSettings.whatsappNumber}
                storeName={storeSettings.storeName}
              />
            </div>
          </div>

          <div>
            <h3 className="font-(--font-heading) text-2xl text-(--mm-text)">
              Contato
            </h3>

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
            <h3 className="text-2xl font-semibold text-(--mm-text)">
              Redes sociais
            </h3>

            <div className="mt-4">
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