import type { Metadata } from "next";
import { getTranslations } from "@/lib/getTranslations";
import { Section, SectionContainer } from "@/components/Section";
import { Reveal } from "@/components/motion/Reveal";
import { GalleryLightbox } from "@/components/GalleryLightbox";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");

  return {
    title: t.seo.gallerieTitle,
    description: t.seo.gallerieDescription,
    openGraph: {
      title: t.seo.gallerieTitle,
      description: t.seo.gallerieDescription,
      url: `https://kabelundgarn.de/${locale}/gallerie`,
      siteName: "Kabel und Garn",
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
    },
    alternates: {
      canonical: `https://kabelundgarn.de/${locale}/gallerie`,
      languages: {
        de: "https://kabelundgarn.de/de/gallerie",
        en: "https://kabelundgarn.de/en/gallerie",
      },
    },
  };
}

export default async function GalleriePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");

  const order = [1, 15, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  const images = order.map((fileNo, idx) => ({
    src: `/gallery/work-${String(fileNo).padStart(2, "0")}.png`,
    alt:
      locale === "de"
        ? `Beispielarbeit – Galerie Bild ${idx + 1}`
        : `Sample work – gallery image ${idx + 1}`,
  }));

  return (
    <Section
      as="main"
      className="bg-section text-surface/90"
      ariaLabelledBy="gallerie-heading"
    >
      <SectionContainer>
        <Reveal>
          <h1 id="gallerie-heading" className="mb-4 text-3xl font-bold text-accent md:text-4xl">
            {t.gallerie.title}
          </h1>
          <p className="max-w-3xl text-lg text-surface/90 leading-relaxed">
            {t.gallerie.intro}
          </p>
        </Reveal>

        <div className="mt-10">
          <GalleryLightbox images={images} />
        </div>
      </SectionContainer>
    </Section>
  );
}

