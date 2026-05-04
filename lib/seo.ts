import type { Metadata } from "next";
import type { ArtForm, Content } from "@/lib/getData";

const fallbackSiteUrl = "https://merakiarts53.vercel.app";

export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? fallbackSiteUrl
).replace(/\/$/, "");

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const seoKeywords = [
  "Meraki Arts 53",
  "handmade art",
  "customized gifts",
  "custom gifts",
  "texture art",
  "mehendi designs",
  "handmade decor",
  "lamasa art",
  "paintings",
  "textile motif design",
  "personalized gifts"
];

type PageMetadataInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  keywords?: string[];
  type?: "website" | "article";
};

export function buildMetadata({
  title,
  description,
  path = "/",
  image = "/brand/generated/meraki-option4-lockup.png",
  keywords = [],
  type = "website"
}: PageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const shared = {
    title,
    description,
    url,
    siteName: "Meraki Arts 53",
    images: [
      {
        url: imageUrl,
        width: 3400,
        height: 1500,
        alt: title
      }
    ],
    locale: "en_US"
  };

  return {
    title,
    description,
    keywords: [...new Set([...seoKeywords, ...keywords])],
    alternates: {
      canonical: url
    },
    openGraph:
      type === "article"
        ? {
            ...shared,
            type: "article"
          }
        : {
            ...shared,
            type: "website"
          },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl]
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}

export type JsonLd = Record<string, unknown> | Record<string, unknown>[];

export function jsonLd(data: JsonLd) {
  return {
    __html: JSON.stringify(data).replace(/</g, "\\u003c")
  };
}

export function buildOrganizationJsonLd(content: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: content.artist.brandName,
    url: siteUrl,
    logo: absoluteUrl(content.brand.logo.assets.mark),
    image: absoluteUrl(content.brand.logo.assets.socialCard),
    description: content.footer.description,
    sameAs: content.brand.social
      .filter((item) => item.href.startsWith("http"))
      .map((item) => item.href),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "customer support",
        url: absoluteUrl("/contact"),
        availableLanguage: ["English"]
      }
    ]
  };
}

export function buildWebsiteJsonLd(content: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: content.artist.brandName,
    url: siteUrl,
    description: content.artist.intro,
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function buildWebPageJsonLd({
  title,
  description,
  path,
  image
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    isPartOf: {
      "@id": `${siteUrl}/#website`
    },
    publisher: {
      "@id": `${siteUrl}/#organization`
    }
  };
}

export function buildCollectionJsonLd({
  title,
  description,
  path,
  image,
  items
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  items: Array<{ caption: string; image: string; id?: string }>;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description,
    url: absoluteUrl(path),
    image: image ? absoluteUrl(image) : undefined,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: items.length,
      itemListElement: items.slice(0, 24).map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "CreativeWork",
          name: item.caption,
          identifier: item.id,
          image: absoluteUrl(item.image)
        }
      }))
    }
  };
}

export function buildServicesJsonLd(content: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: content.servicesPage.hero.title,
    description: content.servicesPage.hero.intro,
    url: absoluteUrl("/services"),
    itemListElement: content.services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.title,
        description: service.description,
        image: "image" in service ? absoluteUrl(service.image) : undefined,
        provider: {
          "@id": `${siteUrl}/#organization`
        },
        areaServed: "Worldwide"
      }
    }))
  };
}

export function buildArticleJsonLd({
  article,
  path
}: {
  article: Content["journalPage"]["articles"][number];
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: absoluteUrl(article.image),
    url: absoluteUrl(path),
    author: {
      "@id": `${siteUrl}/#organization`
    },
    publisher: {
      "@id": `${siteUrl}/#organization`
    },
    articleSection: article.category
  };
}

export function buildArtFormKeywords(artForm: ArtForm) {
  const popularRequests =
    "popularRequests" in artForm ? artForm.popularRequests ?? [] : [];
  const useCases = "useCases" in artForm ? artForm.useCases ?? [] : [];

  return [
    artForm.title,
    `${artForm.title} by Meraki Arts 53`,
    ...popularRequests,
    ...useCases
  ];
}
