"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  const pathname = usePathname();
  if (pathname === "/demo" || pathname.startsWith("/admin")) return null;

  return (
    <a
      href="/api/whatsapp"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition-all hover:bg-green-600 hover:shadow-xl hover:scale-110"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}
