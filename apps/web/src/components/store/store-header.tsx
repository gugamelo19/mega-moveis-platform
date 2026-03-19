import Image from "next/image";
import Link from "next/link";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreHeaderProps = {
  storeSettings: StoreSettings;
};

export function StoreHeader({ storeSettings }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-3">
          {storeSettings.logoUrl ? (
            <div className="relative h-10 w-10 overflow-hidden rounded">
              <Image
                src={storeSettings.logoUrl}
                alt={storeSettings.storeName}
                fill
                className="object-cover"
                sizes="40px"
              />
            </div>
          ) : null}

          <div className="flex flex-col">
            <span className="text-lg font-semibold text-slate-900">
              {storeSettings.storeName}
            </span>
            <span className="text-xs text-slate-500">
              Móveis e eletrodomésticos
            </span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          <Link href="/" className="transition hover:text-slate-900">
            Início
          </Link>
          <Link href="/products" className="transition hover:text-slate-900">
            Produtos
          </Link>
          <Link href="/about" className="transition hover:text-slate-900">
            Sobre
          </Link>
          <Link href="/contact" className="transition hover:text-slate-900">
            Contato
          </Link>
        </nav>

        <Link
          href={`https://wa.me/${storeSettings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="hidden h-10 items-center justify-center rounded-md bg-green-600 px-4 text-sm font-medium text-white transition hover:bg-green-700 md:inline-flex"
        >
          WhatsApp
        </Link>
      </div>
    </header>
  );
}