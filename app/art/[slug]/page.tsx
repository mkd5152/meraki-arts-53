import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
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
    <main className="pt-16">
      <section className="px-4 pb-12 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-mist shadow-soft">
            <Image
              src={artForm.coverImage}
              alt={artForm.title}
              fill
              priority
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              {content.navigation.workDropdownLabel}
            </p>
            <h1 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
              {artForm.title}
            </h1>
            <p className="mt-5 text-base leading-8 text-stone-600 sm:text-lg">
              {artForm.description}
            </p>
          </div>
        </div>
      </section>

      <SectionWrapper className="bg-white">
        <GalleryGrid
          artForms={[artForm]}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
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
