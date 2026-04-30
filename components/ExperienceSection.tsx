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
      <div className="-mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {section.steps.map((step, index) => (
          <article
            key={step.title}
            className="relative min-w-[16.5rem] snap-start overflow-hidden rounded-[1.35rem] border border-line bg-paper p-6 shadow-sm sm:min-w-0"
          >
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-clay">
                {String(index + 1).padStart(2, "0")}
              </p>
              {"icon" in step && step.icon && (
                <span className="rounded-full border border-line bg-soft px-3 py-1 text-xs font-semibold text-muted">
                  {step.icon}
                </span>
              )}
            </div>
            <h3 className="mt-8 text-xl font-semibold text-ink">
              {step.title}
            </h3>
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
