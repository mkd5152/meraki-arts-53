import Image from "next/image";
import type { BrandContent } from "@/lib/getData";

type LogoMarkProps = {
  logo: BrandContent["logo"];
  compact?: boolean;
  footer?: boolean;
};

export function LogoMark({ logo, compact = false, footer = false }: LogoMarkProps) {
  const assets = "assets" in logo ? logo.assets : undefined;
  const wordmarkSrc = assets?.wordmarkSmall ?? assets?.wordmark ?? "";
  const wordmarkDarkSrc = assets?.wordmarkDarkSmall ?? assets?.wordmarkDark ?? "";
  const lightWordmarkClass = `w-auto object-contain ${
    footer ? "block h-16 sm:h-[4.75rem]" : "hidden h-12 sm:block sm:h-14"
  }`;
  const darkWordmarkClass = `hidden w-auto object-contain ${
    footer ? "h-16 dark:block sm:h-[4.75rem]" : "h-12 dark:sm:block sm:h-14"
  }`;
  const wordmarkWidth = footer ? 260 : 192;
  const wordmarkHeight = footer ? 151 : 112;
  const wordmarkSizes = footer ? "130px" : "96px";

  return (
    <span
      className="inline-flex min-w-0 items-center gap-3"
      aria-label={logo.wordmark}
    >
      {assets ? (
        <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-sm sm:h-12 sm:w-12">
          <Image
            src={assets.mark}
            alt=""
            width={96}
            height={96}
            sizes="48px"
            className="h-full w-full object-contain"
            aria-hidden="true"
          />
        </span>
      ) : (
        <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-panel text-lg font-semibold text-ink shadow-sm">
          <span className="absolute inset-1 rounded-full border border-clay/30" />
          <span className="relative">{logo.monogram}</span>
        </span>
      )}
      {!compact && (
        <>
          {assets ? (
            <span className="min-w-0">
              <Image
                src={wordmarkSrc}
                alt=""
                width={wordmarkWidth}
                height={wordmarkHeight}
                sizes={wordmarkSizes}
                className={`${lightWordmarkClass} dark:hidden`}
                aria-hidden="true"
              />
              <Image
                src={wordmarkDarkSrc}
                alt=""
                width={wordmarkWidth}
                height={wordmarkHeight}
                sizes={wordmarkSizes}
                className={darkWordmarkClass}
                aria-hidden="true"
              />
            </span>
          ) : (
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold tracking-[0.08em] text-ink sm:text-base">
                {logo.wordmark}
              </span>
              <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
                {logo.caption}
              </span>
            </span>
          )}
        </>
      )}
    </span>
  );
}
