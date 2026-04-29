import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getArtFormBySlug, getContent } from "@/lib/getData";

const content = getContent();

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return content.artForms.map((artForm) => ({
    slug: artForm.slug
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artForm = getArtFormBySlug(slug);

  if (!artForm) {
    return {};
  }

  return {
    title: artForm.title,
    description: artForm.description
  };
}

export default async function ArtFormPage({ params }: PageProps) {
  const { slug } = await params;
  const artForm = getArtFormBySlug(slug);

  if (!artForm) {
    notFound();
  }

  return (
    <main>
      <PageHero
        eyebrow={content.navigation.workDropdownLabel}
        title={artForm.title}
        intro={artForm.description}
        image={artForm.coverImage}
        meta={`${artForm.gallery.length} ${content.galleryPage.countLabel}`}
      />

      <SectionWrapper className="bg-panel">
        <GalleryGrid
          artForms={[artForm]}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
          inquiryLabel={content.galleryPage.inquiryLabel}
          favoriteLabel={content.galleryPage.favoriteLabel}
          savedLabel={content.galleryPage.savedLabel}
          similarLabel={content.galleryPage.similarLabel}
          delivery={content.contactPage.delivery}
          watermarkSrc={content.brand.logo.assets.watermarkDark}
        />
      </SectionWrapper>

      <CTASection
        title={content.artPage.cta.title}
        intro={content.artPage.cta.intro}
        primaryCta={content.artPage.cta.primaryCta}
        secondaryCta={content.artPage.cta.secondaryCta}
      />
    </main>
  );
}
