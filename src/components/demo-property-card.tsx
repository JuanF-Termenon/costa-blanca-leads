"use client";

import { useState } from "react";
import { MapPin, Bed, Bath, Maximize, X, Phone, Mail, Building2 } from "lucide-react";
import type { Property } from "@/lib/demo-properties";

const colorMap: Record<string, string> = {
  "from-blue-400 to-blue-600": "bg-blue-500",
  "from-emerald-400 to-emerald-600": "bg-emerald-500",
  "from-amber-400 to-amber-600": "bg-amber-500",
  "from-rose-400 to-rose-600": "bg-rose-500",
  "from-violet-400 to-violet-600": "bg-violet-500",
  "from-teal-400 to-teal-600": "bg-teal-500",
};

export function DemoPropertyCard({
  property,
  color,
}: {
  property: Property;
  color: string;
}) {
  const [open, setOpen] = useState(false);
  const badgeColor = colorMap[color] || "bg-blue-500";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group w-full overflow-hidden rounded-2xl border border-slate-200 bg-white text-left transition-all hover:shadow-lg"
      >
        <div className={`relative h-48 bg-gradient-to-br ${color}`}>
          <div className="absolute inset-0 flex items-center justify-center">
            <Building2 className="h-12 w-12 text-white/30" />
          </div>
          <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 backdrop-blur-sm">
            {property.type}
          </span>
          <span className="absolute right-3 top-3 rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">
            {property.price}
          </span>
        </div>
        <div className="p-5">
          <h3 className="font-semibold text-slate-900 group-hover:text-blue-700">
            {property.title}
          </h3>
          <p className="mt-1 flex items-center gap-1 text-xs text-slate-500">
            <MapPin className="h-3 w-3" />
            {property.location}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-slate-600 line-clamp-2">
            {property.desc}
          </p>
          {property.beds > 0 && (
            <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Bed className="h-3.5 w-3.5" />
                {property.beds} hab
              </span>
              <span className="flex items-center gap-1">
                <Bath className="h-3.5 w-3.5" />
                {property.baths} baños
              </span>
              <span className="flex items-center gap-1">
                <Maximize className="h-3.5 w-3.5" />
                {property.m2} m²
              </span>
            </div>
          )}
          <p className="mt-2 text-xs text-slate-400">Ref: {property.ref} · Click para detalles</p>
        </div>
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        >
          <div
            className="mt-8 mb-8 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={`relative h-56 bg-gradient-to-br ${color}`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <Building2 className="h-16 w-16 text-white/20" />
              </div>
              <button
                onClick={() => setOpen(false)}
                className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm transition-colors hover:bg-white/30"
              >
                <X className="h-5 w-5" />
              </button>
              <span className="absolute left-4 bottom-4 rounded-full bg-amber-500 px-4 py-1.5 text-base font-bold text-white">
                {property.price}
              </span>
            </div>

            <div className="p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">{property.title}</h2>
                  <p className="mt-1 flex items-center gap-1 text-sm text-slate-500">
                    <MapPin className="h-4 w-4" />
                    {property.location}
                  </p>
                </div>
                <span className="shrink-0 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                  {property.type}
                </span>
              </div>

              {property.beds > 0 && (
                <div className="mt-6 flex gap-6 text-sm">
                  <span className="flex items-center gap-2 text-slate-600">
                    <Bed className="h-4 w-4 text-blue-700" />
                    {property.beds} Dormitorios
                  </span>
                  <span className="flex items-center gap-2 text-slate-600">
                    <Bath className="h-4 w-4 text-blue-700" />
                    {property.baths} Baños
                  </span>
                  <span className="flex items-center gap-2 text-slate-600">
                    <Maximize className="h-4 w-4 text-blue-700" />
                    {property.m2} m² construidos
                  </span>
                </div>
              )}

              <div className="mt-6">
                <h3 className="font-semibold text-slate-900">Descripción</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{property.desc}</p>
              </div>

              <div className="mt-6 border-t border-slate-100 pt-6">
                <h3 className="font-semibold text-slate-900">¿Te interesa esta propiedad?</h3>
                <p className="mt-1 text-sm text-slate-500">
                  Contacta con el agente para más información o visita
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href="tel:+34965830000"
                    className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold text-white transition-colors ${badgeColor} hover:opacity-90`}
                  >
                    <Phone className="h-4 w-4" />
                    965 83 00 00
                  </a>
                  <a
                    href="#"
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                  >
                    <Mail className="h-4 w-4" />
                    info@inmobiliaria.com
                  </a>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400">Ref: {property.ref}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
