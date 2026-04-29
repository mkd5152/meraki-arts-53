import Link from "next/link";
import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type MoodSectionProps = {
  section: Content["home"]["moodSection"];
};

export function MoodSection({ section }: MoodSectionProps) {
  return (
    <SectionWrapper
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.items.map((item) => (
          <Link
            key={item.title}
            href={item.href}
            className="group min-h-52 rounded-[1.35rem] border border-line bg-panel p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-soft"
          >
            <div className="mb-8 h-12 w-12 rounded-full border border-gold/45 bg-soft transition group-hover:border-clay" />
            <h3 className="text-xl font-semibold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {item.description}
            </p>
          </Link>
        ))}
      </div>
    </SectionWrapper>
  );
}
