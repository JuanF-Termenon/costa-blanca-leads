import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
    "Creamos tu web con SEO local para que tu inmobiliaria aparezca en Google cuando buscan propiedades en Calpe, Altea, Benidorm y toda la Costa Blanca.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-dvh bg-white font-sans text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
