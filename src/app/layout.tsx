import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { Providers } from "@/lib/providers";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Costa Blanca Leads · Más clientes para tu inmobiliaria",
  description:
    "Aparece en Google cuando buscan propiedades en Calpe, Altea, Benidorm y toda la Costa Blanca. Genera más contactos para tu inmobiliaria.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="light min-h-dvh bg-white font-sans text-slate-900 antialiased dark:bg-slate-950 dark:text-slate-100">
        <Providers>
          {children}
          <WhatsAppButton />
        </Providers>
      </body>
    </html>
  );
}
