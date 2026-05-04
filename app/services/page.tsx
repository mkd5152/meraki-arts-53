import type { Metadata } from "next";
import { CTASection } from "@/components/CTASection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { ServiceCard } from "@/components/ServiceCard";
import { getContent } from "@/lib/getData";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildServicesJsonLd,
  buildWebPageJsonLd,
  jsonLd
} from "@/lib/seo";

const content = getContent();

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.servicesPage.hero.title,
    description: content.servicesPage.hero.intro,
    path: "/services",
    image: content.artForms[content.artForms.length - 1]?.coverImage,
    keywords: [
      "custom gift services",
      "handmade decor services",
      "custom handmade commissions",
      "personalized gift commissions"
    ]
  })
};

export default function ServicesPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Services", path: "/services" }
          ]),
          buildWebPageJsonLd({
            title: content.servicesPage.hero.title,
            description: content.servicesPage.hero.intro,
            path: "/services",
            image: content.artForms[content.artForms.length - 1]?.coverImage
          }),
          buildServicesJsonLd(content)
        ])}
      />
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
        {content.servicesPage.pricingNote && (
          <p className="mx-auto mb-8 max-w-3xl rounded-[1.25rem] border border-line bg-panel px-5 py-4 text-center text-sm font-medium leading-6 text-muted shadow-sm">
            {content.servicesPage.pricingNote}
          </p>
        )}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              includesLabel={content.servicesPage.includesLabel}
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
