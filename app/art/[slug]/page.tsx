import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CTASection } from "@/components/CTASection";
import { GalleryGrid } from "@/components/GalleryGrid";
import { PageHero } from "@/components/PageHero";
import { SectionWrapper } from "@/components/SectionWrapper";
import { getArtFormBySlug, getContent } from "@/lib/getData";
import {
  buildArtFormKeywords,
  buildBreadcrumbJsonLd,
  buildCollectionJsonLd,
  buildFAQPageJsonLd,
  buildMetadata,
  jsonLd
} from "@/lib/seo";

const content = getContent();

export const dynamicParams = false;

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type RequestGuide = {
  seoTitle: string;
  priceGuidance: string;
  turnaround: string;
  delivery: string;
  materials: string;
  process: string[];
  faqs: Array<{
    question: string;
    answer: string;
  }>;
};

const defaultRequestGuide: RequestGuide = {
  seoTitle: "Custom Handmade Art and Gifts in India",
  priceGuidance:
    "Pricing is quoted after size, material, detail level, quantity, personalization, and deadline are clear.",
  turnaround:
    "Share your required date first. Smaller pieces can usually be planned faster, while detailed or quantity-led requests need more lead time.",
  delivery:
    "Requests can be discussed for Pune, Chennai, and shippable handmade pieces across India.",
  materials:
    "Material choices are confirmed after the design direction, size, usage, and shipping needs are understood.",
  process: [
    "Share the occasion, reference images, size, colors, and timeline.",
    "Confirm the medium, design direction, feasibility, and quote.",
    "Approve the final direction before handmade execution begins.",
    "Receive pickup, local handover, or India shipping guidance where suitable."
  ],
  faqs: [
    {
      question: "Can I request a custom version?",
      answer:
        "Yes. Share your preferred size, colors, occasion, budget range, and deadline so the piece can be scoped properly."
    },
    {
      question: "Do you ship across India?",
      answer:
        "Shippable handmade gifts and decor can be discussed for India delivery. Fragile, large, or installation-led pieces are confirmed case by case."
    }
  ]
};

