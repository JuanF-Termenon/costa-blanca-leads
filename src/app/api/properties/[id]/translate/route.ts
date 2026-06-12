import { NextResponse } from "next/server";
import { query } from "@/lib/db";
import { translateProperty } from "@/lib/auto-translate";

export async function POST(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;

    const result = await query("SELECT * FROM properties WHERE ref = $1", [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const property = result.rows[0];

    const translations = await translateProperty(property.type, property.title, property.location, property.desc);

    if (Object.keys(translations).length > 0) {
      await query("UPDATE properties SET translations = $1, \"updatedAt\" = now() WHERE id = $2", [
        JSON.stringify(translations),
        property.id,
      ]);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error translating property:", error);
    return NextResponse.json({ error: "Error translating property" }, { status: 500 });
  }
}
