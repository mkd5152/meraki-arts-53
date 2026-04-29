import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";

const content = getContent();

export const metadata: Metadata = {
  title: content.contactPage.hero.title,
  description: content.contactPage.hero.intro
};

export default function ContactPage() {
  return (
    <main className="pt-16">
      <SectionWrapper
        eyebrow={content.contactPage.hero.eyebrow}
        title={content.contactPage.hero.title}
        intro={content.contactPage.hero.intro}
        className="pt-16"
      >
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ContactForm form={content.contactPage.form} />
          <aside className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">
              {content.contactPage.details.title}
            </h2>
            <ul className="mt-5 grid gap-3">
              {content.contactPage.details.items.map((item) => (
                <li
                  key={item}
                  className="rounded-lg bg-soft px-4 py-3 text-sm font-medium text-stone-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </SectionWrapper>
    </main>
  );
}
