"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";
import type { GalleryViewerContent } from "@/lib/getData";

export type LightboxItem = {
  image: string;
  caption: string;
  categoryTitle?: string;
};

type ImageLightboxProps = {
  item: LightboxItem | null;
  currentIndex: number;
  total: number;
  labels: GalleryViewerContent;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function ImageLightbox({
  item,
  currentIndex,
  total,
  labels,
  onClose,
  onPrevious,
  onNext
}: ImageLightboxProps) {
  useEffect(() => {
    if (!item) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose, onNext, onPrevious]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/80 px-3 py-4 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label={labels.viewerLabel}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 cursor-zoom-out"
            onClick={onClose}
            aria-label={labels.closeLabel}
          />

          <motion.div
            className="relative mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-lg bg-soft shadow-soft"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-stone-200 bg-white px-4 py-3 sm:px-5">
              <div className="min-w-0">
                {item.categoryTitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">
                    {item.categoryTitle}
                  </p>
                )}
                <h2 className="mt-1 truncate text-base font-semibold text-ink sm:text-lg">
                  {item.caption}
                </h2>
                <p className="mt-1 text-xs font-medium text-stone-500">
                  {currentIndex + 1} / {total}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-stone-200 bg-soft text-lg font-semibold text-ink transition hover:border-clay hover:text-clay"
                aria-label={labels.closeLabel}
              >
                X
              </button>
            </div>

            <div className="relative min-h-0 flex-1 bg-ink">
              <Image
                src={item.image}
                alt={item.caption}
                fill
                priority
                sizes="100vw"
                className="object-contain"
              />

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/90 text-xl font-semibold text-ink shadow-soft transition hover:bg-white hover:text-clay sm:left-5"
                    aria-label={labels.previousLabel}
                  >
                    <span aria-hidden="true">&lt;</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-lg bg-white/90 text-xl font-semibold text-ink shadow-soft transition hover:bg-white hover:text-clay sm:right-5"
                    aria-label={labels.nextLabel}
                  >
                    <span aria-hidden="true">&gt;</span>
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
