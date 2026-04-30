import type { Metadata } from "next";
import Image from "next/image";
import { CTASection } from "@/components/CTASection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.aboutPage.hero.title,
  description: content.aboutPage.hero.intro
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow={content.aboutPage.hero.eyebrow}
        title={content.aboutPage.hero.title}
        intro={content.aboutPage.hero.intro}
        image={content.home.hero.image}
        meta={content.artist.tagline}
      />

      <SectionWrapper
        eyebrow={content.aboutPage.visualIntro.eyebrow}
        title={content.aboutPage.visualIntro.title}
        intro={content.aboutPage.visualIntro.intro}
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-stretch">
          <div className="relative min-h-[22rem] overflow-hidden rounded-[1.75rem] border border-line bg-mist shadow-frame">
            <Image
              src={content.aboutPage.visualIntro.images[0]}
              alt={content.aboutPage.visualIntro.title}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-ink/55 p-4 text-paper backdrop-blur-md">
              <p className="text-sm font-medium leading-6 text-paper/78">
                {content.aboutPage.originStory.body}
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            {content.aboutPage.visualIntro.images.slice(1).map((image) => (
              <div
                key={image}
                className="relative min-h-[12rem] overflow-hidden rounded-[1.5rem] border border-line bg-mist shadow-sm"
              >
                <Image
                  src={image}
                  alt={content.aboutPage.visualIntro.title}
                  fill
                  sizes="(min-width: 1024px) 22vw, 50vw"
                  className="object-cover"
                />
              </div>
            ))}
            <article className="col-span-2 rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
                {content.aboutPage.originStory.eyebrow}
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                {content.aboutPage.originStory.title}
              </h2>
            </article>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.aboutPage.approach.eyebrow}
        title={content.aboutPage.approach.title}
        className="bg-panel"
      >
        <div className="mx-auto max-w-3xl text-center text-base leading-8 text-muted sm:text-lg">
          {content.aboutPage.approach.body}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.aboutPage.signatureStyle.eyebrow}
        title={content.aboutPage.signatureStyle.title}
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {content.aboutPage.signatureStyle.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.35rem] border border-line bg-panel p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.aboutPage.highlights.eyebrow}
        title={content.aboutPage.highlights.title}
        className="bg-panel"
      >
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
          {content.aboutPage.highlights.items.map((item) => (
            <article
              key={item.title}
              className="rounded-[1.35rem] border border-line bg-paper p-6 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </SectionWrapper>

      <CTASection
        eyebrow={content.cta.eyebrow}
        title={content.cta.title}
        intro={content.cta.intro}
        primaryCta={content.cta.primaryCta}
        secondaryCta={content.cta.secondaryCta}
      />
    </main>
  );
}
