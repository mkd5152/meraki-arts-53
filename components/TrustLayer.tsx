import Link from "next/link";
import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type TrustLayerProps = {
  section: Content["home"]["trustSection"];
  social: Content["brand"]["social"];
};

export function TrustLayer({ section, social }: TrustLayerProps) {
  return (
    <SectionWrapper
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
    >
      <div className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
        <div className="rounded-[1.75rem] border border-line bg-ink p-6 text-paper shadow-frame">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-paper/60">
            {section.responseLabel}
          </p>
          <p className="mt-4 text-4xl font-semibold">{section.responseValue}</p>
          <div className="mt-8 grid gap-3">
            {social.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/20 px-4 text-sm font-semibold text-paper transition hover:border-paper hover:bg-paper hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {section.items.map((item, index) => (
            <div
              key={item.title}
              className="rounded-[1.5rem] border border-line bg-panel p-5 shadow-sm"
            >
              <p className="text-sm font-semibold text-clay">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-xl font-semibold text-ink">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
