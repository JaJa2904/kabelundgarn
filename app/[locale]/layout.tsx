import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locales, type Locale } from "@/lib/translations";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ContactSection } from "@/components/ContactSection";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  return {
    metadataBase: new URL("https://kabelundgarn.de"),
    alternates: {
      canonical: `https://kabelundgarn.de/${locale}`,
      languages: {
        de: "https://kabelundgarn.de/de",
        en: "https://kabelundgarn.de/en",
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();

  return (
    <>
      <Header locale={locale as Locale} />
      <main className="flex-1">{children}</main>
      <ContactSection locale={locale as Locale} />
      <Footer locale={locale as Locale} />
    </>
  );
}
