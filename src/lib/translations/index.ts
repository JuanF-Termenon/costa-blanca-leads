import { es } from "./es";
import { en } from "./en";
import { de } from "./de";
import { fr } from "./fr";
import { ru } from "./ru";

export type Locale = "es" | "en" | "de" | "fr" | "ru";

export const locales: Locale[] = ["es", "en", "de", "fr", "ru"];

export const localeNames: Record<Locale, string> = {
  es: "Español",
  en: "English",
  de: "Deutsch",
  fr: "Français",
  ru: "Русский",
};

const dictionaries: Record<Locale, Record<string, string>> = { es, en, de, fr, ru };

export function getTranslator(locale: Locale) {
  const dict = dictionaries[locale] ?? es;
  return (key: string, fallback?: string): string => {
    return dict[key] ?? fallback ?? key;
  };
}

export type TFunction = ReturnType<typeof getTranslator>;
