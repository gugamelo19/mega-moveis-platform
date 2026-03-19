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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
      <h2 className="text-sm font-semibold text-slate-900">
        Interesse neste produto?
      </h2>

      <p className="mt-2 text-sm text-slate-600">
        Fale com a equipe da {storeSettings.storeName} pelo WhatsApp e tire suas
        dúvidas.
      </p>

      <div className="mt-4">
        <Link
          href={whatsappHref}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center justify-center rounded-md bg-green-600 px-5 text-sm font-medium text-white transition hover:bg-green-700"
        >
          Falar no WhatsApp
        </Link>
      </div>

      <div className="mt-4 space-y-1 text-sm text-slate-600">
        {storeSettings.phoneNumber ? (
          <p>Telefone: {storeSettings.phoneNumber}</p>
        ) : null}

        {storeSettings.contactEmail ? (
          <p>E-mail: {storeSettings.contactEmail}</p>
        ) : null}
      </div>
    </div>
  );
}