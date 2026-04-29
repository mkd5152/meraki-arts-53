import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.galleryPage.hero.title,
  description: content.galleryPage.hero.intro
};

export default function GalleryPage() {
  return (
    <main className="pt-16">
      <SectionWrapper
        eyebrow={content.galleryPage.hero.eyebrow}
        title={content.galleryPage.hero.title}
        intro={content.galleryPage.hero.intro}
        className="pt-16"
      >
        <GalleryGrid
          artForms={content.artForms}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
        />
      </SectionWrapper>
    </main>
  );
}
