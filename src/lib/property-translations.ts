import type { Property } from "./demo-properties";
import type { Locale } from "./translations";

type PropertyOverride = {
  title?: string;
  location?: string;
  type?: string;
  desc?: string;
};

const en: Record<string, PropertyOverride> = {
  "CBL-101": {
    title: "Beachfront apartment",
    location: "Arenal-Bol Beach, Calpe",
    type: "Apartment",
    desc: "Beautiful renovated apartment with sea views and views of the Peñón de Ifach. 50m from the beach.",
  },
  "CBL-102": {
    title: "Villa with pool and panoramic views",
    location: "Maryvilla Urbanization, Calpe",
    type: "Villa",
    desc: "Stunning modern design villa with infinity pool, private garden and Mediterranean views.",
  },
  "CBL-103": {
    title: "Duplex penthouse with terrace",
    location: "Calpe City Center",
    type: "Penthouse",
    desc: "Duplex penthouse with large 40m² terrace, fitted kitchen and included parking.",
  },
  "CBL-104": {
    title: "Renovated central apartment",
    location: "Calle La Libertad, Calpe",
    type: "Apartment",
    desc: "Fully renovated apartment in Calpe city center. Ready to move in.",
  },
  "CBL-105": {
    title: "Townhouse in residential complex",
    location: "La Fossa, Calpe",
    type: "Townhouse",
    desc: "Townhouse with community garden, pool and garage. Quiet residential area.",
  },
  "CBL-106": {
    title: "Plot with villa project",
    location: "Cucarres, Calpe",
    type: "Plot",
    desc: "Plot with approved project for a luxury villa. Sea views and total privacy.",
  },
  "CBL-107": {
    title: "Duplex on La Fossa seafront",
    location: "La Fossa, Calpe",
    type: "Duplex",
    desc: "Duplex 100m from the beach with garage and storage room. Side views of Peñón de Ifach.",
  },
  "CBL-108": {
    title: "Charming country house",
    location: "Partida Vallesa, Calpe",
    type: "Country House",
    desc: "Renovated rustic house on a 5,000m² plot with pool and barbecue. Ideal to unwind.",
  },
  "CBL-109": {
    title: "Commercial premises in city center",
    location: "Calle Mayor, Calpe",
    type: "Commercial Premises",
    desc: "Renovated commercial premises on the main street. Ideal for a high-traffic business.",
  },
  "CBL-110": {
    title: "Detached villa with plot",
    location: "Canuta Urbanization, Calpe",
    type: "Townhouse",
    desc: "Detached villa on a 600m² plot with private pool and panoramic sea views.",
  },
  "CBL-201": {
    title: "Luxury apartment with sea views",
    location: "La Manzanera Urbanization, Calpe",
    type: "Apartment",
    desc: "Spectacular furnished apartment with panoramic views of Peñón de Ifach. Community pool, parking and storage room included.",
  },
  "CBL-202": {
    title: "Furnished central apartment",
    location: "Calle La Explanada, Calpe",
    type: "Apartment",
    desc: "Apartment in the heart of Calpe, fully furnished and renovated. Ideal for couples or small investors.",
  },
  "CBL-203": {
    title: "Villa with private pool",
    location: "Maryvilla Urbanization, Calpe",
    type: "Villa",
    desc: "Luxury detached villa with private pool, garden and sea views. Perfect for high-end temporary stays.",
  },
  "CBL-204": {
    title: "Penthouse near the beach",
    location: "La Fossa, Calpe",
    type: "Penthouse",
    desc: "Penthouse on La Fossa seafront with 30m² terrace and side sea views. 2 minutes walk from the beach.",
  }
};

