import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
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
    <main className="pt-16">
      <SectionWrapper
        eyebrow={content.servicesPage.hero.eyebrow}
        title={content.servicesPage.hero.title}
        intro={content.servicesPage.hero.intro}
        className="pt-16"
      />

      <SectionWrapper
        eyebrow={content.servicesPage.overview.eyebrow}
        title={content.servicesPage.overview.title}
        className="bg-white"
      >
        <p className="mx-auto max-w-3xl text-center text-base leading-8 text-stone-600 sm:text-lg">
          {content.servicesPage.overview.body}
        </p>
      </SectionWrapper>

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
