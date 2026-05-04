import type { Metadata } from "next";
import { ArtCard } from "@/components/ArtCard";
import { CTASection } from "@/components/CTASection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { HeroSection } from "@/components/HeroSection";
import { JournalSection } from "@/components/JournalSection";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";
import { buildCollectionJsonLd, buildMetadata, jsonLd } from "@/lib/seo";

const content = getContent();

export const metadata: Metadata = buildMetadata({
  title: "Handmade Art, Custom Gifts, Mehendi & Decor",
  description:
    "Meraki Arts 53 creates handmade texture art, customized gifts, mehendi designs, paintings, textile details, and decor for personal moments.",
  image: content.home.hero.image,
  keywords: [
    "handmade customized gifts",
    "personalized handmade gifts",
    "mehendi designs",
    "texture art decor",
    "handmade art portfolio"
  ]
});

export default function Home() {
  const selectedItems = content.artForms
    .flatMap((artForm) => artForm.gallery)
    .slice(0, 9);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(
          buildCollectionJsonLd({
            title: content.home.selectedSection.title,
            description: content.home.selectedSection.intro,
            path: "/",
            image: content.home.hero.image,
            items: selectedItems
          })
        )}
      />
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
