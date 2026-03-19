import Link from "next/link";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreFooterProps = {
  storeSettings: StoreSettings;
};

export function StoreFooter({ storeSettings }: StoreFooterProps) {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900">
            {storeSettings.storeName}
          </h2>

          {storeSettings.aboutText ? (
            <p className="mt-3 text-sm leading-6 text-slate-600">
              {storeSettings.aboutText}
            </p>
          ) : null}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Contato</h3>

          <div className="mt-3 space-y-2 text-sm text-slate-600">
            {storeSettings.phoneNumber ? (
              <p>Telefone: {storeSettings.phoneNumber}</p>
            ) : null}

            {storeSettings.contactEmail ? (
              <p>E-mail: {storeSettings.contactEmail}</p>
            ) : null}

            {storeSettings.addressLine ? (
              <p>
                {storeSettings.addressLine}
                {storeSettings.city ? `, ${storeSettings.city}` : ""}
                {storeSettings.state ? ` - ${storeSettings.state}` : ""}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">Redes sociais</h3>

          <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600">
            {storeSettings.instagramUrl ? (
              <Link
                href={storeSettings.instagramUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-900"
              >
                Instagram
              </Link>
            ) : null}

            {storeSettings.facebookUrl ? (
              <Link
                href={storeSettings.facebookUrl}
                target="_blank"
                rel="noreferrer"
                className="transition hover:text-slate-900"
              >
                Facebook
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  );
}