import Image from "next/image";
import Link from "next/link";
import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type JournalSectionProps = {
  section: Content["home"]["journalSection"];
  journal: Content["journalPage"];
};

export function JournalSection({ section, journal }: JournalSectionProps) {
  const featuredArticles = journal.articles.slice(0, 3);

  return (
    <SectionWrapper
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      className="relative overflow-hidden bg-soft"
    >
      <div className="grid gap-5 lg:grid-cols-3">
        {featuredArticles.map((article, index) => (
          <Link
            key={article.slug}
            href={`/journal/${article.slug}`}
            className={`group overflow-hidden rounded-[1.6rem] border border-line bg-panel shadow-sm transition hover:-translate-y-1 hover:shadow-soft ${
              index === 0 ? "lg:col-span-2" : ""
            }`}
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-mist">
              <Image
                src={article.image}
                alt={article.title}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink backdrop-blur">
                {article.category}
              </span>
            </div>
            <div className="p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sage">
                {article.readTime}
              </p>
              <h3 className="mt-2 text-2xl font-semibold text-ink">
                {article.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {article.excerpt}
              </p>
              <p className="mt-5 text-sm font-semibold text-clay">
                {journal.readLabel}
              </p>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link
          href={section.actionHref}
          className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-clay"
        >
          {section.actionLabel}
        </Link>
      </div>
    </SectionWrapper>
  );
}
