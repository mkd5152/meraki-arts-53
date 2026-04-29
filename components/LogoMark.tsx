import type { BrandContent } from "@/lib/getData";

type LogoMarkProps = {
  logo: BrandContent["logo"];
  compact?: boolean;
};

export function LogoMark({ logo, compact = false }: LogoMarkProps) {
  return (
    <span className="inline-flex min-w-0 items-center gap-3" aria-label={logo.wordmark}>
      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/55 bg-panel text-lg font-semibold text-ink shadow-sm">
        <span className="absolute inset-1 rounded-full border border-clay/30" />
        <span className="relative">{logo.monogram}</span>
      </span>
      {!compact && (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-[0.08em] text-ink sm:text-base">
            {logo.wordmark}
          </span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-muted sm:block">
            {logo.caption}
          </span>
        </span>
      )}
    </span>
  );
}
