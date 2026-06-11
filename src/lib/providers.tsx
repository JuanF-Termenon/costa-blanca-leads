"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import type { Locale } from "@/lib/translations";
import { getTranslator, type TFunction } from "@/lib/translations";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

const LangContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: TFunction;
} | null>(null);

export function Providers({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [locale, setLocale] = useState<Locale>("es");

  useEffect(() => {
    const saved = localStorage.getItem("theme") as Theme | null;
    if (saved) setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const t = getTranslator(locale);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <LangContext.Provider value={{ locale, setLocale, t }}>
        {children}
      </LangContext.Provider>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within Providers");
  return ctx;
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within Providers");
  return ctx;
}
