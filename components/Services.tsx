import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionContainer, SECTION_PB } from "@/components/Section";
import { SECTION_WAVE_DIVIDER_MT, SectionWaveDivider } from "@/components/SectionWaveDivider";
import { ServicesCards } from "@/components/ServicesCards";

export function Services({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section
      id="services"
      padding="topOnly"
      className="bg-section text-surface/90"
      ariaLabelledBy="services-heading"
    >
      <div className={SECTION_PB}>
        <SectionContainer>
          <Reveal>
            <h2 id="services-heading" className="mb-6 text-3xl font-bold text-accent md:text-4xl">
              {t.services.title}
            </h2>
            <p className="mb-4 text-lg text-surface/90">
              {t.services.subtitle}
            </p>
          </Reveal>

          <ServicesCards locale={locale} />
        </SectionContainer>
      </div>

      <SectionWaveDivider
        nextBg="section-muted"
        variant="flow"
        className={SECTION_WAVE_DIVIDER_MT}
      />
    </Section>
  );
}
