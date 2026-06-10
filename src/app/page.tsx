import {
  Search,
  MapPin,
  TrendingUp,
  Smartphone,
  FileText,
  MessageSquare,
  Check,
  ArrowRight,
  Target,
  BarChart,
  Users,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";

const benefits = [
  {
    icon: Search,
    title: "SEO local para inmobiliarias",
    description:
      "Optimizamos tu web para que aparezcas cuando buscan 'comprar piso en Calpe', 'inmobiliaria en Benidorm' o 'chalet en Altea'. Más visitantes = más clientes.",
  },
  {
    icon: FileText,
    title: "Catálogo con páginas individuales",
    description:
      "Cada propiedad tiene su propia página con fotos, descripción, precio y mapa. Posicionas cada piso por separado en Google.",
  },
  {
    icon: MessageSquare,
    title: "Captación de leads automática",
    description:
      "Cada visita puede convertirse en cliente. Formulario, WhatsApp integrado y CTA en cada página. Los leads te llegan al móvil al instante.",
  },
  {
    icon: MapPin,
    title: "Google Maps + perfil de negocio",
    description:
      "Apareces en Google Maps con tus propiedades. Gestionamos tu perfil de Google Business para que te encuentren también desde el mapa.",
  },
  {
    icon: Smartphone,
    title: "Web rápida y profesional",
    description:
      "Diseño responsive, optimizado para móvil y velocidad. Una web lenta ahuyenta clientes. La tuya cargará en menos de 2 segundos.",
  },
  {
    icon: TrendingUp,
    title: "Informes y mejora continua",
    description:
      "Cada mes te enviamos un informe con visitas, leads generados y posicionamiento. Sabes lo que funciona y lo que no.",
  },
];

const steps = [
  {
    num: "01",
    title: "Analizamos tu mercado",
    desc: "Vemos tu cartera, tu zona, tu competencia y definimos la estrategia SEO.",
  },
  {
    num: "02",
    title: "Creamos tu web",
    desc: "Diseño profesional con catálogo, SEO local, Google Maps y WhatsApp. En 48h.",
  },
  {
    num: "03",
    title: "Posicionamos en Google",
    desc: "Optimización técnica y contenido para que aparezcas en búsquedas locales.",
  },
  {
    num: "04",
    title: "Recibes clientes",
    desc: "Los leads llegan directos a tu WhatsApp o email. Sin esfuerzo por tu parte.",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
              CBL
            </div>
            <span className="text-lg font-bold text-slate-900">
              Costa Blanca <span className="text-blue-700">Leads</span>
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
              Especialistas en inmobiliarias de Calpe y Costa Blanca
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
              Consigue más compradores para tus propiedades desde{" "}
              <span className="text-blue-700">Google</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
              Creamos tu web con SEO local para que aparezcas cuando buscan pisos, chalets o
              apartamentos en tu zona. Leads directos a tu WhatsApp sin complicaciones.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="#contacto"
                className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-blue-800"
              >
                Quiero más clientes
                <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="/demo"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-base font-semibold text-slate-700 transition-colors hover:bg-slate-50"
              >
                Ver demo
              </a>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Sin contrato de permanencia · Web en 48h · Soporte directo por WhatsApp
            </p>
            <p className="mt-2 text-sm font-medium text-amber-700">
              Lanzamiento: 790 € las primeras 5 agencias (habitual 1.290 €)
            </p>
          </div>
        </div>
      </section>

      <section id="servicios" className="scroll-mt-20 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Convierte Google en tu mejor comercial
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Más del 90% de compradores busca online antes de contactar con una inmobiliaria.
              Si no apareces, no existes.
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
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-white">¿Por qué funciona?</h2>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            <div className="rounded-xl bg-white/10 p-8 text-center text-white backdrop-blur-sm">
              <Target className="mx-auto h-8 w-8 text-amber-300" />
              <h3 className="mt-4 text-lg font-semibold">SEO local real</h3>
              <p className="mt-2 text-sm text-blue-100">
                No prometemos posiciones. Optimizamos tu web para que Google entienda
                que eres la inmobiliaria de referencia en tu zona.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 text-center text-white backdrop-blur-sm">
              <Users className="mx-auto h-8 w-8 text-amber-300" />
              <h3 className="mt-4 text-lg font-semibold">Diseñado para inmobiliarias</h3>
              <p className="mt-2 text-sm text-blue-100">
                No es una web genérica. Cada propiedad tiene su página, su mapa y su
                botón de contacto. Pensado para convertir visitas en leads.
              </p>
            </div>
            <div className="rounded-xl bg-white/10 p-8 text-center text-white backdrop-blur-sm">
              <BarChart className="mx-auto h-8 w-8 text-amber-300" />
              <h3 className="mt-4 text-lg font-semibold">Medición y mejora</h3>
              <p className="mt-2 text-sm text-blue-100">
                Cada mes sabrás cuántas visitas has tenido, de dónde vienen y cuántos
                leads has generado. Sin adivinar.
              </p>
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
              En 4 pasos tienes tu web captando clientes.
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
              Inversión clara, sin sorpresas
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Paga una vez por tu web. Luego solo la cuota mensual.
            </p>
          </div>

          <div className="mx-auto mt-10 max-w-lg rounded-2xl border-2 border-blue-700 bg-blue-50 p-8 text-center">
            <span className="inline-block rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white uppercase tracking-wide">Lanzamiento</span>
            <p className="mt-3 text-sm font-medium text-blue-700 uppercase tracking-wide">Inversión inicial</p>
            <p className="mt-2">
              <span className="text-2xl text-slate-400 line-through">1.290 €</span>
            </p>
            <p className="mt-1">
              <span className="text-4xl font-bold text-slate-900">790 €</span>
              <span className="text-slate-500"> una sola vez</span>
            </p>
            <p className="mt-1 text-sm text-amber-700 font-medium">Para las primeras 5 inmobiliarias</p>
            <p className="mt-3 text-sm text-slate-600">Incluye: diseño web, dominio, configuración SEO, Google Maps y WhatsApp</p>
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

      <section className="border-t border-slate-200 bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold text-slate-900">
              Preguntas frecuentes
            </h2>
          </div>
          <div className="mx-auto mt-12 max-w-3xl space-y-6">
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Necesito tener una web ya?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                No. Nosotros la creamos desde cero con tu marca, tus propiedades y tu dominio.
                No necesitas nada más que tus fotos y descripciones.
              </p>
            </details>
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Cuánto tardáis en tenerla lista?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Entre 24 y 48 horas desde que nos das tu información. El mismo día te enviamos un
                enlace para que veas cómo queda.
              </p>
            </details>
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Puedo cancelar cuando quiera?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Sí. Sin permanencia. Si no te gusta o no recibes clientes, cancelas y te quedas
                con tu dominio. Sin preguntas ni comisiones de salida.
              </p>
            </details>
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Aparezco en Google Maps?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Sí. En los planes Profesional y Premium gestionamos tu perfil de Google Business
                Profile para que aparezcas en Google Maps con tus propiedades.
              </p>
            </details>
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Puedo actualizar las propiedades yo mismo?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                De momento nos las envías por WhatsApp o email y las actualizamos en menos de 24h.
                Pronto tendrás un panel para gestionarlo tú mismo.
              </p>
            </details>
            <details className="group cursor-pointer rounded-xl border border-slate-200 p-5 open:border-blue-200 open:bg-blue-50/50">
              <summary className="flex items-center justify-between font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                ¿Qué pasa si un cliente contacta desde la web?
                <span className="text-blue-700 transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                Te llega un WhatsApp y un email automáticamente con el nombre, teléfono y mensaje
                del interesado. Contestas directamente desde tu móvil.
              </p>
            </details>
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
                CBL
              </div>
              <span className="text-sm font-semibold text-slate-900">
                Costa Blanca Leads
              </span>
            </div>
            <p className="text-sm text-slate-500">
              © 2026 Costa Blanca Leads · Especialistas en inmobiliarias de Calpe y la Costa Blanca
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
