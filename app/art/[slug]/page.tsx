import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getArtFormBySlug, getContent } from "@/lib/getData";
import {
  buildArtFormKeywords,
  buildBreadcrumbJsonLd,
  buildCollectionJsonLd,
  buildMetadata,
  jsonLd
} from "@/lib/seo";

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
    ...buildMetadata({
      title: artForm.title,
      description: artForm.description,
      path: `/art/${artForm.slug}`,
      image: artForm.coverImage,
      keywords: buildArtFormKeywords(artForm)
    })
  };
}

export default async function ArtFormPage({ params }: PageProps) {
  const { slug } = await params;
  const artForm = getArtFormBySlug(slug);

  if (!artForm) {
    notFound();
  }

  const story = "story" in artForm && artForm.story
    ? artForm.story
    : artForm.description;
  const popularRequests =
    "popularRequests" in artForm ? artForm.popularRequests ?? [] : [];
  const useCases = "useCases" in artForm ? artForm.useCases ?? [] : [];
  const searchContent = artForm.searchContent;

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/gallery" },
            { name: artForm.title, path: `/art/${artForm.slug}` }
          ]),
          buildCollectionJsonLd({
            title: `${artForm.title} Portfolio`,
            description: artForm.description,
            path: `/art/${artForm.slug}`,
            image: artForm.coverImage,
            items: artForm.gallery
          })
        ])}
      />
      <PageHero
        eyebrow={content.navigation.workDropdownLabel}
        title={artForm.title}
        intro={artForm.description}
        image={artForm.coverImage}
        meta={`${artForm.gallery.length} ${content.galleryPage.countLabel}`}
      />

      <SectionWrapper
        eyebrow={content.artPage.detailSection.eyebrow}
        title={content.artPage.detailSection.title}
        intro={content.artPage.detailSection.intro}
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
              {artForm.title}
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              {story}
            </p>
          </article>
          {popularRequests.length > 0 && (
            <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">
                {content.artPage.detailSection.requestsLabel}
              </h2>
              <ul className="mt-4 grid gap-3">
                {popularRequests.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-soft px-4 py-3 text-sm font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}
          {useCases.length > 0 && (
            <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">
                {content.artPage.detailSection.useCasesLabel}
              </h2>
              <ul className="mt-4 grid gap-3">
                {useCases.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-soft px-4 py-3 text-sm font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.navigation.workDropdownLabel}
        title={searchContent.title}
        intro={searchContent.body}
        className="bg-panel"
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-line bg-paper p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              {searchContent.localTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              {searchContent.localBody}
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-line bg-paper p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              Popular request themes
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {searchContent.targetKeywords.slice(0, 8).map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full bg-soft px-3 py-2 text-xs font-semibold text-muted"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-panel">
        <GalleryGrid
          artForms={[artForm]}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
          inquiryLabel={content.galleryPage.inquiryLabel}
          similarLabel={content.galleryPage.similarLabel}
          delivery={content.contactPage.delivery}
          watermarkSrc={content.brand.logo.assets.watermarkDark}
          inlineCta={content.artPage.inlineCta}
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
