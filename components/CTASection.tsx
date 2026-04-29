import Link from "next/link";

type CTASectionProps = {
  eyebrow?: string;
  title: string;
  intro: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
};

export function CTASection({
  eyebrow,
  title,
  intro,
  primaryCta,
  secondaryCta
}: CTASectionProps) {
  return (
    <section className="px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-6xl overflow-hidden rounded-lg bg-ink px-5 py-10 text-white shadow-soft sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/62">
                {eyebrow}
              </p>
            )}
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              {title}
            </h2>
            <p className="mt-4 text-base leading-7 text-white/72 sm:text-lg">
              {intro}
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Link
              href={primaryCta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-5 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-soft"
            >
              {primaryCta.label}
            </Link>
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/24 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
