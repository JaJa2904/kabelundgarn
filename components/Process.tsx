import type { Locale } from "@/lib/translations";
import { getTranslations } from "@/lib/getTranslations";
import { Reveal } from "@/components/motion/Reveal";
import { Section, SectionContainer, SECTION_PB } from "@/components/Section";
import { SECTION_WAVE_DIVIDER_MT, SectionWaveDivider } from "@/components/SectionWaveDivider";
import { ProcessSteps } from "@/components/ProcessSteps";

export function Process({ locale }: { locale: Locale }) {
  const t = getTranslations(locale);

  return (
    <Section
      id="process"
      padding="topOnly"
      className="relative bg-section-muted text-surface/90"
      ariaLabelledBy="process-heading"
    >
      <div className={SECTION_PB}>
        <SectionContainer>
          <Reveal>
            <h2 id="process-heading" className="mb-6 text-3xl font-bold text-accent md:text-4xl">
              {t.process.title}
            </h2>
            <span className="mt-3 block h-0.5 w-16 rounded-full bg-accent" aria-hidden />
          </Reveal>

          <div className="mt-6 rounded-2xl border-2 border-accent/20 bg-accent/5 p-6 md:p-8">
            <ProcessSteps locale={locale} />
          </div>
        </SectionContainer>
      </div>

      <SectionWaveDivider
        nextBg="section"
        variant="weave"
        className={SECTION_WAVE_DIVIDER_MT}
      />
    </Section>
  );
}
