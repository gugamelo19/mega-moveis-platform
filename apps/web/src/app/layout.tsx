import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mega Móveis Platform",
  description:
    "Catálogo digital profissional para loja de móveis e eletrodomésticos.",
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}