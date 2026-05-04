import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";
import {
  buildBreadcrumbJsonLd,
  buildCollectionJsonLd,
  buildMetadata,
  getPageKeywords,
  jsonLd
} from "@/lib/seo";

const content = getContent();

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.galleryPage.hero.title,
    description: content.galleryPage.hero.intro,
    path: "/gallery",
    image: content.artForms[0]?.coverImage,
    keywords: getPageKeywords(content, "gallery")
  })
};

export default function GalleryPage() {
  const galleryItems = content.artForms.flatMap((artForm) => artForm.gallery);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: content.galleryPage.hero.title, path: "/gallery" }
          ]),
          buildCollectionJsonLd({
            title: content.galleryPage.hero.title,
            description: content.galleryPage.hero.intro,
            path: "/gallery",
            image: content.artForms[0]?.coverImage,
            items: galleryItems
          })
        ])}
      />
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
