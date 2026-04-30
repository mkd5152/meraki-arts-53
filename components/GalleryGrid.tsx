"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import type { ArtForm, Content, GalleryViewerContent } from "@/lib/getData";
import { FilterTabs } from "@/components/FilterTabs";
import { ArtCard } from "@/components/ArtCard";
import { ImageLightbox } from "@/components/ImageLightbox";

type GalleryGridProps = {
  artForms: ArtForm[];
  allLabel: string;
  viewer: GalleryViewerContent;
  showFilters?: boolean;
  limit?: number;
  viewAllLabel?: string;
  viewAllHref?: string;
  countLabel?: string;
  inquiryLabel?: string;
  favoriteLabel?: string;
  savedLabel?: string;
  similarLabel?: string;
  filters?: Content["galleryPage"]["filters"];
  delivery?: Content["contactPage"]["delivery"];
  watermarkSrc?: string;
};

type GalleryFilterState = Record<string, string>;
type FilterProfile = Record<string, string[]>;

export function GalleryGrid({
  artForms,
  allLabel,
  viewer,
  showFilters = true,
  limit,
  viewAllLabel,
  viewAllHref,
  countLabel,
  inquiryLabel,
  favoriteLabel,
  savedLabel,
  similarLabel,
  filters,
  delivery,
  watermarkSrc
}: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [advancedFilters, setAdvancedFilters] = useState<GalleryFilterState>({});
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [origin, setOrigin] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
    const stored = window.localStorage.getItem("meraki-favorites");

    if (stored) {
      try {
        setFavorites(new Set(JSON.parse(stored) as string[]));
      } catch {
        window.localStorage.removeItem("meraki-favorites");
      }
    }
  }, []);

  const items = useMemo(
    () =>
      artForms.flatMap((artForm) =>
        artForm.gallery.map((item, itemIndex) => {
          const profiles = filters?.profiles as
            | Record<string, FilterProfile>
            | undefined;
          const profile = profiles?.[artForm.id];
          const tags = Object.fromEntries(
            (filters?.groups ?? []).map((group) => {
              const values = profile?.[group.key] ?? [];
              return [group.key, values[itemIndex % values.length] ?? ""];
            })
          ) as GalleryFilterState;

          return {
            ...item,
            categoryId: artForm.id,
            categoryTitle: artForm.title,
            categorySlug: artForm.slug,
            categoryAccent: artForm.accent,
            tags
          };
        })
      ),
    [artForms, filters]
  );

  const filterOptions = useMemo(
    () => {
      const visibleArtFormIds = new Set(artForms.map((artForm) => artForm.id));
      const visibleProfiles = Object.entries(filters?.profiles ?? {}).filter(
        ([id]) => visibleArtFormIds.has(id)
      );

      return (filters?.groups ?? []).map((group) => ({
        ...group,
        options: Array.from(
          new Set(
            visibleProfiles.flatMap(([, profile]) =>
              profile[group.key as keyof typeof profile] ?? []
            )
          )
        )
      }));
    },
    [artForms, filters]
  );

  const filteredItems = items
    .filter((item) => activeFilter === "all" || item.categoryId === activeFilter)
    .filter((item) =>
      Object.entries(advancedFilters).every(
        ([key, value]) => !value || item.tags[key] === value
      )
    )
    .slice(0, limit ?? items.length);
  const selectedItem =
    selectedIndex === null ? null : filteredItems[selectedIndex] ?? null;
  const similarItems =
    selectedIndex === null
      ? []
      : filteredItems
          .map((item, index) => ({ ...item, index }))
          .filter(
            (item) =>
              item.index !== selectedIndex &&
              item.categoryId === selectedItem?.categoryId
          )
          .slice(0, 6);

  const getInquiryHref = useCallback(
    (item: (typeof filteredItems)[number]) => {
      if (!delivery) {
        return `/contact?medium=${encodeURIComponent(item.categoryTitle)}`;
      }

      const message = [
        "Hi Meraki Arts 53, I want to ask about this exact piece.",
        "",
        `Medium: ${item.categoryTitle}`,
        `Style: ${item.caption}`,
        `Image: ${origin}${item.image}`
      ].join("\n");

      return `${delivery.whatsappHref}?text=${encodeURIComponent(message)}`;
    },
    [delivery, origin]
  );

  const toggleFavorite = useCallback((image: string) => {
    setFavorites((current) => {
      const next = new Set(current);

      if (next.has(image)) {
        next.delete(image);
      } else {
        next.add(image);
      }

      window.localStorage.setItem(
        "meraki-favorites",
        JSON.stringify(Array.from(next))
      );

      return next;
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || filteredItems.length === 0) {
        return current;
      }

      return (current - 1 + filteredItems.length) % filteredItems.length;
    });
  }, [filteredItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || filteredItems.length === 0) {
        return current;
      }

      return (current + 1) % filteredItems.length;
    });
  }, [filteredItems.length]);

  return (
    <div>
      {showFilters && (
        <div className="mb-8 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
          <FilterTabs
            artForms={artForms}
            activeFilter={activeFilter}
            allLabel={allLabel}
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              setAdvancedFilters({});
              setSelectedIndex(null);
            }}
          />
          {countLabel && (
            <p className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-muted">
              {filteredItems.length} {countLabel}
            </p>
          )}
        </div>
      )}
      {showFilters && filters && (
        <div className="mb-8 rounded-[1.5rem] border border-line bg-panel p-3 shadow-sm">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {filterOptions.map((group) => (
              <label
                key={group.key}
                className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted"
              >
                {group.label}
                <select
                  value={advancedFilters[group.key] ?? ""}
                  onChange={(event) => {
                    setAdvancedFilters((current) => ({
                      ...current,
                      [group.key]: event.target.value
                    }));
                    setSelectedIndex(null);
                  }}
                  className="min-h-11 rounded-full border border-line bg-soft px-4 text-sm normal-case tracking-normal text-ink outline-none focus:border-clay"
                >
                  <option value="">{group.allLabel}</option>
                  {group.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setAdvancedFilters({})}
            className="mt-3 inline-flex min-h-10 items-center rounded-full border border-line px-4 text-sm font-semibold text-muted transition hover:border-clay hover:text-clay"
          >
            {filters.resetLabel}
          </button>
        </div>
      )}
      <motion.div
        layout
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.categoryId}-${item.caption}`}
              layout
              className="flex h-full flex-col gap-2"
              initial={{ opacity: 0.96, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="relative">
                <ArtCard
                  title={item.caption}
                  image={item.image}
                  caption={item.caption}
                  category={item.categoryTitle}
                  categoryAccent={item.categoryAccent}
                  onClick={() => setSelectedIndex(index)}
                  interactionLabel={viewer.openLabel}
                  showLens
                />
                {favoriteLabel && savedLabel && (
                <button
                  type="button"
                  onClick={() => toggleFavorite(item.image)}
                  className="absolute right-3 top-3 z-10 inline-flex min-h-10 items-center rounded-full border border-white/30 bg-ink/70 px-3 text-xs font-semibold text-paper shadow-sm backdrop-blur transition hover:bg-clay"
                  aria-label={`${
                    favorites.has(item.image) ? savedLabel : favoriteLabel
                  }: ${item.caption}`}
                >
                  {favorites.has(item.image) ? savedLabel : favoriteLabel}
                </button>
                )}
              </div>
              {inquiryLabel && (
                <Link
                  href={getInquiryHref(item)}
                  target={delivery ? "_blank" : undefined}
                  rel={delivery ? "noreferrer" : undefined}
                  className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-line bg-panel px-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition hover:border-clay hover:text-clay"
                >
                  {inquiryLabel}
                </Link>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {viewAllLabel && viewAllHref && (
        <div className="mt-8 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex min-h-11 items-center justify-center rounded-full bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:-translate-y-0.5 hover:bg-clay"
          >
            {viewAllLabel}
          </Link>
        </div>
      )}
      <ImageLightbox
        item={selectedItem}
        currentIndex={selectedIndex ?? 0}
        total={filteredItems.length}
        labels={viewer}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
        similarLabel={similarLabel}
        similarItems={similarItems}
        onSelectIndex={setSelectedIndex}
        inquiryLabel={inquiryLabel}
        getInquiryHref={
          selectedItem ? () => getInquiryHref(selectedItem) : undefined
        }
        watermarkSrc={watermarkSrc}
      />
    </div>
  );
}
