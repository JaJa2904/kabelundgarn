import { translations, type Locale } from "./translations";

export function getTranslations(locale: Locale) {
  return translations[locale];
}
