import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

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
      className="mm-btn-primary inline-flex items-center gap-2 h-12 px-6"
    >
      <FaWhatsapp size={18} />
      Falar no WhatsApp
    </Link>
  );
}