export interface Property {
  ref: string;
  title: string;
  location: string;
  price: string;
  beds: number;
  baths: number;
  m2: number;
  type: string;
  purpose: "venta" | "alquiler" | "temporal";
  images: string[];
  coords: { lat: number; lng: number };
  desc: string;
  available?: boolean;
  translations?: Record<string, { title?: string; location?: string; type?: string; desc?: string }>;
}
