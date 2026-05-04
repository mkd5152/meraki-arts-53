import data from "@/data/content.json";

export type Content = typeof data;
export type Artist = Content["artist"];
export type BrandContent = Content["brand"];
export type NavigationContent = Content["navigation"];
export type ArtForm = Content["artForms"][number];
export type Service = Content["services"][number];
export type CtaContent = Content["cta"];
export type GalleryViewerContent = Content["galleryViewer"];
export type ContactFormContent = Content["contactPage"]["form"];

export type GalleryItem = ArtForm["gallery"][number] & {
  categoryId: ArtForm["id"];
  categoryTitle: ArtForm["title"];
  categorySlug: ArtForm["slug"];
};

type VisibilityControlled = {
  isVisible?: boolean;
};

const isVisible = (item: unknown): boolean =>
  !(
    typeof item === "object" &&
    item !== null &&
    "isVisible" in item &&
    (item as VisibilityControlled).isVisible === false
  );

const withVisibleGallery = (artForm: ArtForm): ArtForm =>
  ({
    ...artForm,
    gallery: artForm.gallery.filter(isVisible)
  }) as ArtForm;

export const getArtForms = (): ArtForm[] =>
  data.artForms.filter(isVisible).map(withVisibleGallery);

const getGalleryPage = (artForms: ArtForm[]): Content["galleryPage"] => {
  const visibleArtFormIds = new Set(artForms.map((artForm) => artForm.id));

  return {
    ...data.galleryPage,
    filters: {
      ...data.galleryPage.filters,
      profiles: Object.fromEntries(
        Object.entries(data.galleryPage.filters.profiles).filter(([id]) =>
          visibleArtFormIds.has(id as ArtForm["id"])
        )
      ) as Content["galleryPage"]["filters"]["profiles"]
    }
  };
};

export const getContent = (): Content => {
  const artForms = getArtForms();

  return {
    ...data,
    artForms,
    galleryPage: getGalleryPage(artForms),
    services: data.services.filter(isVisible)
  };
};

export const getArtFormBySlug = (slug: string): ArtForm | undefined =>
  getArtForms().find((artForm) => artForm.slug === slug);

export const getGalleryItems = (): GalleryItem[] =>
  getArtForms().flatMap((artForm) =>
    artForm.gallery.map((item) => ({
      ...item,
      categoryId: artForm.id,
      categoryTitle: artForm.title,
      categorySlug: artForm.slug
    }))
  );

export const getFeaturedGalleryItems = (limit = 12): GalleryItem[] =>
  getGalleryItems().slice(0, limit);
