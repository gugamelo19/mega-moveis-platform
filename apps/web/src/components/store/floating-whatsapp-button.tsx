import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

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
      className="fixed bottom-5 right-5 z-50 inline-flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl transition hover:scale-110 hover:bg-green-600"
    >
      <FaWhatsapp size={18} />
    </Link>
  );
}