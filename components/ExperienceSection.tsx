import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type ExperienceSectionProps = {
  section: Content["home"]["experienceSection"];
};

export function ExperienceSection({ section }: ExperienceSectionProps) {
  return (
    <SectionWrapper
      eyebrow={section.eyebrow}
      title={section.title}
      intro={section.intro}
      className="bg-panel"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {section.steps.map((step, index) => (
          <article
            key={step.title}
            className="relative overflow-hidden rounded-[1.35rem] border border-line bg-paper p-6 shadow-sm"
          >
            <p className="text-sm font-semibold text-clay">
              {String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="mt-8 text-xl font-semibold text-ink">{step.title}</h3>
            <p className="mt-3 text-sm leading-6 text-muted">
              {step.description}
            </p>
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full border border-gold/30" />
          </article>
        ))}
      </div>
    </SectionWrapper>
  );
}
