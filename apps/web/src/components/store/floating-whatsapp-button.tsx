import Link from "next/link";

type FloatingWhatsAppButtonProps = {
  whatsappNumber: string;
  storeName: string;
};

export function FloatingWhatsAppButton({
  whatsappNumber,
  storeName,
}: FloatingWhatsAppButtonProps) {
  const message = `Olá! Gostaria de falar com a equipe da ${storeName}.`;
  const href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    message
  )}`;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-600 text-white shadow-lg transition hover:scale-105 hover:bg-green-700"
    >
      <span className="text-xl">💬</span>
    </Link>
  );
}