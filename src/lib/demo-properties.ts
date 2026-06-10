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
  {
    ref: "CP-107",
    title: "Dúplex en primera línea de la Fossa",
    location: "La Fossa, Calpe",
    price: "480.000 €",
    beds: 3,
    baths: 2,
    m2: 130,
    type: "Dúplex",
    image: null,
    desc: "Dúplex a 100m de la playa con plaza de garaje y trastero. Vistas laterales al Peñón de Ifach.",
  },
  {
    ref: "CP-108",
    title: "Casa rural con encanto",
    location: "Partida Vallesa, Calpe",
    price: "320.000 €",
    beds: 3,
    baths: 1,
    m2: 140,
    type: "Casa Rural",
    image: null,
    desc: "Casa rústica rehabilitada con terreno de 5.000m², piscina y barbacoa. Ideal para desconectar.",
  },
  {
    ref: "CP-109",
    title: "Local comercial en pleno centro",
    location: "Calle Mayor, Calpe",
    price: "180.000 €",
    beds: 0,
    baths: 1,
    m2: 85,
    type: "Local",
    image: null,
    desc: "Local comercial reformado en la calle principal. Ideal para negocio con mucha afluencia.",
  },
  {
    ref: "CP-110",
    title: "Chalet independiente con parcela",
    location: "Urbanización Canuta, Calpe",
    price: "695.000 €",
    beds: 4,
    baths: 3,
    m2: 280,
    type: "Chalet",
    image: null,
    desc: "Chalet independiente con parcela de 600m², piscina privada y vistas panorámicas al mar.",
  },
];

export default properties;
