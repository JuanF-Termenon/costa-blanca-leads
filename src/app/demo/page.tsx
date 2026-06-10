import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import properties from "@/lib/demo-properties";
import { DemoPropertyCard } from "@/components/demo-property-card";

const propertyColors = [
  "from-blue-400 to-blue-600",
  "from-emerald-400 to-emerald-600",
  "from-amber-400 to-amber-600",
  "from-rose-400 to-rose-600",
  "from-violet-400 to-violet-600",
  "from-teal-400 to-teal-600",
];

export default function DemoPage() {
  return (
    <div className="min-h-dvh bg-white">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
              CP
            </div>
            <div>
              <span className="text-base font-bold text-slate-900">Calpe Propiedades</span>
              <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Demo</span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#comprar">Comprar</a>
            <a href="#propiedades">Propiedades</a>
            <a href="#nosotros">Nosotros</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a
            href="tel:+34965830000"
            className="hidden items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white md:flex"
          >
            <Phone className="h-4 w-4" />
            965 83 00 00
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 py-20 text-white">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Tu inmobiliaria de confianza en <span className="text-amber-300">Calpe</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100">
            Más de 20 años ayudando a familias a encontrar el hogar de sus sueños en la Costa Blanca.
            Especialistas en compra, venta y alquiler en Calpe y alrededores.
          </p>
          <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-xl bg-white/15 p-2 backdrop-blur-sm">
            <MapPin className="ml-2 h-5 w-5 shrink-0 text-blue-200" />
            <input
              type="text"
              readOnly
              value="Buscar pisos, chalets, áticos en Calpe..."
              className="w-full bg-transparent px-2 py-2 text-sm text-white placeholder-blue-200 outline-none"
            />
            <button className="rounded-lg bg-amber-500 px-6 py-2 text-sm font-semibold text-blue-900 transition-colors hover:bg-amber-400">
              Buscar
            </button>
          </div>
        </div>
      </section>

      <section id="propiedades" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Propiedades destacadas</h2>
              <p className="mt-2 text-sm text-slate-500">
                Las mejores oportunidades en Calpe
              </p>
            </div>
            <a
              href="#"
              className="hidden items-center gap-1 text-sm font-semibold text-blue-700 md:flex"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((p, i) => (
              <DemoPropertyCard
                key={p.ref}
                property={p}
                color={propertyColors[i % propertyColors.length]}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="nosotros" className="scroll-mt-20 bg-slate-50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900">Sobre nosotros</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600">
              Somos una inmobiliaria familiar con más de 20 años de experiencia en el mercado
              de Calpe y la Costa Blanca. Nuestro equipo de profesionales multilingüe te
              acompañará en cada paso del proceso, garantizando una experiencia transparente
              y sin sorpresas.
            </p>
          </div>
          <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-700">+500</div>
              <p className="mt-2 text-sm text-slate-600">Propiedades vendidas</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-700">20+</div>
              <p className="mt-2 text-sm text-slate-600">Años de experiencia</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm">
              <div className="text-3xl font-bold text-blue-700">100%</div>
              <p className="mt-2 text-sm text-slate-600">Clientes satisfechos</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900">Contacta con nosotros</h2>
            <p className="mt-2 text-sm text-slate-500">
              Visítanos en Calpe o llámanos para cualquier consulta
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <Phone className="mx-auto h-6 w-6 text-blue-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Teléfono</p>
              <p className="mt-1 text-sm text-slate-600">965 83 00 00</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
              <Mail className="mx-auto h-6 w-6 text-blue-700" />
              <p className="mt-3 text-sm font-semibold text-slate-900">Email</p>
              <p className="mt-1 text-sm text-slate-600">info@calpepropiedades.com</p>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-center">
            <MapPin className="mx-auto h-6 w-6 text-blue-700" />
            <p className="mt-3 text-sm font-semibold text-slate-900">Dirección</p>
            <p className="mt-1 text-sm text-slate-600">
              Avda. Gabriel Miró, 25 · 03710 Calpe (Alicante)
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500">
        <p>© 2026 Calpe Propiedades · Inmobiliaria en Calpe · Costa Blanca</p>
        <p className="mt-1 text-xs text-slate-400">
          Esta es una plantilla demo. Tu web puede tener tu propia marca, colores y propiedades.
        </p>
      </footer>
    </div>
  );
}