const requestGuides: Record<string, RequestGuide> = {
  "texture-art": {
    seoTitle: "Texture Art Wall Decor in Pune, Chennai and India",
    priceGuidance:
      "Texture art is quoted by canvas or panel size, relief depth, floral/detail complexity, color palette, framing needs, and finish.",
    turnaround:
      "Recommended lead time is 1-3 weeks depending on size, drying time, finish, and shipping readiness.",
    delivery:
      "Texture art requests are available for Pune, Chennai, and India shipping when the piece can be packed safely.",
    materials:
      "Typical choices include canvas or panel bases, texture paste, acrylic color, metallic accents, sealants, and optional framing.",
    process: [
      "Share wall size, room photos, palette, and reference mood.",
      "Confirm scale, texture direction, finish, and quote.",
      "Approve the final composition before detailed making starts.",
      "Plan safe packing, pickup, or India shipping based on size."
    ],
    faqs: [
      {
        question: "Is texture art good for gifting?",
        answer:
          "Yes. Smaller floral relief panels and color-led pieces work well for housewarming, wedding, and room decor gifts."
      },
      {
        question: "Can the colors match my room?",
        answer:
          "Yes. Share wall photos, furniture tones, and preferred colors so the piece can be planned around the space."
      }
    ]
  },
  terrazzo: {
    seoTitle: "Terrazzo Decor and Housewarming Gifts in India",
    priceGuidance:
      "Terrazzo-inspired decor is quoted by object size, mold shape, color mixing, finish, and whether it is a single piece or set.",
    turnaround:
      "Recommended lead time is usually 1-2 weeks for small decor objects and longer for custom sets.",
    delivery:
      "Small decor pieces can be discussed for Pune, Chennai, and India shipping with protective packing.",
    materials:
      "Pieces may use terrazzo-style mixes, pigments, flakes, sealants, and display-safe finishing depending on the request.",
    process: [
      "Choose the use: tray, shelf decor, desk accent, or gift object.",
      "Share colors, size, quantity, and occasion.",
      "Confirm finish, quote, and handling instructions.",
      "Pack for local handover or India shipping where suitable."
    ],
    faqs: [
      {
        question: "Is terrazzo decor suitable for housewarming gifts?",
        answer:
          "Yes. Trays and small decor objects are strong options for housewarming, shelf styling, and desk accents."
      },
      {
        question: "Can I request a color theme?",
        answer:
          "Yes. Neutral, pastel, festive, or room-matched palettes can be planned before making."
      }
    ]
  },
  mehendi: {
    seoTitle: "Mehendi Artist in Pune and Chennai",
    priceGuidance:
      "Mehendi is quoted by occasion, design coverage, pattern density, number of hands, and time needed.",
    turnaround:
      "Book as early as possible for weddings and festive dates. Smaller personal designs can be discussed closer to the date if availability allows.",
    delivery:
      "Mehendi is an in-person service for Pune and Chennai by availability. Online design direction can be discussed for reference planning.",
    materials:
      "Designs are planned around henna style, coverage, spacing, motif preference, and occasion requirements.",
    process: [
      "Share the event date, city, number of people, and design density.",
      "Choose bridal, festive, party, simple, or personalized motifs.",
      "Confirm availability, timing, and quote.",
      "Keep references ready so the final design direction is clear."
    ],
    faqs: [
      {
        question: "Do you take bridal mehendi requests?",
        answer:
          "Bridal and detailed occasion requests can be discussed with date, location, design density, and timing details."
      },
      {
        question: "Can I share reference designs?",
        answer:
          "Yes. References help set the pattern density, motif style, and overall look before the booking is confirmed."
      }
    ]
  },
  "chenille-craft": {
    seoTitle: "Chenille Craft Gifts in Pune, Chennai and India",
    priceGuidance:
      "Chenille craft is quoted by size, number of stems or pieces, color choices, arrangement style, and packaging needs.",
    turnaround:
      "Recommended lead time is 5-10 days for small pieces and longer for sets or quantity orders.",
    delivery:
      "Small chenille gifts can be discussed for Pune, Chennai, and India shipping when packing is suitable.",
    materials:
      "Typical materials include chenille stems, floral wire, soft accents, packaging, and optional keepsake tags.",
    process: [
      "Pick the gift type: bouquet, mini floral, desk decor, or keepsake.",
      "Share colors, quantity, occasion, and deadline.",
      "Confirm design, packaging direction, and quote.",
      "Prepare for pickup, handover, or shipping where suitable."
    ],
    faqs: [
      {
        question: "Are chenille flowers good birthday gifts?",
        answer:
          "Yes. They work well as soft, playful, long-lasting floral keepsakes for birthdays and small celebrations."
      },
      {
        question: "Can I order multiple pieces?",
        answer:
          "Quantity orders can be discussed with color palette, count, packaging, and deadline."
      }
    ]
  },
  "outline-art": {
    seoTitle: "Outline Art and Personalized Motif Gifts in India",
    priceGuidance:
      "Outline art is quoted by panel size, motif complexity, personalization, borders, material, and finishing detail.",
    turnaround:
      "Recommended lead time is 1-2 weeks for small panels and longer for detailed or textile-inspired work.",
    delivery:
      "Outline art and motif gifts can be discussed for Pune, Chennai, and India shipping where safe packing is possible.",
    materials:
      "Materials depend on the format and may include panel bases, paint, linework materials, accents, and protective finishing.",
    process: [
      "Share initials, motifs, floral references, or border inspiration.",
      "Confirm the panel format, size, color direction, and quote.",
      "Review the motif direction before making begins.",
      "Prepare for display, gifting, or shipping."
    ],
    faqs: [
      {
        question: "Can outline art include names or initials?",
        answer:
          "Yes. Personalized motifs, initials, florals, and lace-style borders can be scoped before making."
      },
      {
        question: "Is it suitable for minimal decor?",
        answer:
          "Yes. Clean linework and soft motifs are useful for keepsakes, minimal panels, and textile-inspired gifts."
      }
    ]
  },
  lamasa: {
    seoTitle: "Lamasa Handmade Decor and Miniature Gifts in India",
    priceGuidance:
      "Lamasa pieces are quoted by object size, sculpted detail, color work, quantity, and finish.",
    turnaround:
      "Recommended lead time is 1-3 weeks depending on sculpting, drying, finishing, and packing needs.",
    delivery:
      "Small lamasa decor can be discussed for Pune, Chennai, and India shipping if the piece can be packed safely.",
    materials:
      "Lamasa requests may use sculpting material, pigments, miniature details, sealants, trays, and display elements.",
    process: [
      "Choose the object type: tray, miniature, wall hanging, or theme piece.",
      "Share theme, colors, size, occasion, and deadline.",
      "Confirm detail level, quote, and durability needs.",
      "Pack carefully for handover or shipping where suitable."
    ],
    faqs: [
      {
        question: "Can lamasa pieces be themed?",
        answer:
          "Yes. Miniature, festive, decor, and occasion-led themes can be planned around the recipient or event."
      },
      {
        question: "Are lamasa pieces fragile?",
        answer:
          "Some pieces can be delicate, so shipping is confirmed only after size and structure are understood."
      }
    ]
  },
  paintings: {
    seoTitle: "Custom Paintings and Handmade Wall Art in India",
    priceGuidance:
      "Paintings are quoted by canvas size, subject, detail level, color treatment, framing needs, and deadline.",
    turnaround:
      "Recommended lead time is 1-4 weeks depending on size, layers, drying time, and revisions.",
    delivery:
      "Custom paintings can be discussed for Pune, Chennai, and India shipping when packing is suitable.",
    materials:
      "Materials may include canvas, acrylics, mixed media, varnish, paper studies, and optional framing.",
    process: [
      "Share the subject, wall size, style references, and color direction.",
      "Confirm canvas size, quote, and composition direction.",
      "Approve the direction before final painting begins.",
      "Plan handover, framing, or shipping."
    ],
    faqs: [
      {
        question: "Can I commission a painting as a gift?",
        answer:
          "Yes. Floral, portrait-inspired, colorful, and memory-led paintings can be scoped as personal gifts."
      },
      {
        question: "Can I request a specific color palette?",
        answer:
          "Yes. Share room photos or palette references so the painting fits the intended space."
      }
    ]
  },
  "customized-gifts": {
    seoTitle: "Customized Gifts in Pune, Chennai and India Shipping",
    priceGuidance:
      "Customized gifts are quoted by size, personalization, material, quantity, packaging, and deadline. Share a budget range so the idea can be shaped realistically.",
    turnaround:
      "Recommended lead time is 5-14 days for smaller gifts and 2-4 weeks for hampers, event pieces, or quantity orders.",
    delivery:
      "Custom gifts can be discussed for Pune, Chennai, and India shipping where the piece is practical to pack and send.",
    materials:
      "Materials depend on the concept and may include paper craft, lights, keepsake frames, decor elements, packaging, and personalized tags.",
    process: [
      "Share recipient details, occasion, theme, colors, budget, and deadline.",
      "Confirm the gift format, personalization details, quote, and timeline.",
      "Approve names, dates, messages, and reference details before making.",
      "Prepare the piece for pickup, handover, or India shipping."
    ],
    faqs: [
      {
        question: "Can I request a gift for birthdays or anniversaries?",
        answer:
          "Yes. Birthday hampers, anniversary keepsakes, name-led decor, and theme-led gifts can be planned around the recipient."
      },
      {
        question: "Can you work within a budget?",
        answer:
          "Yes. Share a budget range early so the material, size, and detail level can be chosen sensibly."
      }
    ]
  }
};