const de: Record<string, PropertyOverride> = {
  "CBL-101": {
    title: "Apartamento en primera línea de playa",
    location: "Playa del Arenal-Bol, Calpe",
    type: "Apartamento",
    desc: "Precioso apartamento reformado con vistas al mar y al Peñón de Ifach. A 50m de la playa.",
  },
  "CBL-102": {
    title: "Villa con piscina y vistas panorámicas",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Impresionante villa de diseño moderno con piscina infinita, jardín privado y vistas al Mediterráneo.",
  },
  "CBL-103": {
    title: "Ático dúplex con terraza",
    location: "Centro, Calpe",
    type: "Penthouse",
    desc: "Ático dúplex con gran terraza de 40m², cocina equipada y parking incluido.",
  },
  "CBL-104": {
    title: "Piso céntrico reformado",
    location: "Calle La Libertad, Calpe",
    type: "Wohnung",
    desc: "Piso totalmente reformado en el centro de Calpe. Listo para entrar a vivir.",
  },
  "CBL-105": {
    title: "Chalet adosado en urbanización",
    location: "La Fossa, Calpe",
    type: "Reihenhaus",
    desc: "Chalet adosado con jardín comunitario, piscina y garaje. Zona residencial tranquila.",
  },
  "CBL-106": {
    title: "Parcela con proyecto de villa",
    location: "Cucarres, Calpe",
    type: "Grundstück",
    desc: "Parcela con proyecto aprobado para villa de lujo. Vistas al mar y total privacidad.",
  },
  "CBL-107": {
    title: "Dúplex en primera línea de la Fossa",
    location: "La Fossa, Calpe",
    type: "Duplex",
    desc: "Dúplex a 100m de la playa con plaza de garaje y trastero. Vistas laterales al Peñón de Ifach.",
  },
  "CBL-108": {
    title: "Casa rural con encanto",
    location: "Partida Vallesa, Calpe",
    type: "Landhaus",
    desc: "Casa rústica rehabilitada con terreno de 5.000m², piscina y barbacoa. Ideal para desconectar.",
  },
  "CBL-109": {
    title: "Local comercial en pleno centro",
    location: "Calle Mayor, Calpe",
    type: "Geschäftsräume",
    desc: "Local comercial reformado en la calle principal. Ideal para negocio con mucha afluencia.",
  },
  "CBL-110": {
    title: "Chalet independiente con parcela",
    location: "Urbanización Canuta, Calpe",
    type: "Reihenhaus",
    desc: "Chalet independiente con parcela de 600m², piscina privada y vistas panorámicas al mar.",
  },
  "CBL-201": {
    title: "Apartamento de lujo con vistas al mar",
    location: "Urbanización La Manzanera, Calpe",
    type: "Apartamento",
    desc: "Espectacular apartamento amueblado con vistas panorámicas al Peñón de Ifach. Piscina comunitaria, parking y trastero incluidos.",
  },
  "CBL-202": {
    title: "Piso céntrico amueblado",
    location: "Calle La Explanada, Calpe",
    type: "Wohnung",
    desc: "Piso en pleno centro de Calpe, totalmente amueblado y reformado. Ideal para parejas o pequeños inversores.",
  },
  "CBL-203": {
    title: "Villa con piscina privada",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Villa independiente de lujo con piscina privada, jardín y vistas al mar. Perfecta para estancias temporales de alto standing.",
  },
  "CBL-204": {
    title: "Ático cerca de la playa",
    location: "La Fossa, Calpe",
    type: "Penthouse",
    desc: "Ático en primera línea de La Fossa con terraza de 30m² y vistas laterales al mar. A 2 minutos andando de la playa.",
  }
};

