import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type TestimonialSectionProps = {
  section: Content["home"]["testimonialSection"];
};

export function TestimonialSection({ section }: TestimonialSectionProps) {
  return (
    <SectionWrapper
      eyebrow={section.eyebrow}
      title={section.title}
      className="bg-panel"
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {section.items.map((item) => (
          <figure
            key={item.name}
            className="rounded-[1.35rem] border border-line bg-paper p-6 shadow-sm"
          >
            <blockquote className="text-xl font-medium leading-8 text-ink">
              {item.quote}
            </blockquote>
            <figcaption className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-clay">
              {item.name}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionWrapper>
  );
}
