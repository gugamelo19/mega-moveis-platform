import Link from "next/link";
import type { StoreSettings } from "@/features/store-settings/types/store-settings.type";

type StoreFooterProps = {
  storeSettings: StoreSettings;
};

export function StoreFooter({ storeSettings }: StoreFooterProps) {
  return (
    <footer className="border-t border-white/10 bg-[linear-gradient(135deg,#081c58_0%,#0c2f7a_58%,#1441a3_100%)] text-white/80">
      <div className="mx-auto max-w-7xl px-4 py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="font-(--font-heading) text-4xl tracking-tight text-white">
              MEGA <span className="text-(--mm-primary)">MÓVEIS</span>
            </h2>

            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              {storeSettings.aboutText ||
                `${storeSettings.storeName} oferece mÃ³veis, eletrodomÃ©sticos e atendimento prÃ³ximo para ajudar vocÃª a encontrar as melhores opÃ§Ãµes para sua casa.`}
            </p>
          </div>

          <div>
            <h3 className="font-(--font-heading) text-2xl text-white">
              Navegação
            </h3>

            <div className="mt-5 flex flex-col gap-3 text-sm text-white/70">
              <Link href="/products" className="transition hover:text-(--mm-primary)">
                Categorias
              </Link>
              <Link href="/#destaques" className="transition hover:text-(--mm-primary)">
                Destaques
              </Link>
              <Link href="/about" className="transition hover:text-(--mm-primary)">
                Sobre nós
              </Link>
              <Link href="/contact" className="transition hover:text-(--mm-primary)">
                Contato
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-(--font-heading) text-2xl text-white">
              Contato
            </h3>

            <div className="mt-5 space-y-4 text-sm text-white/70">
              {storeSettings.addressLine ? (
                <p>
                  {storeSettings.addressLine}
                  {storeSettings.city ? ` â€“ ${storeSettings.city}` : ""}
                  {storeSettings.state ? `, ${storeSettings.state}` : ""}
                </p>
              ) : null}

              {storeSettings.phoneNumber ? <p>{storeSettings.phoneNumber}</p> : null}

              {storeSettings.contactEmail ? <p>{storeSettings.contactEmail}</p> : null}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          Â© {new Date().getFullYear()} Mega Móveis. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
