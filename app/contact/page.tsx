import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { FAQSection } from "@/components/FAQSection";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getContent } from "@/lib/getData";
import {
  buildBreadcrumbJsonLd,
  buildMetadata,
  buildWebPageJsonLd,
  getPageKeywords,
  jsonLd
} from "@/lib/seo";

const content = getContent();

export const metadata: Metadata = {
  ...buildMetadata({
    title: content.contactPage.hero.title,
    description: content.contactPage.hero.intro,
    path: "/contact",
    image: content.artForms[1]?.coverImage,
    keywords: getPageKeywords(content, "contact")
  })
};

export default function ContactPage() {
  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Contact", path: "/contact" }
          ]),
          buildWebPageJsonLd({
            title: content.contactPage.hero.title,
            description: content.contactPage.hero.intro,
            path: "/contact",
            image: content.artForms[1]?.coverImage
          })
        ])}
      />
      <PageHero
        eyebrow={content.contactPage.hero.eyebrow}
        title={content.contactPage.hero.title}
        intro={content.contactPage.hero.intro}
        image={content.artForms[1]?.coverImage}
        meta={content.home.hero.featureLabel}
      />
      <SectionWrapper>
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <ContactForm
            form={content.contactPage.form}
            delivery={content.contactPage.delivery}
            artForms={content.artForms}
          />
          <aside className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
            <h2 className="text-2xl font-semibold text-ink">
              {content.contactPage.details.title}
            </h2>
            <ul className="mt-5 grid gap-3">
              {content.contactPage.details.items.map((item) => (
                <li
                  key={item}
                  className="rounded-xl bg-soft px-4 py-3 text-sm font-medium text-muted"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {content.contactPage.quickLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-soft px-4 text-sm font-semibold text-ink transition hover:border-clay hover:text-clay"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </SectionWrapper>
      <FAQSection faq={content.contactPage.faq} />
    </main>
  );
}
