import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";
import {
  buildArticleJsonLd,
  buildBreadcrumbJsonLd,
  buildMetadata,
  jsonLd
} from "@/lib/seo";

const content = getContent();

type JournalArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return content.journalPage.articles.map((article) => ({
    slug: article.slug
  }));
}

export async function generateMetadata({
  params
}: JournalArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = content.journalPage.articles.find((item) => item.slug === slug);

  if (!article) {
    return {};
  }

  return {
    ...buildMetadata({
      title: article.title,
      description: article.excerpt,
      path: `/journal/${article.slug}`,
      image: article.image,
      keywords: [article.category, article.title],
      type: "article"
    })
  };
}

export default async function JournalArticlePage({
  params
}: JournalArticlePageProps) {
  const { slug } = await params;
  const article = content.journalPage.articles.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Journal", path: "/journal" },
            { name: article.title, path: `/journal/${article.slug}` }
          ]),
          buildArticleJsonLd({
            article,
            path: `/journal/${article.slug}`
          })
        ])}
      />
      <PageHero
        eyebrow={article.category}
        title={article.title}
        intro={article.excerpt}
        image={article.image}
        meta={article.readTime}
      />
      <SectionWrapper>
        <article className="mx-auto max-w-3xl">
          <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-soft">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="(min-width: 768px) 768px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="grid gap-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-semibold text-ink">
                  {section.heading}
                </h2>
                <p className="mt-3 text-base leading-8 text-muted">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </article>
      </SectionWrapper>
      <CTASection
        title={content.journalPage.cta.title}
        intro={content.journalPage.cta.intro}
        primaryCta={content.journalPage.cta.primaryCta}
        secondaryCta={content.journalPage.cta.secondaryCta}
      />
    </main>
  );
}
