type Translation = { title?: string; location?: string; type?: string; desc?: string };
type Translations = Record<string, Translation>;

const LANGUAGES = [
  { locale: "en", code: "en" },
  { locale: "de", code: "de" },
  { locale: "fr", code: "fr" },
  { locale: "ru", code: "ru" },
];

const MANUAL_TYPES: Record<string, Record<string, string>> = {
  en: { "Ático": "Penthouse", "Casa Rural": "Country House", "Chalet": "Townhouse", "Dúplex": "Duplex", "Local": "Commercial Premises", "Parcela": "Plot", "Piso": "Apartment" },
  de: { "Ático": "Penthouse", "Casa Rural": "Landhaus", "Chalet": "Reihenhaus", "Dúplex": "Duplex", "Local": "Geschäftsräume", "Parcela": "Grundstück", "Piso": "Wohnung" },
  fr: { "Ático": "Penthouse", "Casa Rural": "Maison de campagne", "Chalet": "Maison de ville", "Dúplex": "Duplex", "Local": "Local commercial", "Parcela": "Terrain", "Piso": "Appartement" },
  ru: { "Ático": "Пентхаус", "Casa Rural": "Загородный дом", "Chalet": "Таунхаус", "Dúplex": "Дуплекс", "Local": "Коммерческое помещение", "Parcela": "Участок", "Piso": "Квартира" },
};

const AUTO_TYPES = ["Apartamento", "Villa"];
const SEP = " ||| ";

export async function translateProperty(spanishType: string, spanishTitle: string, spanishLocation: string, spanishDesc: string): Promise<Translations> {
  const out: Translations = {};

  for (const { locale, code } of LANGUAGES) {
    const mt = MANUAL_TYPES[locale]?.[spanishType];
    let type = mt;
    if (!type && AUTO_TYPES.includes(spanishType)) {
      try {
        const { translate } = await import("@vitalets/google-translate-api");
        const r = await translate(spanishType, { to: code });
        type = r.text;
        await new Promise((r) => setTimeout(r, 1000));
      } catch {
        type = spanishType;
      }
    } else if (!type) {
      type = spanishType;
    }

    try {
      const { translate } = await import("@vitalets/google-translate-api");
      const combined = `${spanishTitle}${SEP}${spanishLocation}${SEP}${spanishDesc}`;
      const r = await translate(combined, { to: code });
      const parts = r.text.split(SEP);
      out[locale] = {
        title: parts[0] || spanishTitle,
        location: parts[1] || spanishLocation,
        type,
        desc: parts.slice(2).join(SEP) || spanishDesc,
      };
      await new Promise((r) => setTimeout(r, 1000));
    } catch {
      out[locale] = { type };
    }
  }

  return out;
}
