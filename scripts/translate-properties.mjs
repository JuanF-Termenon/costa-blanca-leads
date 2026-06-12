/**
 * Auto-translates properties to all languages.
 *
 * How it works:
 *   - On Vercel build: uses Google Translate (Vercel IP not rate-limited)
 *   - Locally: just reports what needs translation (no API calls)
 *
 * Runs as prebuild in package.json, so it's automatic on every Vercel deploy.
 */

import { readFileSync, writeFileSync, existsSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");

const LANGUAGES = [
  { locale: "en", code: "en", name: "English" },
  { locale: "de", code: "de", name: "German" },
  { locale: "fr", code: "fr", name: "French" },
  { locale: "ru", code: "ru", name: "Russian" },
];

const MANUAL_TYPES = {
  en: { "Piso": "Apartment", "Ático": "Penthouse", "Chalet": "Townhouse", "Parcela": "Plot", "Dúplex": "Duplex", "Casa Rural": "Country House", "Local": "Commercial Premises" },
  de: { "Piso": "Wohnung", "Ático": "Penthouse", "Chalet": "Reihenhaus", "Parcela": "Grundstück", "Dúplex": "Duplex", "Casa Rural": "Landhaus", "Local": "Geschäftsräume" },
  fr: { "Piso": "Appartement", "Ático": "Penthouse", "Chalet": "Maison de ville", "Parcela": "Terrain", "Dúplex": "Duplex", "Casa Rural": "Maison de campagne", "Local": "Local commercial" },
  ru: { "Piso": "Квартира", "Ático": "Пентхаус", "Chalet": "Таунхаус", "Parcela": "Участок", "Dúplex": "Дуплекс", "Casa Rural": "Загородный дом", "Local": "Коммерческое помещение" },
};

const AUTO_TYPES = ["Apartamento", "Villa"];
const SEP = " ||| ";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// ---- Parsers ----
function parseProperties() {
  const f = readFileSync(resolve(ROOT, "data/properties.json"), "utf-8");
  const props = JSON.parse(f);
  return props.map((p) => ({ ref: p.ref, title: p.title, location: p.location, type: p.type, desc: p.desc }));
}

function parseExisting() {
  const fpath = resolve(ROOT, "src/lib/property-translations.ts");
  if (!existsSync(fpath)) return {};
  const content = readFileSync(fpath, "utf-8");

  function pl(locale) {
    const m = `const ${locale}: Record<string, PropertyOverride> = {`;
    const start = content.indexOf(m);
    if (start === -1) return {};
    let depth = 1, i = start + m.length;
    while (depth > 0 && i < content.length) { i++; if (content[i] === "{") depth++; if (content[i] === "}") depth--; }
    const sec = content.slice(start + m.length, i);
    const e = {};
    const re = /"([^"]+)":\s*\{([\s\S]*?)\},?/g;
    let match;
    while ((match = re.exec(sec)) !== null) {
      const [_, ref, body] = match;
      e[ref] = { title: body.match(/title:\s*"([^"]+)"/)?.[1], location: body.match(/location:\s*"([^"]+)"/)?.[1], type: body.match(/type:\s*"([^"]+)"/)?.[1], desc: body.match(/desc:\s*"([^"]+)"/)?.[1] };
    }
    return e;
  }
  return Object.fromEntries(LANGUAGES.map((l) => [l.locale, pl(l.locale)]));
}

function isTranslated(entry, spanish) {
  if (!entry || !spanish) return false;
  return (entry.title && entry.title !== spanish.title) || (entry.desc && entry.desc !== spanish.desc);
}

function getMissing(properties, existing) {
  const span = Object.fromEntries(properties.map((p) => [p.ref, p]));
  const missing = [];
  for (const p of properties)
    for (const { locale } of LANGUAGES) {
      const cur = existing[locale]?.[p.ref];
      if (!cur || !isTranslated(cur, span[p.ref])) missing.push({ ref: p.ref, locale, title: p.title });
    }
  return missing;
}

