import { NextResponse } from "next/server";
import { query, rowToProperty } from "@/lib/db";

async function defaultClientId(): Promise<string | null> {
  const result = await query('SELECT id FROM clients WHERE slug = $1', ['inmobiliaria-calpe']);
  return result.rows[0]?.id ?? null;
}

export async function GET() {
  try {
    const clientId = await defaultClientId();
    if (!clientId) return NextResponse.json([]);

    const result = await query(
      'SELECT * FROM properties WHERE "clientId" = $1 ORDER BY ref ASC',
      [clientId]
    );

    return NextResponse.json(result.rows.map(rowToProperty));
  } catch (error) {
    console.error("Error reading properties:", error);
    return NextResponse.json({ error: "Error reading properties" }, { status: 500 });
  }
}

function nextRef(properties: { ref: string }[], purpose: string) {
  const prefix = purpose === "venta" ? "CBL-1" : "CBL-2";
  const existing = properties
    .filter((p) => p.ref.startsWith(prefix))
    .map((p) => parseInt(p.ref.slice(5), 10));
  const max = existing.length > 0 ? Math.max(...existing) : (purpose === "venta" ? 100 : 200);
  return prefix + String(max + 1).padStart(2, "0");
}

export async function POST(request: Request) {
  try {
    const clientId = await defaultClientId();
    if (!clientId) return NextResponse.json({ error: "No default client" }, { status: 500 });

    const body = await request.json();
    const { title, location, price, beds, baths, m2, type, purpose, images, coords, desc } = body;

    if (!title || !price || !type || !purpose || !desc) {
      return NextResponse.json({ error: "Faltan campos obligatorios" }, { status: 400 });
    }

    const existing = await query(
      'SELECT ref FROM properties WHERE "clientId" = $1',
      [clientId]
    );
    const ref = nextRef(existing.rows, purpose);

    const result = await query(
      `INSERT INTO properties (ref, "clientId", title, location, price, beds, baths, m2, type, purpose, "desc", images, lat, lng)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [
        ref, clientId, title, location || "", price,
        beds ?? 0, baths ?? 0, m2 ?? 0, type, purpose, desc,
        JSON.stringify(images || []), coords?.lat ?? 38.645, coords?.lng ?? 0.045,
      ]
    );

    return NextResponse.json(rowToProperty(result.rows[0]), { status: 201 });
  } catch (error) {
    console.error("Error creating property:", error);
    return NextResponse.json({ error: "Error creating property" }, { status: 500 });
  }
}
