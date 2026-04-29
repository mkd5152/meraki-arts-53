"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artist, ArtForm, BrandContent, Content } from "@/lib/getData";
import { LogoMark } from "@/components/LogoMark";

type HeroSectionProps = {
  artist: Artist;
  brand: BrandContent;
  artForms: ArtForm[];
  hero: Content["home"]["hero"];
};

export function HeroSection({ artist, brand, artForms, hero }: HeroSectionProps) {
  const previewItems = artForms
    .map((artForm) => ({
      title: artForm.title,
      image: artForm.coverImage,
      href: `/art/${artForm.slug}`
    }))
    .slice(0, 6);

  const primaryPreview = previewItems[0] ?? {
    title: artist.brandName,
    image: hero.image,
    href: "/gallery"
  };

  return (
    <section className="relative isolate overflow-hidden bg-paper px-4 pb-14 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:min-h-[88svh] lg:px-8">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_12%,rgb(var(--color-clay)/0.18),transparent_28%),radial-gradient(circle_at_86%_24%,rgb(var(--color-sage)/0.16),transparent_28%),linear-gradient(135deg,rgb(var(--color-paper))_0%,rgb(var(--color-soft))_100%)]" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-panel to-transparent" />

      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,0.86fr)_minmax(420px,1fr)] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="min-w-0 max-w-2xl"
        >
          <div className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-panel/70 px-2.5 py-2 shadow-sm backdrop-blur-xl sm:gap-3 sm:px-3">
            <LogoMark logo={brand.logo} compact />
            <span className="min-w-0 truncate text-[10px] font-semibold uppercase tracking-[0.12em] text-muted sm:text-xs sm:tracking-[0.18em]">
              {hero.featureLabel}
            </span>
          </div>

          <p className="mb-4 max-w-full text-[11px] font-semibold uppercase tracking-[0.18em] text-clay sm:text-xs sm:tracking-[0.22em]">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-[9ch] break-words text-4xl font-semibold leading-[1.02] text-ink sm:max-w-3xl sm:text-6xl lg:text-7xl">
            {artist.brandName}
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink sm:mt-6 sm:text-2xl">
            {artist.tagline}
          </p>
          <p className="mt-3 max-w-xl text-base leading-8 text-muted sm:mt-4 sm:text-lg">
            {artist.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-soft transition hover:-translate-y-0.5 hover:bg-clay"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-line bg-panel/70 px-6 py-3 text-sm font-semibold text-ink backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-clay hover:text-clay"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-line bg-panel/68 p-4 backdrop-blur-xl"
              >
                <p className="text-2xl font-semibold text-ink">{stat.value}</p>
                <p className="mt-1 text-xs font-medium leading-5 text-muted">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-w-0"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
        >
          <div className="relative mx-auto max-w-xl lg:max-w-2xl">
            <div className="absolute -inset-3 rounded-[2.2rem] border border-gold/30 opacity-80 animate-frame-drift sm:-inset-4 sm:rounded-[2.4rem]" />
            <div className="absolute -inset-2 rounded-[2rem] bg-[linear-gradient(120deg,rgb(var(--color-gold)/0.22),rgb(var(--color-clay)/0.18),rgb(var(--color-sage)/0.18))] blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-line bg-panel p-2 shadow-frame">
              <div className="relative aspect-[4/5] overflow-hidden rounded-[1.45rem] min-[460px]:aspect-[5/4] lg:aspect-[4/5]">
                <Image
                  src={hero.image}
                  alt={hero.frameLabel}
                  fill
                  priority
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/8 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-white/15 bg-ink/55 p-4 text-paper backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/70">
                    {hero.frameLabel}
                  </p>
                  <p className="mt-2 text-lg font-semibold">
                    {primaryPreview.title}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-6">
              {previewItems.map((item, index) => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group relative aspect-square overflow-hidden rounded-2xl border border-line bg-panel shadow-sm"
                  aria-label={item.title}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 8vw, 28vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/45 to-transparent" />
                  <span className="absolute bottom-2 left-2 rounded-full bg-panel/85 px-2 py-1 text-[10px] font-semibold text-ink shadow-sm backdrop-blur">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
