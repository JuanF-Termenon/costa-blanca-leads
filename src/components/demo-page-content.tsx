"use client";

import { useState } from "react";
import { MapPin, Phone, Mail, ArrowLeft } from "lucide-react";
import { DemoPropertyGrid } from "@/components/demo-property-grid";
import { ThemeToggle } from "@/components/theme-toggle";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useLang } from "@/lib/providers";

export function DemoPageContent({ initialRef }: { initialRef?: string }) {
  const [search, setSearch] = useState("");
  const { t } = useLang();

  return (
    <div className="min-h-dvh bg-white dark:bg-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <a
              href="/"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:border-slate-700 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
              title={t("demo.header.back")}
            >
              <ArrowLeft className="h-4 w-4" />
            </a>
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white text-sm font-bold">
              IC
            </div>
            <div>
              <span className="text-base font-bold text-slate-900 dark:text-slate-100">{t("demo.header.brand")}</span>
              <span className="ml-2 rounded bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-300">{t("demo.header.badge")}</span>
            </div>
          </div>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex dark:text-slate-400">
            <a href="#propiedades">{t("demo.header.propiedades")}</a>
            <a href="#nosotros">{t("demo.header.nosotros")}</a>
            <a href="#contacto">{t("demo.header.contacto")}</a>
          </nav>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
            <a
              href="tel:+34965830000"
              className="hidden items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white md:flex dark:bg-blue-600"
            >
              <Phone className="h-4 w-4" />
              965 83 00 00
            </a>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-600 to-blue-800 py-20 text-white dark:from-blue-800 dark:via-blue-700 dark:to-blue-900">
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full" style={{
            backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
          }} />
        </div>
        <div className="relative mx-auto max-w-6xl px-6 py-16 text-center">
          <h1 className="text-4xl font-bold sm:text-5xl">
            {t("demo.hero.title")} <span className="text-amber-300 dark:text-amber-200">{t("demo.hero.title-highlight")}</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100 dark:text-blue-200">
            {t("demo.hero.subtitle")}
          </p>
          <div className="mx-auto mt-8 flex max-w-lg items-center gap-2 rounded-xl bg-white/15 p-2 backdrop-blur-sm">
            <MapPin className="ml-2 h-5 w-5 shrink-0 text-blue-200" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("demo.hero.search")}
              className="w-full bg-transparent px-2 py-2 text-sm text-white placeholder-blue-200 outline-none"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="mr-1 text-sm text-blue-200 hover:text-white"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </section>

      <DemoPropertyGrid search={search} initialRef={initialRef} />

      <section id="nosotros" className="scroll-mt-20 bg-slate-50 py-16 dark:bg-slate-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("demo.about.title")}</h2>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {t("demo.about.desc")}
            </p>
          </div>
          <div className="mt-10 grid gap-6 text-center md:grid-cols-3">
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">+80</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("demo.about.properties")}</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">15</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("demo.about.experience")}</p>
            </div>
            <div className="rounded-xl bg-white p-6 shadow-sm dark:bg-slate-800">
              <div className="text-3xl font-bold text-blue-700 dark:text-blue-400">4.8</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("demo.about.rating")}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="scroll-mt-20 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">{t("demo.contact.title")}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {t("demo.contact.subtitle")}
            </p>
          </div>
          <div className="mx-auto mt-10 grid max-w-2xl gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
              <Phone className="mx-auto h-6 w-6 text-blue-700 dark:text-blue-400" />
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{t("demo.contact.phone-label")}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">965 83 00 00</p>
            </div>
            <div className="rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
              <Mail className="mx-auto h-6 w-6 text-blue-700 dark:text-blue-400" />
              <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{t("demo.contact.email-label")}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">info@costablancapropiedades.com</p>
            </div>
          </div>
          <div className="mx-auto mt-6 max-w-xl rounded-xl border border-slate-200 bg-white p-6 text-center dark:border-slate-700 dark:bg-slate-800">
            <MapPin className="mx-auto h-6 w-6 text-blue-700 dark:text-blue-400" />
            <p className="mt-3 text-sm font-semibold text-slate-900 dark:text-slate-100">{t("demo.contact.address-label")}</p>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              {t("demo.contact.address")}
            </p>
          </div>
        </div>
      </section>

      <footer className="border-t border-slate-200 bg-slate-50 py-8 text-center text-sm text-slate-500 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <p>{t("demo.footer.text")}</p>
        <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
          {t("demo.footer.note")}
        </p>
      </footer>
    </div>
  );
}
