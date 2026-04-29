import type { Metadata } from "next";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.aboutPage.hero.title,
  description: content.aboutPage.hero.intro
};

export default function AboutPage() {
  return (
    <main className="pt-16">
      <SectionWrapper
        eyebrow={content.aboutPage.hero.eyebrow}
        title={content.aboutPage.hero.title}
        intro={content.aboutPage.hero.intro}
        className="pt-16"
      />

      <SectionWrapper
        eyebrow={content.aboutPage.approach.eyebrow}
        title={content.aboutPage.approach.title}
        className="bg-white"
      >
        <div className="mx-auto max-w-3xl text-center text-base leading-8 text-stone-600 sm:text-lg">
          {content.aboutPage.approach.body}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.aboutPage.highlights.eyebrow}
        title={content.aboutPage.highlights.title}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {content.aboutPage.highlights.items.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>
    </main>
  );
}
