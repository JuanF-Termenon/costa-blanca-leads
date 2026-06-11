import { redirect } from "next/navigation";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const text = searchParams.get("text") || "";
  const phone = process.env.WHATSAPP_PHONE || "34691157183";
  const waUrl = text
    ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${phone}`;
  redirect(waUrl);
}
