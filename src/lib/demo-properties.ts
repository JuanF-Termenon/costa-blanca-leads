export interface Property {
  ref: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  m2: number;
  type: string;
  image: null;
  desc: string;
}

const properties: Property[] = [
  {
    ref: "CP-101",
    title: "Apartamento en primera línea de playa",
    location: "Playa del Arenal-Bol, Calpe",
    price: "295.000 €",
    beds: 2,
    baths: 1,
    m2: 72,
    type: "Apartamento",
    image: null,
    desc: "Precioso apartamento reformado con vistas al mar y al Peñón de Ifach. A 50m de la playa.",
  },
  {
    ref: "CP-102",
    title: "Villa con piscina y vistas panorámicas",
    location: "Urbanización Maryvilla, Calpe",
    price: "890.000 €",
    beds: 4,
    baths: 3,
    m2: 220,
    type: "Villa",
    image: null,
    desc: "Impresionante villa de diseño moderno con piscina infinita, jardín privado y vistas al Mediterráneo.",
  },
  {
    ref: "CP-103",
    title: "Ático dúplex con terraza",
    location: "Centro, Calpe",
    price: "425.000 €",
    beds: 3,
    baths: 2,
    m2: 110,
    type: "Ático",
    image: null,
    desc: "Ático dúplex con gran terraza de 40m², cocina equipada y parking incluido.",
  },
  {
    ref: "CP-104",
    title: "Piso céntrico reformado",
    location: "Calle La Libertad, Calpe",
    price: "198.000 €",
    beds: 2,
    baths: 1,
    m2: 65,
    type: "Piso",
    image: null,
    desc: "Piso totalmente reformado en el centro de Calpe. Listo para entrar a vivir.",
  },
  {
    ref: "CP-105",
    title: "Chalet adosado en urbanización",
    location: "La Fossa, Calpe",
    price: "550.000 €",
    beds: 3,
    baths: 2,
    m2: 150,
    type: "Chalet",
    image: null,
    desc: "Chalet adosado con jardín comunitario, piscina y garaje. Zona residencial tranquila.",
  },
  {
    ref: "CP-106",
    title: "Parcela con proyecto de villa",
    location: "Cucarres, Calpe",
    price: "350.000 €",
    beds: 0,
    baths: 0,
    m2: 800,
    type: "Parcela",
    image: null,
    desc: "Parcela con proyecto aprobado para villa de lujo. Vistas al mar y total privacidad.",
  },
];

export default properties;
