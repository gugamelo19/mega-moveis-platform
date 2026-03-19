import Link from "next/link";

type WhatsAppCtaProps = {
  whatsappNumber: string;
  storeName: string;
  message?: string;
};

export function WhatsAppCta({
  whatsappNumber,
  storeName,
  message,
}: WhatsAppCtaProps) {
  const finalMessage =
    message || `Olá! Gostaria de falar com a equipe da ${storeName}.`;

  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    finalMessage
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex h-11 items-center justify-center rounded-md bg-green-600 px-5 text-sm font-medium text-white transition hover:bg-green-700"
    >
      Falar no WhatsApp
    </Link>
  );
}