const getRequestGuide = (slug: string) =>
  requestGuides[slug] ?? defaultRequestGuide;

export function generateStaticParams() {
  return content.artForms.map((artForm) => ({
    slug: artForm.slug
  }));
}

export async function generateMetadata({
  params
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const artForm = getArtFormBySlug(slug);

  if (!artForm) {
    return {};
  }

  return {
    ...buildMetadata({
      title: getRequestGuide(artForm.slug).seoTitle,
      description: artForm.description,
      path: `/art/${artForm.slug}`,
      image: artForm.coverImage,
      keywords: buildArtFormKeywords(artForm)
    })
  };
}

export default async function ArtFormPage({ params }: PageProps) {
  const { slug } = await params;
  const artForm = getArtFormBySlug(slug);

  if (!artForm) {
    notFound();
  }

  const story = "story" in artForm && artForm.story
    ? artForm.story
    : artForm.description;
  const popularRequests =
    "popularRequests" in artForm ? artForm.popularRequests ?? [] : [];
  const useCases = "useCases" in artForm ? artForm.useCases ?? [] : [];
  const searchContent = artForm.searchContent;
  const requestGuide = getRequestGuide(artForm.slug);

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          buildBreadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Portfolio", path: "/gallery" },
            { name: artForm.title, path: `/art/${artForm.slug}` }
          ]),
          buildCollectionJsonLd({
            title: `${artForm.title} Portfolio`,
            description: artForm.description,
            path: `/art/${artForm.slug}`,
            image: artForm.coverImage,
            items: artForm.gallery
          }),
          buildFAQPageJsonLd(requestGuide.faqs)
        ])}
      />
      <PageHero
        eyebrow={content.navigation.workDropdownLabel}
        title={artForm.title}
        intro={artForm.description}
        image={artForm.coverImage}
        meta={`${artForm.gallery.length} ${content.galleryPage.countLabel}`}
      />

      <SectionWrapper
        eyebrow={content.artPage.detailSection.eyebrow}
        title={content.artPage.detailSection.title}
        intro={content.artPage.detailSection.intro}
      >
        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-clay">
              {artForm.title}
            </p>
            <p className="mt-4 text-base leading-8 text-muted">
              {story}
            </p>
          </article>
          {popularRequests.length > 0 && (
            <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">
                {content.artPage.detailSection.requestsLabel}
              </h2>
              <ul className="mt-4 grid gap-3">
                {popularRequests.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-soft px-4 py-3 text-sm font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}
          {useCases.length > 0 && (
            <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-ink">
                {content.artPage.detailSection.useCasesLabel}
              </h2>
              <ul className="mt-4 grid gap-3">
                {useCases.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl bg-soft px-4 py-3 text-sm font-medium text-muted"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow={content.navigation.workDropdownLabel}
        title={searchContent.title}
        intro={searchContent.body}
        className="bg-panel"
      >
        <div className="grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-line bg-paper p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              {searchContent.localTitle}
            </h2>
            <p className="mt-4 text-base leading-8 text-muted">
              {searchContent.localBody}
            </p>
          </article>
          <article className="rounded-[1.5rem] border border-line bg-paper p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">
              Popular request themes
            </h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {searchContent.targetKeywords.slice(0, 8).map((keyword) => (
                <li
                  key={keyword}
                  className="rounded-full bg-soft px-3 py-2 text-xs font-semibold text-muted"
                >
                  {keyword}
                </li>
              ))}
            </ul>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper
        eyebrow="Request guide"
        title={`Ordering ${artForm.title.toLowerCase()}`}
        intro="Useful details before you ask for a quote, especially for Pune, Chennai, and India shipping requests."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {[
            ["Price guidance", requestGuide.priceGuidance],
            ["Turnaround", requestGuide.turnaround],
            ["Delivery and shipping", requestGuide.delivery],
            ["Materials and finish", requestGuide.materials]
          ].map(([title, body]) => (
            <article
              key={title}
              className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm"
            >
              <h2 className="text-xl font-semibold text-ink">{title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted">{body}</p>
            </article>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_0.9fr]">
          <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">Process</h2>
            <ol className="mt-4 grid gap-3">
              {requestGuide.process.map((step, index) => (
                <li
                  key={step}
                  className="grid grid-cols-[auto_1fr] gap-3 rounded-xl bg-soft px-4 py-3 text-sm font-medium leading-6 text-muted"
                >
                  <span className="font-semibold text-clay">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </article>
          <article className="rounded-[1.5rem] border border-line bg-panel p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-ink">Questions</h2>
            <div className="mt-4 grid gap-4">
              {requestGuide.faqs.map((item) => (
                <div key={item.question}>
                  <h3 className="text-sm font-semibold text-ink">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </article>
        </div>
      </SectionWrapper>

      <SectionWrapper className="bg-panel">
        <GalleryGrid
          artForms={[artForm]}
          allLabel={content.galleryPage.allLabel}
          viewer={content.galleryViewer}
          showFilters={false}
          inquiryLabel={content.galleryPage.inquiryLabel}
          similarLabel={content.galleryPage.similarLabel}
          delivery={content.contactPage.delivery}
          watermarkSrc={content.brand.logo.assets.watermarkDark}
          inlineCta={content.artPage.inlineCta}
        />
      </SectionWrapper>

      <CTASection
        title={content.artPage.cta.title}
        intro={content.artPage.cta.intro}
        primaryCta={content.artPage.cta.primaryCta}
        secondaryCta={content.artPage.cta.secondaryCta}
      />
    </main>
  );
}