const fr: Record<string, PropertyOverride> = {
  "CBL-101": {
    title: "Apartamento en primera línea de playa",
    location: "Playa del Arenal-Bol, Calpe",
    type: "Apartamento",
    desc: "Precioso apartamento reformado con vistas al mar y al Peñón de Ifach. A 50m de la playa.",
  },
  "CBL-102": {
    title: "Villa con piscina y vistas panorámicas",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Impresionante villa de diseño moderno con piscina infinita, jardín privado y vistas al Mediterráneo.",
  },
  "CBL-103": {
    title: "Ático dúplex con terraza",
    location: "Centro, Calpe",
    type: "Penthouse",
    desc: "Ático dúplex con gran terraza de 40m², cocina equipada y parking incluido.",
  },
  "CBL-104": {
    title: "Piso céntrico reformado",
    location: "Calle La Libertad, Calpe",
    type: "Appartement",
    desc: "Piso totalmente reformado en el centro de Calpe. Listo para entrar a vivir.",
  },
  "CBL-105": {
    title: "Chalet adosado en urbanización",
    location: "La Fossa, Calpe",
    type: "Maison de ville",
    desc: "Chalet adosado con jardín comunitario, piscina y garaje. Zona residencial tranquila.",
  },
  "CBL-106": {
    title: "Parcela con proyecto de villa",
    location: "Cucarres, Calpe",
    type: "Terrain",
    desc: "Parcela con proyecto aprobado para villa de lujo. Vistas al mar y total privacidad.",
  },
  "CBL-107": {
    title: "Dúplex en primera línea de la Fossa",
    location: "La Fossa, Calpe",
    type: "Duplex",
    desc: "Dúplex a 100m de la playa con plaza de garaje y trastero. Vistas laterales al Peñón de Ifach.",
  },
  "CBL-108": {
    title: "Casa rural con encanto",
    location: "Partida Vallesa, Calpe",
    type: "Maison de campagne",
    desc: "Casa rústica rehabilitada con terreno de 5.000m², piscina y barbacoa. Ideal para desconectar.",
  },
  "CBL-109": {
    title: "Local comercial en pleno centro",
    location: "Calle Mayor, Calpe",
    type: "Local commercial",
    desc: "Local comercial reformado en la calle principal. Ideal para negocio con mucha afluencia.",
  },
  "CBL-110": {
    title: "Chalet independiente con parcela",
    location: "Urbanización Canuta, Calpe",
    type: "Maison de ville",
    desc: "Chalet independiente con parcela de 600m², piscina privada y vistas panorámicas al mar.",
  },
  "CBL-201": {
    title: "Apartamento de lujo con vistas al mar",
    location: "Urbanización La Manzanera, Calpe",
    type: "Apartamento",
    desc: "Espectacular apartamento amueblado con vistas panorámicas al Peñón de Ifach. Piscina comunitaria, parking y trastero incluidos.",
  },
  "CBL-202": {
    title: "Piso céntrico amueblado",
    location: "Calle La Explanada, Calpe",
    type: "Appartement",
    desc: "Piso en pleno centro de Calpe, totalmente amueblado y reformado. Ideal para parejas o pequeños inversores.",
  },
  "CBL-203": {
    title: "Villa con piscina privada",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Villa independiente de lujo con piscina privada, jardín y vistas al mar. Perfecta para estancias temporales de alto standing.",
  },
  "CBL-204": {
    title: "Ático cerca de la playa",
    location: "La Fossa, Calpe",
    type: "Penthouse",
    desc: "Ático en primera línea de La Fossa con terraza de 30m² y vistas laterales al mar. A 2 minutos andando de la playa.",
  }
};

