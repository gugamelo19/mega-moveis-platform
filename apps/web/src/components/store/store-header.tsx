import Link from "next/link";
import Image from "next/image";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreHeaderProps = {
  storeSettings: StoreSettings;
};

export function StoreHeader({ storeSettings }: StoreHeaderProps) {
  return (
    <header className="sticky top-0 z-50 border-b border-(--mm-border) bg-[rgba(244,247,255,0.94)] backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4">
        <Link href={"/"} className="flex items-center">
          <Image
          src="/logo.png"
          alt="Mega Móveis"
          width={180}
          height={60}
          priority 
          />
        </Link>

        <nav className="hidden items-center gap-10 text-sm font-medium text-(--mm-text-soft) md:flex">
          <Link href="/products" className="transition hover:text-(--mm-primary)">
            Categorias
          </Link>
          <Link href="/#destaques" className="transition hover:text-(--mm-primary)">
            Destaques
          </Link>
          <Link href="/about" className="transition hover:text-(--mm-primary)">
            Sobre
          </Link>
          <Link href="/contact" className="transition hover:text-(--mm-primary)">
            Contato
          </Link>
        </nav>

        <Link
          href={`https://wa.me/${storeSettings.whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="inline-flex h-11 items-center gap-2 rounded-2xl bg-(--mm-primary) px-5 text-sm font-semibold text-(--mm-primary-foreground) transition hover:bg-(--mm-primary-hover)"
        >
          <span className="text-base"></span>
          <span>WhatsApp</span>
        </Link>
      </div>
    </header>
  );
}
