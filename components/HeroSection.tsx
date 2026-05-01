"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { Artist, ArtForm, BrandContent, Content } from "@/lib/getData";

type HeroSectionProps = {
  artist: Artist;
  brand: BrandContent;
  artForms: ArtForm[];
  hero: Content["home"]["hero"];
};

export function HeroSection({ artist, brand, artForms, hero }: HeroSectionProps) {
  const heroPieces = artForms
    .map((artForm) => ({
      title: artForm.title,
      caption: artForm.gallery[0]?.caption ?? artForm.title,
      image: artForm.gallery[0]?.image ?? artForm.coverImage,
      href: `/art/${artForm.slug}`
    }))
    .filter((item) => item.image)
    .slice(0, 6);

  const fallbackPiece = {
    title: artist.brandName,
    caption: artist.tagline,
    image: hero.image,
    href: "/gallery"
  };
  const mosaicPieces = heroPieces.length > 0 ? heroPieces : [fallbackPiece];
  const featuredMediums = artForms.slice(0, 6);
  const mosaicClasses = [
    "col-span-2 row-span-2 sm:col-span-2 sm:row-span-5 lg:col-span-3 lg:row-span-2",
    "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-1",
    "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 lg:col-span-2 lg:row-span-1",
    "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-1",
    "col-span-1 row-span-1 sm:col-span-1 sm:row-span-2 lg:col-span-1 lg:row-span-1",
    "col-span-2 row-span-1 sm:col-span-2 sm:row-span-1 lg:col-span-1 lg:row-span-1"
  ];

  return (
    <section className="relative isolate overflow-hidden bg-ink pt-16 text-paper sm:pt-[4.5rem]">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-5 gap-px bg-ink sm:grid-cols-4 sm:grid-rows-5 lg:grid-cols-6 lg:grid-rows-2">
        {mosaicPieces.map((piece, index) => (
          <Link
            key={`${piece.title}-${piece.image}`}
            href={piece.href}
            className={`group relative min-h-0 overflow-hidden ${
              mosaicClasses[index] ?? "hidden lg:block"
            }`}
            aria-label={`${piece.title}: ${piece.caption}`}
          >
            <Image
              src={piece.image}
              alt={piece.caption}
              fill
              priority={index < 3}
              sizes={
                index === 0
                  ? "(min-width: 1024px) 50vw, 100vw"
                  : "(min-width: 1024px) 18vw, 50vw"
              }
              className="object-cover transition duration-700 group-hover:scale-105"
            />
            <span className="absolute inset-0 bg-ink/12 transition group-hover:bg-ink/0" />
            <span className="absolute bottom-3 left-3 hidden max-w-[82%] text-xs font-semibold uppercase tracking-[0.12em] text-paper drop-shadow sm:block">
              {piece.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/10" />
      <div className="absolute inset-0 hidden bg-[linear-gradient(90deg,rgb(var(--color-ink)/0.9)_0%,rgb(var(--color-ink)/0.58)_36%,rgb(var(--color-ink)/0.18)_72%,rgb(var(--color-ink)/0.05)_100%)] lg:block" />

      <motion.div
        className="relative z-10 mx-auto flex min-h-[78svh] w-full max-w-7xl flex-col justify-end px-4 pb-9 pt-16 sm:min-h-[76svh] sm:px-6 sm:pb-12 lg:min-h-[78svh] lg:px-8 lg:pb-16"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="max-w-3xl">
          <h1 className="sr-only">{artist.brandName}</h1>
          <div className="mx-auto max-w-[18rem] sm:max-w-[29rem] lg:max-w-[34rem]">
            <Image
              src={brand.logo.assets.wordmarkDark}
              alt=""
              width={1200}
              height={698}
              priority
              className="h-auto w-full drop-shadow-[0_18px_38px_rgb(0_0_0_/_0.32)] dark:hidden"
              aria-hidden="true"
            />
            <Image
              src={brand.logo.assets.wordmark}
              alt=""
              width={1200}
              height={698}
              priority
              className="hidden h-auto w-full drop-shadow-[0_18px_38px_rgb(39_37_35_/_0.18)] dark:block"
              aria-hidden="true"
            />
          </div>
          <p className="mt-5 max-w-2xl text-xl font-medium leading-8 text-paper sm:text-2xl">
            {artist.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-base leading-7 text-paper/76 sm:text-lg">
            {artist.intro}
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={hero.primaryCta.href}
              className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink shadow-soft transition hover:-translate-y-0.5 hover:bg-soft"
            >
              {hero.primaryCta.label}
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className="inline-flex min-h-11 min-w-0 items-center justify-center rounded-full border border-paper/26 bg-ink/36 px-6 py-3 text-sm font-semibold text-paper backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-paper/60 hover:bg-paper/10"
            >
              {hero.secondaryCta.label}
            </Link>
          </div>

          <div className="mt-8">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-paper/62">
              {hero.journeyLabel}
            </p>
            <div className="-mx-4 flex snap-x gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
              {featuredMediums.map((artForm) => (
                <Link
                  key={artForm.id}
                  href={`/art/${artForm.slug}`}
                  className="min-h-10 shrink-0 snap-start rounded-full border border-paper/20 bg-paper/10 px-4 py-2 text-xs font-semibold text-paper/88 backdrop-blur-xl transition hover:-translate-y-0.5 hover:border-paper/60 hover:bg-paper/18"
                >
                  {artForm.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
