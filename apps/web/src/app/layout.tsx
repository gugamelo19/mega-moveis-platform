import type { Metadata } from "next";
import { Bree_Serif, Lobster_Two, Nunito_Sans } from "next/font/google";
import "./globals.css";

const headingFont = Bree_Serif({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: "400",
});

const bodyFont = Nunito_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700", "800"],
});

const displayFont = Lobster_Two({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Mega Móveis",
  description: "Catálogo e painel administrativo da Mega Móveis",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        className={`${headingFont.variable} ${bodyFont.variable} ${displayFont.variable} min-h-screen bg-(--mm-bg) font-sans text-(--mm-text) antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
