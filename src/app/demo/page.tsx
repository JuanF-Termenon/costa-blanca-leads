import type { Metadata } from "next";
import { DemoPageContent } from "@/components/demo-page-content";
import { query, rowToProperty } from "@/lib/db";

function stripHtml(s: string) {
  return s.replace(/<[^>]*>/g, "").trim();
}

export async function generateMetadata(props: { searchParams: Promise<{ ref?: string }> }): Promise<Metadata> {
  const { ref } = await props.searchParams;
  if (!ref) return {};

  try {
    const result = await query("SELECT * FROM properties WHERE ref = $1 AND available = true", [ref]);
    if (result.rows.length === 0) return {};

    const row = result.rows[0] as Record<string, unknown>;
    const title = `${row.title} · ${row.price} · Costa Blanca Leads`;
    const description = stripHtml(String(row.desc || "")).slice(0, 200);
    const images: string[] = JSON.parse(String(row.images || "[]"));
    const imageUrl = images[0];

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        type: "website",
        ...(imageUrl ? { images: [{ url: imageUrl, width: 800, height: 600 }] } : {}),
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        ...(imageUrl ? { images: [imageUrl] } : {}),
      },
    };
  } catch {
    return {};
  }
}

export default async function DemoPage(props: { searchParams: Promise<{ ref?: string }> }) {
  const { ref } = await props.searchParams;
  return <DemoPageContent initialRef={ref} />;
}
