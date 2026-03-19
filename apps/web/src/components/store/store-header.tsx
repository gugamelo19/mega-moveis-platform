import Link from "next/link";
import Image from "next/image";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreHeaderProps = {
  storeSettings: StoreSettings;
};

export function StoreHeader({ storeSettings }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--mm-border) bg-[rgba(249,246,241,0.92)] backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          {storeSettings.logoUrl ? (
            <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-(--mm-border) bg-white">
              <Image
                src={storeSettings.logoUrl}
                alt={storeSettings.storeName}
                fill
                className="object-cover"
                sizes="44px"
              />
            </div>
          ) : null}

          <span className="text-4xl font-semibold tracking-tight text-(--mm-text)">
            MEGA <span className="text-(--mm-primary)">MÓVEIS</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-(--mm-text-soft) md:flex">
          <Link href="/products" className="transition hover:text-(--mm-text)">
            Categorias
          </Link>
          <Link href="/#destaques" className="transition hover:text-(--mm-text)">
            Destaques
          </Link>
          <Link href="/about" className="transition hover:text-(--mm-text)">
            Sobre
          </Link>
          <Link href="/contact" className="transition hover:text-(--mm-text)">
            Contato
          </Link>
        </nav>

        <Link
          href={`https://wa.me/${storeSettings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-(--mm-primary) px-5 text-sm font-semibold text-(--mm-primary-foreground) transition hover:bg-[var(--mm-primary-hover)]"
        >
          <span className="text-base">◔</span>
          <span>WhatsApp</span>
        </Link>
      </div>
    </header>
  );
}