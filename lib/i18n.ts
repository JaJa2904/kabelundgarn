import { defaultLocale, type Locale } from "./translations";

export function getLocaleFromPathname(pathname: string): Locale | null {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first === "de" || first === "en") return first;
  return null;
}

export function pathnameWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] === "de" || segments[0] === "en") {
    return "/" + segments.slice(1).join("/") || "/";
  }
  return pathname || "/";
}

export function getLocalizedPath(path: string, locale: Locale): string {
  const base = path === "/" ? "" : path;
  return `/${locale}${base}`;
}

export function getAlternateLocale(current: Locale): Locale {
  return current === "de" ? "en" : "de";
}

export function getPreferredLocale(): Locale {
  return defaultLocale;
}
