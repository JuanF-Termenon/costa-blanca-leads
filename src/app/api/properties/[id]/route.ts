import { NextResponse } from "next/server";
import { query, rowToProperty } from "@/lib/db";
import { translateProperty } from "@/lib/auto-translate";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await query('SELECT * FROM properties WHERE ref = $1', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json(rowToProperty(result.rows[0]));
  } catch {
    return NextResponse.json({ error: "Error reading property" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const existing = await query('SELECT * FROM properties WHERE ref = $1', [id]);
    if (existing.rows.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const cur = existing.rows[0];
    const updatedTitle = body.title ?? cur.title;
    const updatedLocation = body.location ?? cur.location;
    const updatedType = body.type ?? cur.type;
    const updatedDesc = body.desc ?? cur.desc;

    const result = await query(
      `UPDATE properties SET title=$1, location=$2, price=$3, beds=$4, baths=$5, m2=$6, type=$7, purpose=$8, "desc"=$9, images=$10, lat=$11, lng=$12, "available"=$13, "updatedAt"=now()
       WHERE ref=$14 RETURNING *`,
      [
        updatedTitle,
        updatedLocation,
        body.price ?? cur.price,
        body.beds ?? cur.beds,
        body.baths ?? cur.baths,
        body.m2 ?? cur.m2,
        updatedType,
        body.purpose ?? cur.purpose,
        updatedDesc,
        body.images ? JSON.stringify(body.images) : cur.images,
        body.coords?.lat ?? cur.lat,
        body.coords?.lng ?? cur.lng,
        body.available !== undefined ? body.available : cur.available,
        id,
      ]
    );

    const property = result.rows[0];

    if (body.translations && typeof body.translations === "object") {
      await query(
        `UPDATE properties SET translations = $1 WHERE id = $2`,
        [JSON.stringify(body.translations), property.id]
      );
      property.translations = body.translations;
    } else {
      try {
        const translations = await translateProperty(updatedType, updatedTitle, updatedLocation, updatedDesc);
        if (Object.keys(translations).length > 0) {
          await query(
            `UPDATE properties SET translations = $1 WHERE id = $2`,
            [JSON.stringify(translations), property.id]
          );
          property.translations = translations;
        }
      } catch (e) {
        console.error("Translation error:", e);
      }
    }

    return NextResponse.json(rowToProperty(property));
  } catch {
    return NextResponse.json({ error: "Error updating property" }, { status: 500 });
  }
}

export async function DELETE(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const result = await query('DELETE FROM properties WHERE ref = $1 RETURNING id', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Error deleting property" }, { status: 500 });
  }
}
