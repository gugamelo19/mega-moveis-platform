import Link from "next/link";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreContactCardProps = {
  storeSettings: StoreSettings;
  productName: string;
};

export function StoreContactCard({
  storeSettings,
  productName,
}: StoreContactCardProps) {
  const message = `Olá! Tenho interesse no produto: ${productName}`;
  const whatsappHref = `https://wa.me/${storeSettings.whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <div className="rounded-[28px] border border-(--mm-border) bg-(--mm-surface) p-6">
      <h2 className="text-3xl font-semibold text-(--mm-text)">
        Interesse neste produto?
      </h2>

      <p className="mt-3 text-sm leading-7 text-(--mm-text-soft)">
        Fale com a equipe da {storeSettings.storeName} pelo WhatsApp e tire suas
        dúvidas sobre disponibilidade, condições e entrega.
      </p>

      <div className="mt-5">
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="mm-btn-primary h-12 px-6"
        >
          Falar no WhatsApp
        </Link>
      </div>

      <div className="mt-5 space-y-2 text-sm text-(--mm-text-soft)">
        {storeSettings.phoneNumber ? (
          <p>
            <span className="font-medium text-(--mm-text)">Telefone:</span>{" "}
            {storeSettings.phoneNumber}
          </p>
        ) : null}

        {storeSettings.contactEmail ? (
          <p>
            <span className="font-medium text-(--mm-text)">E-mail:</span>{" "}
            {storeSettings.contactEmail}
          </p>
        ) : null}
      </div>
    </div>
  );
}