import type { MetadataRoute } from "next";
import { getContent } from "@/lib/getData";
import { landingPages } from "@/lib/landingPages";
import { absoluteUrl } from "@/lib/seo";

const content = getContent();

const lastModified = new Date();

const hasImage = (value: string | undefined): value is string =>
  typeof value === "string" && value.length > 0;

function entry({
  path,
  priority,
  changeFrequency,
  images = []
}: {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  images?: string[];
}): MetadataRoute.Sitemap[number] {
  return {
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
    images: images.map(absoluteUrl)
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    entry({
      path: "/",
      priority: 1,
      changeFrequency: "weekly",
      images: content.artForms.map((artForm) => artForm.coverImage)
    }),
    entry({
      path: "/gallery",
      priority: 0.95,
      changeFrequency: "weekly",
      images: content.artForms.flatMap((artForm) =>
        artForm.gallery.map((item) => item.image)
      )
    }),
    entry({
      path: "/services",
      priority: 0.85,
      changeFrequency: "monthly",
      images: content.services.flatMap((service) =>
        "image" in service && hasImage(service.image) ? [service.image] : []
      )
    }),
    entry({
      path: "/about",
      priority: 0.75,
      changeFrequency: "monthly",
      images: content.aboutPage.visualIntro.images
    }),
    entry({
      path: "/journal",
      priority: 0.7,
      changeFrequency: "monthly",
      images: content.journalPage.articles.map((article) => article.image)
    }),
    entry({
      path: "/contact",
      priority: 0.8,
      changeFrequency: "monthly",
      images: [content.artForms[1]?.coverImage].filter(hasImage)
    })
  ];

  const artRoutes = content.artForms.map((artForm) =>
    entry({
      path: `/art/${artForm.slug}`,
      priority: 0.9,
      changeFrequency: "weekly",
      images: artForm.gallery.map((item) => item.image)
    })
  );

  const journalRoutes = content.journalPage.articles.map((article) =>
    entry({
      path: `/journal/${article.slug}`,
      priority: 0.65,
      changeFrequency: "monthly",
      images: [article.image]
    })
  );

  const landingRoutes = landingPages.map((page) =>
    entry({
      path: `/${page.slug}`,
      priority: 0.88,
      changeFrequency: "monthly",
      images: [page.image]
    })
  );

  return [...staticRoutes, ...artRoutes, ...landingRoutes, ...journalRoutes];
}
