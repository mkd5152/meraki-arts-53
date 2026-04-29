import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { ServiceCard } from "@/components/ServiceCard";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.servicesPage.hero.title,
  description: content.servicesPage.hero.intro
};

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        eyebrow={content.servicesPage.hero.eyebrow}
        title={content.servicesPage.hero.title}
        intro={content.servicesPage.hero.intro}
        image={content.artForms[content.artForms.length - 1]?.coverImage}
        meta={content.home.hero.featureLabel}
      />

      <SectionWrapper
        eyebrow={content.servicesPage.overview.eyebrow}
        title={content.servicesPage.overview.title}
        className="bg-panel"
      >
        <p className="mx-auto max-w-3xl text-center text-base leading-8 text-muted sm:text-lg">
          {content.servicesPage.overview.body}
        </p>
      </SectionWrapper>

      <ExperienceSection section={content.home.experienceSection} />

      <SectionWrapper>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
      </SectionWrapper>

      <CTASection
        title={content.servicesPage.cta.title}
        intro={content.servicesPage.cta.intro}
        primaryCta={content.servicesPage.cta.primaryCta}
        secondaryCta={content.servicesPage.cta.secondaryCta}
      />
    </main>
  );
}
