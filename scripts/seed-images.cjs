const { Pool } = require("pg");

async function main() {
  const url = new URL(process.env.DATABASE_URL);
  const pool = new Pool({
    host: url.hostname,
    port: parseInt(url.port, 10) || 5432,
    database: url.pathname.slice(1),
    user: url.username,
    password: decodeURIComponent(url.password),
    ssl: { rejectUnauthorized: false },
    max: 5,
  });

  await pool.query("UPDATE properties SET ref = 'CBL-301' WHERE ref = 'CBL-104'");
  console.log("OK CBL-104 -> CBL-301");

  const images = {
    "CBL-101": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop"],
    "CBL-102": ["https://images.unsplash.com/photo-1613977257363-707ba9340b1e?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"],
    "CBL-103": ["https://images.unsplash.com/photo-1600566753086-00f18e0b3b10?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"],
    "CBL-301": ["https://images.unsplash.com/photo-1598928506311-c55e3e1e7?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop"],
    "CBL-105": ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop"],
    "CBL-106": ["https://images.unsplash.com/photo-1600573472591-ee6b68c14fdf?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop"],
    "CBL-107": ["https://images.unsplash.com/photo-1600566752229-250ed79470f8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1560185009-dddeb5b10317?w=800&h=600&fit=crop"],
    "CBL-108": ["https://images.unsplash.com/photo-1600585152915-d208bec9eb12?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&h=600&fit=crop"],
    "CBL-109": ["https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1563903530908-af5f8a19819b?w=800&h=600&fit=crop"],
    "CBL-110": ["https://images.unsplash.com/photo-1600573472590-840c23fe0b3a?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&h=600&fit=crop"],
    "CBL-201": ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1513584684374-8bab748fbf90?w=800&h=600&fit=crop"],
    "CBL-202": ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop"],
    "CBL-203": ["https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop"],
    "CBL-204": ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop","https://images.unsplash.com/photo-1600047509358-9dc75507daeb?w=800&h=600&fit=crop"],
  };

  for (const [ref, urls] of Object.entries(images)) {
    await pool.query("UPDATE properties SET images = $1 WHERE ref = $2", [JSON.stringify(urls), ref]);
    console.log("OK " + ref + " -> " + urls.length + " images");
  }

  console.log("\nDone!");
  await pool.end();
}

main().catch((e) => { console.error(e.message); process.exit(1); });
