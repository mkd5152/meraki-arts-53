import Image from "next/image";
import { BrandTexture } from "@/components/BrandTexture";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  meta?: string;
};

export function PageHero({ eyebrow, title, intro, image, meta }: PageHeroProps) {
  return (
    <section className="relative isolate overflow-hidden px-4 pb-10 pt-24 sm:px-6 sm:pb-14 sm:pt-28 lg:px-8">
      <BrandTexture className="-z-10 opacity-45" />
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-semibold leading-tight text-ink sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
            {intro}
          </p>
          {meta && (
            <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-sage">
              {meta}
            </p>
          )}
        </div>
        {image && (
          <div className="relative min-h-72 overflow-hidden rounded-[2rem] border border-line bg-panel p-2 shadow-frame">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.45rem]">
              <Image
                src={image}
                alt={title}
                fill
                priority
                sizes="(min-width: 1024px) 48vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
