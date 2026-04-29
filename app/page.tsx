import Link from "next/link";
import { ArtCard } from "@/components/ArtCard";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroSection } from "@/components/HeroSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { ServiceCard } from "@/components/ServiceCard";
import { getContent } from "@/lib/getData";

export default function Home() {
  const content = getContent();

  return (
    <main>
      <HeroSection
        artist={content.artist}
        artForms={content.artForms}
        hero={content.home.hero}
      />

      <SectionWrapper
        eyebrow={content.home.featuredSection.eyebrow}
        title={content.home.featuredSection.title}
        intro={content.home.featuredSection.intro}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.artForms.map((artForm) => (
            <ArtCard
              key={artForm.id}
              title={artForm.title}
              description={artForm.description}
              image={artForm.coverImage}
              href={`/art/${artForm.slug}`}
              actionLabel={content.home.featuredSection.actionLabel}
            />
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.home.selectedSection.eyebrow}
        title={content.home.selectedSection.title}
        intro={content.home.selectedSection.intro}
        className="bg-white"
      >
        <GalleryGrid
          artForms={content.artForms}
          allLabel={content.home.selectedSection.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
          limit={6}
          viewAllLabel={content.home.selectedSection.viewAllLabel}
          viewAllHref={content.home.selectedSection.viewAllHref}
        />
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.home.servicesSection.eyebrow}
        title={content.home.servicesSection.title}
        intro={content.home.servicesSection.intro}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {content.services.slice(0, 3).map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href={content.home.servicesSection.actionHref}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-clay"
          >
            {content.home.servicesSection.actionLabel}
          </Link>
        </div>
      </SectionWrapper>

      <CTASection
        eyebrow={content.cta.eyebrow}
        title={content.cta.title}
        intro={content.cta.intro}
        primaryCta={content.cta.primaryCta}
        secondaryCta={content.cta.secondaryCta}
      />
    </main>
  );
}
