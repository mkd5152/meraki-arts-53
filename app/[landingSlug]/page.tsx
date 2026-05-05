import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";
import {
  buildBreadcrumbJsonLd,
  buildFAQPageJsonLd,
  buildMetadata,
  buildWebPageJsonLd,
  jsonLd
} from "@/lib/seo";
import { getLandingPageBySlug, landingPages } from "@/lib/landingPages";

const content = getContent();

export const dynamicParams = false;

type LandingPageProps = {
  params: Promise<{
    landingSlug: string;
  }>;
};

export function generateStaticParams() {
  return landingPages.map((page) => ({
    landingSlug: page.slug
  }));
}

export async function generateMetadata({
  params
}: LandingPageProps): Promise<Metadata> {
  const { landingSlug } = await params;
  const page = getLandingPageBySlug(landingSlug);

  if (!page) {
    return {};
  }

  return {
    ...buildMetadata({
      title: page.title,
      description: page.description,
      path: `/${page.slug}`,
      image: page.image,
      keywords: page.keywords
    })
  };
}

export default async function LandingPage({ params }: LandingPageProps) {
  const { landingSlug } = await params;
  const page = getLandingPageBySlug(landingSlug);

  if (!page) {
    notFound();
  }

  const relatedArtForms = content.artForms.filter((artForm) =>
    page.relatedArtSlugs.includes(artForm.slug)
  );

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: page.title, path: `/${page.slug}` }
          ]),
          buildWebPageJsonLd({
            title: page.title,
            description: page.description,
            path: `/${page.slug}`,
            image: page.image
          }),
          buildFAQPageJsonLd(page.faqs)
        ])}
      />
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        intro={page.description}
        image={page.image}
        meta={page.meta}
      />

      <SectionWrapper
        eyebrow="Buyer guide"
        title="What this request is best for"
        intro={page.summary}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {page.highlights.map((highlight) => (
            <div
              key={highlight}
              className="rounded-[1.25rem] border border-line bg-panel px-5 py-4 text-sm font-semibold leading-6 text-muted shadow-sm"
            >
              {highlight}
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-panel" title="Planning details">
        <div className="grid gap-5 lg:grid-cols-3">
          {page.sections.map((section) => (
            <article
              key={section.title}
              className="rounded-[1.5rem] border border-line bg-paper p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-ink">
                {section.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {section.body}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper title="Common questions">
        <div className="grid gap-5 lg:grid-cols-2">
          {page.faqs.map((item) => (
            <article
              key={item.question}
              className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-ink">
                {item.question}
              </h2>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      {relatedArtForms.length > 0 && (
        <SectionWrapper
          eyebrow="Related work"
          title="Browse matching pieces"
          className="bg-panel"
        >
          <GalleryGrid
            artForms={relatedArtForms}
            allLabel={content.galleryPage.allLabel}
            viewer={content.galleryViewer}
            showFilters={false}
            limit={6}
            inquiryLabel={content.galleryPage.inquiryLabel}
            similarLabel={content.galleryPage.similarLabel}
            delivery={content.contactPage.delivery}
            watermarkSrc={content.brand.logo.assets.watermarkDark}
          />
        </SectionWrapper>
      )}

      <CTASection
        eyebrow="Custom request"
        title="Ready to discuss a piece?"
        intro="Share the occasion, city, timeline, budget range, and reference images so the request can be scoped clearly."
        primaryCta={{ label: "Start a request", href: "/contact" }}
        secondaryCta={{ label: "View full gallery", href: "/gallery" }}
      />
    </main>
  );
}
