-- Run this in Supabase SQL Editor to create the tables

CREATE TABLE IF NOT EXISTS clients (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  domain TEXT UNIQUE,
  template TEXT NOT NULL DEFAULT 'modern',
  phone TEXT NOT NULL DEFAULT '965 83 00 00',
  email TEXT NOT NULL DEFAULT 'info@costablancapropiedades.com',
  address TEXT NOT NULL DEFAULT 'Calle La Libertad, 12, Costa Blanca',
  "logoUrl" TEXT,
  "isActive" BOOLEAN NOT NULL DEFAULT true,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS properties (
  id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  ref TEXT NOT NULL,
  "clientId" TEXT NOT NULL REFERENCES clients(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  location TEXT NOT NULL DEFAULT '',
  price TEXT NOT NULL,
  beds INTEGER NOT NULL DEFAULT 0,
  baths INTEGER NOT NULL DEFAULT 0,
  m2 INTEGER NOT NULL DEFAULT 0,
  type TEXT NOT NULL,
  purpose TEXT NOT NULL DEFAULT 'venta',
  "desc" TEXT NOT NULL,
  images TEXT NOT NULL DEFAULT '[]',
  lat DOUBLE PRECISION NOT NULL DEFAULT 38.645,
  lng DOUBLE PRECISION NOT NULL DEFAULT 0.045,
  "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE("clientId", ref)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_properties_client ON properties("clientId");
CREATE INDEX IF NOT EXISTS idx_properties_ref ON properties(ref);
CREATE INDEX IF NOT EXISTS idx_clients_slug ON clients(slug);
CREATE INDEX IF NOT EXISTS idx_clients_domain ON clients(domain);
