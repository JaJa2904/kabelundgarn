import type { Metadata } from "next";
import { getTranslations } from "@/lib/getTranslations";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { Process } from "@/components/Process";
import { PricingSection } from "@/components/PricingSection";
import { JsonLdLocalBusiness } from "@/components/JsonLd";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");
  return {
    title: t.seo.homeTitle,
    description: t.seo.homeDescription,
    openGraph: {
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
      url: `https://kabelundgarn.de/${locale}`,
      siteName: "Kabel und Garn",
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t.seo.homeTitle,
      description: t.seo.homeDescription,
    },
    alternates: {
      canonical: `https://kabelundgarn.de/${locale}`,
      languages: {
        de: "https://kabelundgarn.de/de",
        en: "https://kabelundgarn.de/en",
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <>
      <JsonLdLocalBusiness locale={locale} />
      <Hero locale={locale as "de" | "en"} />
      <Services locale={locale as "de" | "en"} />
      <Process locale={locale as "de" | "en"} />
      <PricingSection locale={locale as "de" | "en"} />
    </>
  );
}
