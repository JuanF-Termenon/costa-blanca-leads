import { Pool } from "pg";

const globalForPool = globalThis as unknown as { pool: Pool | undefined };

function createPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL environment variable is not set");
  }
  const url = new URL(connectionString);
  return new Pool({
    host: url.hostname,
    port: parseInt(url.port, 10) || 5432,
    database: url.pathname.slice(1),
    user: url.username,
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    max: 5,
  });
}

export const pool = globalForPool.pool ?? createPool();

if (process.env.NODE_ENV !== "production") globalForPool.pool = pool;

export async function query(text: string, params?: unknown[]) {
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result;
  } finally {
    client.release();
  }
}

// Helper to convert snake_case DB rows to camelCase JS objects
export function rowToProperty(row: Record<string, unknown>) {
  return {
    ...row,
    images: JSON.parse((row.images as string) || "[]"),
    coords: { lat: row.lat, lng: row.lng },
    translations: typeof row.translations === "string" ? JSON.parse(row.translations) : (row.translations || {}),
    clientId: row.clientId,
    createdAt: row.createdAt,
    updatedAt: row.updatedAt,
  };
}
