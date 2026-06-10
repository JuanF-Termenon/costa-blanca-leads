import {
  Search,
  MapPin,
  TrendingUp,
  Smartphone,
  FileText,
  MessageSquare,
  Check,
  ArrowRight,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

const benefits = [
  {
    icon: Search,
    title: "SEO local para Calpe",
    description:
      "Apareces el primero cuando buscan 'comprar piso en Calpe' o 'inmobiliarias Calpe'. Posicionamiento garantizado en Google Maps y búsqueda orgánica.",
  },
  {
    icon: Smartphone,
    title: "Web rápida y moderna",
    description:
      "Diseño profesional, responsive y optimizado para móvil. Tus clientes ven tus propiedades sin esperas.",
  },
  {
    icon: FileText,
    title: "Catálogo de propiedades",
    description:
      "Sube tus pisos con fotos, descripción y precio. Cada propiedad tiene su propia página SEO.",
  },
  {
    icon: MessageSquare,
    title: "Captación de leads automática",
    description:
      "Formulario de contacto, WhatsApp integrado y llamada a la acción en cada página. No pierdes ni un cliente.",
  },
  {
    icon: MapPin,
    title: "Google Maps integrado",
    description:
      "Cada propiedad muestra su ubicación en el mapa de Calpe. Tus clientes ven la cercanía al mar, centros comerciales y servicios.",
  },
  {
    icon: TrendingUp,
    title: "Estadísticas mensuales",
    description:
      "Te enviamos informe mensual con visitas, leads generados y posicionamiento. Sabes lo que funciona.",
  },
];

const steps = [
  {
    num: "01",
    title: "Nos reunimos",
    desc: "Vemos tu catálogo, tu zona y qué necesitas. Sin compromiso.",
  },
  {
    num: "02",
    title: "Creamos tu web",
    desc: "Landing page con todas tus propiedades, SEO y Google Maps. En 48h.",
  },
  {
    num: "03",
    title: "Te posicionamos",
    desc: "Optimizamos para que aparezcas en Google local. Resultados en semanas.",
  },
  {
    num: "04",
    title: "Recibes leads",
    desc: "Clientes te contactan directamente desde tu web. Te avisamos al WhatsApp.",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
              CS
            </div>
            <span className="text-lg font-bold text-slate-900">
              Calpe <span className="text-blue-700">SEO</span>
            </span>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
            <a href="#servicios">Servicios</a>
            <a href="#como-funciona">Cómo funciona</a>
            <a href="#precios">Precios</a>
            <a href="/demo" className="text-blue-700">Ver demo</a>
            <a href="#contacto">Contacto</a>
          </nav>
          <a
            href="#contacto"
            className="rounded-lg bg-blue-700 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
          >
            Solicitar demo
          </a>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-amber-50">
        <div className="mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-32 md:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-1.5 text-sm font-medium text-blue-800">
              <MapPin className="h-4 w-4" />
              Especialistas en Calpe y la Costa Blanca
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              La primera página de Google para tu inmobiliaria en{" "}
              <span className="text-blue-700">Calpe</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Creamos tu landing page con SEO local, catálogo de propiedades y
              captación automática de clientes. Empieza a recibir leads desde el
              primer mes.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Quiero aparecer en Google
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Ver servicios
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Sin contrato de permanencia · Web en 48h · Soporte directo por
              WhatsApp
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Todo lo que tu inmobiliaria necesita online
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              No es solo una web. Es una máquina de captar clientes en Calpe.
            </p>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="group rounded-2xl border border-slate-200 bg-white p-8 transition-shadow hover:shadow-lg"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 transition-colors group-hover:bg-blue-700 group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-blue-700 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center text-white">
              <div className="text-4xl font-bold">50+</div>
              <div className="mt-2 text-blue-200">Inmobiliarias en Calpe</div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold">3.200+</div>
              <div className="mt-2 text-blue-200">
                Búsquedas al mes "inmobiliarias Calpe"
              </div>
            </div>
            <div className="text-center text-white">
              <div className="text-4xl font-bold">85%</div>
              <div className="mt-2 text-blue-200">
                De compradores empieza por Google
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="como-funciona"
        className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Cómo empezamos
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              En 4 pasos tienes tu web funcionando y captando clientes.
            </p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-4">
            {steps.map(({ num, title, desc }) => (
              <div key={num} className="relative text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-lg font-bold text-white">
                  {num}
                </div>
                <h3 className="mt-5 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="precios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Precios simples y sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Setup único de <strong>990 €</strong> (web + dominio + SEO inicial).
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Cuotas mensuales sin permanencia. Cancela cuando quieras.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-slate-900">Básico</h3>
              <p className="mt-2 text-sm text-slate-500">
                Para agentes individuales
              </p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-slate-900">79 €</span>
                <span className="text-slate-500">/mes</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                + 990 € setup único
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Landing page profesional
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Catálogo de propiedades
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  SEO local básico
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Formulario de contacto + WhatsApp
                </li>
              </ul>
              <a
                href="#contacto"
                className="mt-8 flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Solicitar
              </a>
            </div>
            <div className="relative rounded-2xl border-2 border-blue-700 bg-white p-8 shadow-lg shadow-blue-700/10">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-blue-700 px-4 py-1 text-xs font-semibold text-white">
                Más popular
              </span>
              <h3 className="text-lg font-semibold text-slate-900">
                Profesional
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Para inmobiliarias consolidadas
              </p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-slate-900">149 €</span>
                <span className="text-slate-500">/mes</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                + 990 € setup único
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Todo el plan Básico
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Nuevas páginas SEO mensuales
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  SEO local avanzado + Google Maps
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Blog SEO integrado
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Optimización de velocidad
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Informes mensuales
                </li>
              </ul>
              <a
                href="#contacto"
                className="mt-8 flex w-full items-center justify-center rounded-lg bg-blue-700 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Solicitar
              </a>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-white p-8">
              <h3 className="text-lg font-semibold text-slate-900">
                Premium
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                Para grupos y grandes carteras
              </p>
              <p className="mt-6">
                <span className="text-3xl font-bold text-slate-900">249 €</span>
                <span className="text-slate-500">/mes</span>
              </p>
              <p className="mt-1 text-sm text-slate-500">
                + 990 € setup único
              </p>
              <ul className="mt-6 space-y-3 text-sm text-slate-600">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Todo el plan Profesional
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  SEO local avanzado + contenido continuo
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Gestión Google Business Profile
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 shrink-0 text-blue-700" />
                  Soporte prioritario 24/7
                </li>
              </ul>
              <a
                href="#contacto"
                className="mt-8 flex w-full items-center justify-center rounded-lg border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Solicitar
              </a>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contacto"
        className="scroll-mt-20 border-t border-slate-200 bg-slate-50 py-20"
      >
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              ¿Hablamos?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Cuéntanos qué necesitas y te hacemos una propuesta sin compromiso.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-700 text-white text-xs font-bold">
                CS
              </div>
              <span className="text-sm font-semibold text-slate-900">
                Calpe SEO
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Calpe SEO · Especialistas en inmobiliarias de Calpe y la
              Costa Blanca
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
