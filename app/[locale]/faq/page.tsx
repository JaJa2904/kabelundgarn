import type { Metadata } from "next";
import { getTranslations } from "@/lib/getTranslations";
import { FaqAccordion, type FaqItem } from "@/components/FaqAccordion";
import { Reveal } from "@/components/motion/Reveal";
import { accentCtaMotionLinkClassName, MotionLinkWithAnimation } from "@/components/motion/MotionLink";
import { Section, SectionContainer } from "@/components/Section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");
  return {
    title: t.seo.faqTitle,
    description: t.seo.faqDescription,
    openGraph: {
      title: t.seo.faqTitle,
      description: t.seo.faqDescription,
      url: `https://kabelundgarn.de/${locale}/faq`,
      siteName: "Kabel und Garn",
      locale: locale === "de" ? "de_DE" : "en_GB",
      type: "website",
    },
    alternates: {
      canonical: `https://kabelundgarn.de/${locale}/faq`,
      languages: {
        de: "https://kabelundgarn.de/de/faq",
        en: "https://kabelundgarn.de/en/faq",
      },
    },
  };
}

function getFaqItems(t: ReturnType<typeof getTranslations>): FaqItem[] {
  return [
    { question: t.faq.question1, answer: t.faq.answer1 },
    { question: t.faq.question2, answer: t.faq.answer2 },
    { question: t.faq.question3, answer: t.faq.answer3 },
    { question: t.faq.question4, answer: t.faq.answer4 },
    { question: t.faq.question5, answer: t.faq.answer5 },
    { question: t.faq.question6, answer: t.faq.answer6 },
    { question: t.faq.question7, answer: t.faq.answer7 },
    { question: t.faq.question8, answer: t.faq.answer8 },
    { question: t.faq.question9, answer: t.faq.answer9 },
    { question: t.faq.question10, answer: t.faq.answer10 },
    { question: t.faq.question11, answer: t.faq.answer11 },
    { question: t.faq.question12, answer: t.faq.answer12 },
  ];
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");
  const items = getFaqItems(t);

  return (
    <Section
      as="main"
      padding="none"
      className="bg-primaryDark"
    >
      <SectionContainer
        size="narrow"
        className="flex min-h-[calc(100vh-9rem)] flex-col justify-center py-8 md:min-h-[calc(100vh-10rem)] md:py-10"
      >
        <Reveal>
          <h1 className="mb-6 text-3xl font-bold text-accent md:text-4xl">
            {t.faq.title}
          </h1>
          <p className="mb-4 text-surface/90 leading-relaxed">
            {t.faq.intro}
          </p>
        </Reveal>

        <div className="mt-6">
          <FaqAccordion items={items} />
        </div>

        <Reveal>
          <div className="mt-6 flex flex-col items-center gap-4 text-center">
            <p className="text-surface/90">
              {t.faq.ctaIntro}
            </p>
            <MotionLinkWithAnimation
              href={`/${locale}/contact`}
              className={accentCtaMotionLinkClassName}
            >
              {t.faq.cta}
            </MotionLinkWithAnimation>
          </div>
        </Reveal>
      </SectionContainer>
    </Section>
  );
}
