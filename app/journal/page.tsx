import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.journalPage.hero.title,
  description: content.journalPage.hero.intro
};

export default function JournalPage() {
  const [featured, ...articles] = content.journalPage.articles;
  const categories = Array.from(
    new Set(content.journalPage.articles.map((article) => article.category))
  );

  return (
    <main>
      <PageHero
        eyebrow={content.journalPage.hero.eyebrow}
        title={content.journalPage.hero.title}
        intro={content.journalPage.hero.intro}
        image={featured?.image}
        meta={content.journalPage.featuredLabel}
      />
      <SectionWrapper>
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {content.journalPage.categoryLabel}
          </p>
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-ink"
            >
              {category}
            </span>
          ))}
        </div>
        {featured && (
          <Link
            href={`/journal/${featured.slug}`}
            className="group mb-6 grid overflow-hidden rounded-[1.75rem] border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:shadow-soft lg:grid-cols-[1.05fr_0.95fr]"
          >
            <div className="relative min-h-[18rem] overflow-hidden bg-mist">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
                {featured.category} / {featured.readTime}
              </p>
              <h2 className="mt-4 text-3xl font-semibold text-ink sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-base leading-7 text-muted">
                {featured.excerpt}
              </p>
              <p className="mt-7 text-sm font-semibold text-clay">
                {content.journalPage.readLabel}
              </p>
            </div>
          </Link>
        )}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/journal/${article.slug}`}
              className="group overflow-hidden rounded-[1.5rem] border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sage">
                  {article.category} / {article.readTime}
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-ink">
                  {article.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {article.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>
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
