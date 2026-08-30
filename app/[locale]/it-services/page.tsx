import type { Metadata } from "next";
import { getTranslations } from "@/lib/getTranslations";
import { Reveal } from "@/components/motion/Reveal";
import { accentCtaMotionLinkClassName, MotionLinkWithAnimation } from "@/components/motion/MotionLink";
import { Section, SectionContainer } from "@/components/Section";
import { SECTION_WAVE_DIVIDER_MT, SectionWaveDivider } from "@/components/SectionWaveDivider";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");
  return {
    title: t.seo.itServicesTitle,
    description: t.seo.itServicesDescription,
  };
}

export default async function ITServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = getTranslations(locale as "de" | "en");

  return (
    <Section as="main" className="min-h-screen bg-primaryDark">
      <SectionContainer size="narrow">
        <Reveal>
          <h1 className="mb-6 text-3xl font-bold text-accent md:text-4xl">
            {t.itServices.title}
          </h1>
          <p className="mb-4 text-surface/90 leading-relaxed">
            {t.itServices.intro}
          </p>
          <ul className="mt-6 space-y-4" role="list">
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <div>
                <strong className="text-accent">{t.itServices.repairs}</strong>
                <p className="mt-1 text-surface/90 leading-relaxed">{t.itServices.repairsDesc}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <div>
                <strong className="text-accent">{t.itServices.dataRecovery}</strong>
                <p className="mt-1 text-surface/90 leading-relaxed">{t.itServices.dataRecoveryDesc}</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
              <div>
                <strong className="text-accent">{t.itServices.microsoldering}</strong>
                <p className="mt-1 text-surface/90 leading-relaxed">{t.itServices.microsolderingDesc}</p>
              </div>
            </li>
          </ul>
        </Reveal>
      </SectionContainer>

      <SectionContainer size="narrow">
        <Reveal>
          <p>
            <MotionLinkWithAnimation
              href={`/${locale}/contact`}
              className={accentCtaMotionLinkClassName}
            >
              {t.contact.title}
            </MotionLinkWithAnimation>
          </p>
        </Reveal>
      </SectionContainer>

      <SectionWaveDivider
        nextBg="primaryDark"
        variant="weave"
        className={SECTION_WAVE_DIVIDER_MT}
      />
    </Section>
  );
}
