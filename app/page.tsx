import { ArtCard } from "@/components/ArtCard";
import { CTASection } from "@/components/CTASection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroSection } from "@/components/HeroSection";
import { JournalSection } from "@/components/JournalSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

export default function Home() {
  const content = getContent();

  return (
    <main>
      <HeroSection
        artist={content.artist}
        brand={content.brand}
        artForms={content.artForms}
        hero={content.home.hero}
      />

      <SectionWrapper
        eyebrow={content.home.selectedSection.eyebrow}
        title={content.home.selectedSection.title}
        intro={content.home.selectedSection.intro}
        className="bg-panel"
        contentClassName="max-w-7xl"
      >
        <GalleryGrid
          artForms={content.artForms}
          allLabel={content.home.selectedSection.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
          limit={9}
          countLabel={content.galleryPage.countLabel}
          viewAllLabel={content.home.selectedSection.viewAllLabel}
          viewAllHref={content.home.selectedSection.viewAllHref}
        />
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.home.featuredSection.eyebrow}
        title={content.home.featuredSection.title}
        intro={content.home.featuredSection.intro}
        contentClassName="max-w-7xl"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {content.artForms.map((artForm) => (
            <ArtCard
              key={artForm.id}
              title={artForm.title}
              description={artForm.description}
              image={artForm.coverImage}
              categoryAccent={artForm.accent}
              href={`/art/${artForm.slug}`}
              actionLabel={content.home.featuredSection.actionLabel}
            />
          ))}
        </div>
      </SectionWrapper>

      <ExperienceSection section={content.home.experienceSection} />
      <JournalSection
        section={content.home.journalSection}
        journal={content.journalPage}
      />

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
