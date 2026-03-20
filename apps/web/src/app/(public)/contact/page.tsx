import { ContactInfoList } from "@/components/store/contact-info-list";
import { SocialLinks } from "@/components/store/social-links";
import { WhatsAppCta } from "@/components/store/whatsapp-cta";
import { getPublicStoreSettings } from "@/features/store-settings/services/get-public-store-settings";

export default async function ContactPage() {
  const storeSettings = await getPublicStoreSettings();

  return (
    <div className="bg-(--mm-bg)">
      <section className="border-b border-(--mm-border) bg-(--mm-surface)">
        <div className="mx-auto max-w-7xl px-4 py-16">
          <span className="inline-block text-sm font-semibold uppercase tracking-[0.22em] text-(--mm-primary)">
            Contato
          </span>

          <h1 className="mt-4 font-(--font-heading) text-5xl text-(--mm-text) md:text-6xl">
            Entre em contato com a {storeSettings.storeName}
          </h1>

          <p className="mt-4 max-w-2xl text-base leading-8 text-(--mm-text-soft)">
            Estamos disponíveis para falar sobre produtos, orçamento,
            disponibilidade e atendimento da loja.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 lg:grid-cols-2">
        <section className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-8">
          <h2 className="font-(--font-heading) text-3xl text-(--mm-text)">
            Vamos conversar
          </h2>

          <p className="mt-4 text-base leading-8 text-(--mm-text-soft)">
            Fale com nossa equipe para tirar dúvidas, consultar disponibilidade
            ou solicitar atendimento.
          </p>

          <div className="mt-6">
            <WhatsAppCta
              whatsappNumber={storeSettings.whatsappNumber}
              storeName={storeSettings.storeName}
              message={`Olá! Gostaria de falar com a equipe da ${storeSettings.storeName}.`}
            />
          </div>
        </section>

        <aside className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-8">
          <h2 className="font-(--font-heading) text-3xl text-(--mm-text)">
            Informações da loja
          </h2>

          <div className="mt-5">
            <ContactInfoList
              phoneNumber={storeSettings.phoneNumber}
              contactEmail={storeSettings.contactEmail}
              addressLine={storeSettings.addressLine}
              city={storeSettings.city}
              state={storeSettings.state}
              zipCode={storeSettings.zipCode}
            />
          </div>

          <div className="mt-8">
            <h3 className="font-(--font-heading) text-2xl text-(--mm-text)">
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
