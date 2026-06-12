import "dotenv/config";
import pg from "pg";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const url = new URL(process.env.DATABASE_URL);
const pool = new pg.Pool({
  host: url.hostname,
  port: parseInt(url.port, 10) || 5432,
  database: url.pathname.slice(1),
  user: url.username,
  password: decodeURIComponent(url.password),
  ssl: { rejectUnauthorized: false },
});

async function main() {
  console.log("📦 Creating tables...");
  const schema = readFileSync(resolve(ROOT, "scripts/schema.sql"), "utf-8");
  await pool.query(schema);
  console.log("✅ Tables created");

  // Check if default client exists
  const existing = await pool.query("SELECT * FROM clients WHERE slug = $1", ["inmobiliaria-calpe"]);
  let clientId;

  if (existing.rows.length > 0) {
    clientId = existing.rows[0].id;
    console.log("✅ Default client already exists:", existing.rows[0].name);
  } else {
    const r = await pool.query(
      `INSERT INTO clients (name, slug, template, phone, email, address, "isActive")
       VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
      ["Inmobiliaria Calpe", "inmobiliaria-calpe", "modern", "965 83 00 00", "info@calpepropiedades.com", "Calle La Libertad, 12, Calpe", true]
    );
    clientId = r.rows[0].id;
    console.log("✅ Created default client:", r.rows[0].name);
  }

  // Seed properties from JSON
  const raw = readFileSync(resolve(ROOT, "data/properties.json"), "utf-8");
  const properties = JSON.parse(raw);

  let created = 0;
  for (const p of properties) {
    const exists = await pool.query('SELECT id FROM properties WHERE ref = $1 AND "clientId" = $2', [p.ref, clientId]);
    if (exists.rows.length > 0) {
      console.log(`  ⏭  ${p.ref} exists, skipping`);
      continue;
    }
    await pool.query(
      `INSERT INTO properties (ref, "clientId", title, location, price, beds, baths, m2, type, purpose, "desc", images, lat, lng)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
      [p.ref, clientId, p.title, p.location, p.price, p.beds, p.baths, p.m2, p.type, p.purpose, p.desc, JSON.stringify(p.images || []), p.coords?.lat ?? 38.645, p.coords?.lng ?? 0.045]
    );
    console.log(`  ✅ ${p.ref}: ${p.title}`);
    created++;
  }

  console.log(`\n📊 Done! ${created} properties seeded.`);
  await pool.end();
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
