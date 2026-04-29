"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useCallback, useMemo, useState } from "react";
import type { ArtForm, GalleryViewerContent } from "@/lib/getData";
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
};

export function GalleryGrid({
  artForms,
  allLabel,
  viewer,
  showFilters = true,
  limit,
  viewAllLabel,
  viewAllHref
}: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const items = useMemo(
    () =>
      artForms.flatMap((artForm) =>
        artForm.gallery.map((item) => ({
          ...item,
          categoryId: artForm.id,
          categoryTitle: artForm.title,
          categorySlug: artForm.slug
        }))
      ),
    [artForms]
  );

  const filteredItems = items
    .filter((item) => activeFilter === "all" || item.categoryId === activeFilter)
    .slice(0, limit ?? items.length);
  const selectedItem =
    selectedIndex === null ? null : filteredItems[selectedIndex] ?? null;

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
        <FilterTabs
          artForms={artForms}
          activeFilter={activeFilter}
          allLabel={allLabel}
          onFilterChange={(filter) => {
            setActiveFilter(filter);
            setSelectedIndex(null);
          }}
        />
      )}
      <motion.div layout className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, index) => (
            <motion.div
              key={`${item.categoryId}-${item.caption}`}
              layout
              initial={{ opacity: 0.96, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <ArtCard
                title={item.caption}
                image={item.image}
                caption={item.caption}
                category={item.categoryTitle}
                onClick={() => setSelectedIndex(index)}
                interactionLabel={viewer.openLabel}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      {viewAllLabel && viewAllHref && (
        <div className="mt-8 text-center">
          <Link
            href={viewAllHref}
            className="inline-flex min-h-11 items-center justify-center rounded-lg bg-ink px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-clay"
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
      />
    </div>
  );
}
