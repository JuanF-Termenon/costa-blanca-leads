import { NextResponse } from "next/server";
import { query, rowToProperty } from "@/lib/db";

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
    const result = await query(
      `UPDATE properties SET title=$1, location=$2, price=$3, beds=$4, baths=$5, m2=$6, type=$7, purpose=$8, "desc"=$9, images=$10, lat=$11, lng=$12, "updatedAt"=now()
       WHERE ref=$13 RETURNING *`,
      [
        body.title ?? cur.title,
        body.location ?? cur.location,
        body.price ?? cur.price,
        body.beds ?? cur.beds,
        body.baths ?? cur.baths,
        body.m2 ?? cur.m2,
        body.type ?? cur.type,
        body.purpose ?? cur.purpose,
        body.desc ?? cur.desc,
        body.images ? JSON.stringify(body.images) : cur.images,
        body.coords?.lat ?? cur.lat,
        body.coords?.lng ?? cur.lng,
        id,
      ]
    );

    return NextResponse.json(rowToProperty(result.rows[0]));
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
