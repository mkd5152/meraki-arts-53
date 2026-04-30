import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.galleryPage.hero.title,
  description: content.galleryPage.hero.intro
};

export default function GalleryPage() {
  return (
    <main>
      <PageHero
        eyebrow={content.galleryPage.hero.eyebrow}
        title={content.galleryPage.hero.title}
        intro={content.galleryPage.hero.intro}
        image={content.artForms[0]?.coverImage}
        meta={`${content.artForms.length} ${content.galleryPage.featuredLabel}`}
      />
      <SectionWrapper>
        <GalleryGrid
          artForms={content.artForms}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
          countLabel={content.galleryPage.countLabel}
          inquiryLabel={content.galleryPage.inquiryLabel}
          favoriteLabel={content.galleryPage.favoriteLabel}
          savedLabel={content.galleryPage.savedLabel}
          similarLabel={content.galleryPage.similarLabel}
          filters={content.galleryPage.filters}
          featuredSection={content.galleryPage.featuredSection}
          delivery={content.contactPage.delivery}
          watermarkSrc={content.brand.logo.assets.watermarkDark}
        />
      </SectionWrapper>
    </main>
  );
}