const ru: Record<string, PropertyOverride> = {
  "CBL-101": {
    title: "Apartamento en primera línea de playa",
    location: "Playa del Arenal-Bol, Calpe",
    type: "Apartamento",
    desc: "Precioso apartamento reformado con vistas al mar y al Peñón de Ifach. A 50m de la playa.",
  },
  "CBL-102": {
    title: "Villa con piscina y vistas panorámicas",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Impresionante villa de diseño moderno con piscina infinita, jardín privado y vistas al Mediterráneo.",
  },
  "CBL-103": {
    title: "Ático dúplex con terraza",
    location: "Centro, Calpe",
    type: "Пентхаус",
    desc: "Ático dúplex con gran terraza de 40m², cocina equipada y parking incluido.",
  },
  "CBL-104": {
    title: "Piso céntrico reformado",
    location: "Calle La Libertad, Calpe",
    type: "Квартира",
    desc: "Piso totalmente reformado en el centro de Calpe. Listo para entrar a vivir.",
  },
  "CBL-105": {
    title: "Chalet adosado en urbanización",
    location: "La Fossa, Calpe",
    type: "Таунхаус",
    desc: "Chalet adosado con jardín comunitario, piscina y garaje. Zona residencial tranquila.",
  },
  "CBL-106": {
    title: "Parcela con proyecto de villa",
    location: "Cucarres, Calpe",
    type: "Участок",
    desc: "Parcela con proyecto aprobado para villa de lujo. Vistas al mar y total privacidad.",
  },
  "CBL-107": {
    title: "Dúplex en primera línea de la Fossa",
    location: "La Fossa, Calpe",
    type: "Дуплекс",
    desc: "Dúplex a 100m de la playa con plaza de garaje y trastero. Vistas laterales al Peñón de Ifach.",
  },
  "CBL-108": {
    title: "Casa rural con encanto",
    location: "Partida Vallesa, Calpe",
    type: "Загородный дом",
    desc: "Casa rústica rehabilitada con terreno de 5.000m², piscina y barbacoa. Ideal para desconectar.",
  },
  "CBL-109": {
    title: "Local comercial en pleno centro",
    location: "Calle Mayor, Calpe",
    type: "Коммерческое помещение",
    desc: "Local comercial reformado en la calle principal. Ideal para negocio con mucha afluencia.",
  },
  "CBL-110": {
    title: "Chalet independiente con parcela",
    location: "Urbanización Canuta, Calpe",
    type: "Таунхаус",
    desc: "Chalet independiente con parcela de 600m², piscina privada y vistas panorámicas al mar.",
  },
  "CBL-201": {
    title: "Apartamento de lujo con vistas al mar",
    location: "Urbanización La Manzanera, Calpe",
    type: "Apartamento",
    desc: "Espectacular apartamento amueblado con vistas panorámicas al Peñón de Ifach. Piscina comunitaria, parking y trastero incluidos.",
  },
  "CBL-202": {
    title: "Piso céntrico amueblado",
    location: "Calle La Explanada, Calpe",
    type: "Квартира",
    desc: "Piso en pleno centro de Calpe, totalmente amueblado y reformado. Ideal para parejas o pequeños inversores.",
  },
  "CBL-203": {
    title: "Villa con piscina privada",
    location: "Urbanización Maryvilla, Calpe",
    type: "Villa",
    desc: "Villa independiente de lujo con piscina privada, jardín y vistas al mar. Perfecta para estancias temporales de alto standing.",
  },
  "CBL-204": {
    title: "Ático cerca de la playa",
    location: "La Fossa, Calpe",
    type: "Пентхаус",
    desc: "Ático en primera línea de La Fossa con terraza de 30m² y vistas laterales al mar. A 2 minutos andando de la playa.",
  }
};

const propertyTypeEn: Record<string, string> = {
  "Ático": "Penthouse",
  "Casa Rural": "Country House",
  "Chalet": "Townhouse",
  "Dúplex": "Duplex",
  "Local": "Commercial Premises",
  "Parcela": "Plot",
  "Piso": "Apartment"
};

const propertyTypeDe: Record<string, string> = {
  "Ático": "Penthouse",
  "Casa Rural": "Landhaus",
  "Chalet": "Reihenhaus",
  "Dúplex": "Duplex",
  "Local": "Geschäftsräume",
  "Parcela": "Grundstück",
  "Piso": "Wohnung"
};

const propertyTypeFr: Record<string, string> = {
  "Ático": "Penthouse",
  "Casa Rural": "Maison de campagne",
  "Chalet": "Maison de ville",
  "Dúplex": "Duplex",
  "Local": "Local commercial",
  "Parcela": "Terrain",
  "Piso": "Appartement"
};

const propertyTypeRu: Record<string, string> = {
  "Ático": "Пентхаус",
  "Casa Rural": "Загородный дом",
  "Chalet": "Таунхаус",
  "Dúplex": "Дуплекс",
  "Local": "Коммерческое помещение",
  "Parcela": "Участок",
  "Piso": "Квартира"
};

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