// ---- Google Translate (for Vercel builds) ----
async function translateGoogle(properties, existing) {
  const { translate } = await import("@vitalets/google-translate-api");
  const span = Object.fromEntries(properties.map((p) => [p.ref, p]));
  const out = Object.fromEntries(LANGUAGES.map((l) => [l.locale, { ...existing[l.locale] }]));
  let n = 0;

  for (const p of properties) {
    for (const { locale, code } of LANGUAGES) {
      if (out[locale][p.ref] && isTranslated(out[locale][p.ref], span[p.ref])) continue;

      await sleep(1000);

      const mt = MANUAL_TYPES[locale]?.[p.type];
      let type = mt;
      if (!type && AUTO_TYPES.includes(p.type)) {
        const r = await translate(p.type, { to: code }); type = r.text;
      } else if (!type) type = p.type;

      const combined = `${p.title}${SEP}${p.location}${SEP}${p.desc}`;
      const r = await translate(combined, { to: code });
      const parts = r.text.split(SEP);

      out[locale][p.ref] = { title: parts[0] || p.title, location: parts[1] || p.location, type, desc: parts.slice(2).join(SEP) || p.desc };
      n++;
    }
  }
  return { out, n };
}

// ---- File generation ----
function serializeEntries(entries) {
  return Object.entries(entries).sort(([a], [b]) => a.localeCompare(b))
    .map(([ref, f]) => {
      let b = `  "${ref}": {\n`;
      if (f.title) b += `    title: ${JSON.stringify(f.title)},\n`;
      if (f.location) b += `    location: ${JSON.stringify(f.location)},\n`;
      if (f.type) b += `    type: ${JSON.stringify(f.type)},\n`;
      if (f.desc) b += `    desc: ${JSON.stringify(f.desc)},\n`;
      return b + `  }`;
    }).join(",\n");
}

function generateFile(allResults) {
  const lcSections = LANGUAGES.map((l) => `const ${l.locale}: Record<string, PropertyOverride> = {\n${serializeEntries(allResults[l.locale])}\n};\n`).join("\n");
  const typeSections = LANGUAGES.map((l) => `const propertyType${l.locale.charAt(0).toUpperCase() + l.locale.slice(1)}: Record<string, string> = {\n${Object.entries(MANUAL_TYPES[l.locale]).sort().map(([k, v]) => `  ${JSON.stringify(k)}: ${JSON.stringify(v)}`).join(",\n")}\n};\n`).join("\n");

  return `import type { Property } from "./demo-properties";
import type { Locale } from "./translations";

type PropertyOverride = {
  title?: string;
  location?: string;
  type?: string;
  desc?: string;
};

${lcSections}
${typeSections}
const overrides: Record<Locale, Record<string, PropertyOverride>> = { es: {}, en, de, fr, ru };
const typeTranslations: Record<Locale, Record<string, string>> = {
  es: {},
  en: propertyTypeEn,
  de: propertyTypeDe,
  fr: propertyTypeFr,
  ru: propertyTypeRu,
};

export function localizeProperty(property: Property, locale: Locale): Property {
  const props = overrides[locale]?.[property.ref];
  const types = typeTranslations[locale] ?? {};
  if (!props && !types[property.type]) return property;
  return {
    ...property,
    title: props?.title ?? property.title,
    location: props?.location ?? property.location,
    type: types[property.type] ?? property.type,
    desc: props?.desc ?? property.desc,
  };
}
`;
}

// ---- Main ----
async function main() {
  const properties = parseProperties();
  const existing = parseExisting();
  const missing = getMissing(properties, existing);

  if (missing.length === 0) {
    console.log("✅ All properties are already translated.");
    return;
  }

  // On Vercel: use Google Translate (their IP works)
  if (process.env.VERCEL) {
    console.log(`🌐 Vercel build: translating ${missing.length} items via Google...`);
    try {
      const { out, n } = await translateGoogle(properties, existing);
      writeFileSync(resolve(ROOT, "src/lib/property-translations.ts"), generateFile(out), "utf-8");
      console.log(`✅ Translated ${n} items.`);
    } catch (err) {
      console.warn(`⚠️  Google Translate rate-limited (${err.message}). Properties will use Spanish fallback.`);
    }
    return;
  }

  // Local — just report what needs translation (no API calls)
  console.log(`📋 ${missing.length} items need translation (showing Spanish fallback):`);
  for (const { ref, locale, title } of missing.slice(0, 10)) console.log(`   ${ref} → ${locale}: "${title}"`);
  if (missing.length > 10) console.log(`   ... and ${missing.length - 10} more`);
  console.log("\n💡 Push to Vercel to auto-translate during build.");
}

main().catch((err) => {
  console.error("❌", err.message);
  process.exit(1);
});
