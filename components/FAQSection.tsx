import type { Content } from "@/lib/getData";
import { SectionWrapper } from "@/components/SectionWrapper";

type FAQSectionProps = {
  faq: Content["contactPage"]["faq"];
};

export function FAQSection({ faq }: FAQSectionProps) {
  return (
    <SectionWrapper eyebrow={faq.eyebrow} title={faq.title} className="bg-panel">
      <div className="mx-auto grid max-w-4xl gap-3">
        {faq.items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[1.1rem] border border-line bg-paper p-5"
          >
            <summary className="cursor-pointer list-none text-base font-semibold text-ink">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-6 text-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </SectionWrapper>
  );
}
