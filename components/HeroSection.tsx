"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artist, ArtForm, Content } from "@/lib/getData";

type HeroSectionProps = {
  artist: Artist;
  artForms: ArtForm[];
  hero: Content["home"]["hero"];
};

export function HeroSection({ artist, artForms, hero }: HeroSectionProps) {
  const heroImage = {
    title: artist.brandName,
    image: hero.image
  };
  const portfolioImages = [
    heroImage,
    ...artForms.map((artForm) => ({
      title: artForm.title,
      image: artForm.coverImage
    }))
  ].filter(
    (item, index, items) =>
      items.findIndex((candidate) => candidate.image === item.image) === index
  );
  const galleryWall = portfolioImages.slice(0, 7);
  const disciplineStrip = artForms.slice(0, 5);

  return (
    <section className="relative flex min-h-[78svh] items-center overflow-hidden bg-ink px-4 pb-12 pt-24 text-white sm:min-h-[82svh] sm:px-6 sm:pb-16 sm:pt-28 lg:min-h-[84svh] lg:px-8">
      <div className="absolute inset-0">
        <Image
          src={hero.image}
          alt={artist.brandName}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.5]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_32%,rgba(183,102,77,0.34),transparent_34%),linear-gradient(115deg,rgba(39,37,35,0.9)_0%,rgba(39,37,35,0.72)_44%,rgba(39,37,35,0.28)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(39,37,35,0.88)_0%,rgba(39,37,35,0.08)_46%,rgba(39,37,35,0.62)_100%)]" />
      </div>

      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[58vw] max-w-5xl lg:block">
        <div className="absolute inset-0 grid grid-cols-[0.8fr_1fr_0.76fr] grid-rows-2 gap-4 py-24 pr-8">
          {galleryWall.slice(1, 7).map((item, index) => (
            <motion.div
              key={item.image}
              className={`relative overflow-hidden rounded-lg border border-white/[0.12] bg-white/[0.08] shadow-2xl ${
                index % 3 === 0
                  ? "mt-16"
                  : index % 3 === 1
                    ? "mb-14"
                    : "mt-4"
              }`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.7, ease: "easeOut" }}
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority={index < 2}
                sizes="(min-width: 1024px) 20vw, 100vw"
                className="object-cover opacity-[0.96] saturate-[0.96]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-white/[0.06]" />
            </motion.div>
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/[0.54] to-transparent" />
      </div>

      <motion.div
        className="pointer-events-none absolute bottom-8 right-6 hidden max-w-[42rem] items-center gap-2 lg:flex"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.6, ease: "easeOut" }}
      >
        {disciplineStrip.map((artForm) => (
          <span
            key={artForm.id}
            className="rounded-full border border-white/[0.16] bg-white/[0.09] px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-white/[0.76] backdrop-blur-md"
          >
            {artForm.title}
          </span>
        ))}
      </motion.div>

      <motion.div
        className="relative z-10 mx-auto w-full max-w-6xl"
        initial={{ opacity: 1, y: 0 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[34rem] sm:max-w-2xl">
          <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/[0.68] sm:text-xs sm:tracking-[0.26em]">
            {hero.eyebrow}
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] text-[#fffaf4] drop-shadow-[0_16px_42px_rgba(0,0,0,0.35)] sm:text-6xl md:text-7xl lg:text-8xl">
            {artist.brandName}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-7 text-white/[0.86] sm:text-xl sm:leading-8">
            {artist.tagline}
          </p>
          <p className="mt-3 max-w-xl text-base leading-7 text-white/[0.68] sm:text-lg">
            {artist.intro}
          </p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg bg-[#fffaf4] px-5 py-3 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-soft sm:w-auto"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex min-h-11 w-full items-center justify-center rounded-lg border border-white/[0.22] bg-white/[0.08] px-5 py-3 text-sm font-semibold text-white backdrop-blur-md transition hover:-translate-y-0.5 hover:border-white/50 hover:bg-white/[0.14] sm:w-auto"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
