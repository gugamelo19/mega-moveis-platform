import Link from "next/link";

type WhatsAppButtonProps = {
  phoneNumber: string;
  productName: string;
};

export function WhatsAppButton({
  phoneNumber,
  productName,
}: WhatsAppButtonProps) {
  const message = `Olá! Tenho interesse no produto: ${productName}`;
  const href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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