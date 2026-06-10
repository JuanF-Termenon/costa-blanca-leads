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
  title: "Calpe SEO · Landing pages para inmobiliarias",
  description:
    "Creamos landing pages con SEO local para inmobiliarias en Calpe. Aparece en Google y capta más clientes.",
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
