import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query('SELECT * FROM clients ORDER BY name ASC');
    return NextResponse.json(result.rows);
  } catch {
    return NextResponse.json({ error: "Error reading clients" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, slug, domain, template, phone, email, address } = body;

    if (!name || !slug) {
      return NextResponse.json({ error: "Name and slug are required" }, { status: 400 });
    }

    const result = await query(
      `INSERT INTO clients (name, slug, domain, template, phone, email, address)
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      [name, slug, domain || null, template || "modern", phone || "", email || "", address || ""]
    );

    return NextResponse.json(result.rows[0], { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error creating client" }, { status: 500 });
  }
}
