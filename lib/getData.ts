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

export const getContent = (): Content => data;

export const getArtForms = (): ArtForm[] => data.artForms;

export const getArtFormBySlug = (slug: string): ArtForm | undefined =>
  data.artForms.find((artForm) => artForm.slug === slug);

export const getGalleryItems = (): GalleryItem[] =>
  data.artForms.flatMap((artForm) =>
    artForm.gallery.map((item) => ({
      ...item,
      categoryId: artForm.id,
      categoryTitle: artForm.title,
      categorySlug: artForm.slug
    }))
  );

export const getFeaturedGalleryItems = (limit = 12): GalleryItem[] =>
  getGalleryItems().slice(0, limit);
