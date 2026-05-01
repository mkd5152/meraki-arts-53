"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { GalleryViewerContent } from "@/lib/getData";

export type LightboxItem = {
  image: string;
  caption: string;
  referenceId?: string;
  categoryTitle?: string;
  seriesItems?: LightboxItem[];
  seriesDescription?: string;
  seriesStage?: string;
};

type SimilarLightboxItem = LightboxItem & {
  index: number;
};

type ImageLightboxProps = {
  item: LightboxItem | null;
  currentIndex: number;
  total: number;
  labels: GalleryViewerContent;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
  similarLabel?: string;
  similarItems?: SimilarLightboxItem[];
  onSelectIndex?: (index: number) => void;
  inquiryLabel?: string;
  getInquiryHref?: (item?: LightboxItem) => string;
  watermarkSrc?: string;
};

export function ImageLightbox({
  item,
  currentIndex,
  total,
  labels,
  onClose,
  onPrevious,
  onNext,
  similarLabel,
  similarItems = [],
  onSelectIndex,
  inquiryLabel,
  getInquiryHref,
  watermarkSrc
}: ImageLightboxProps) {
  const [zoomed, setZoomed] = useState(false);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const seriesItems = item?.seriesItems?.length ? item.seriesItems : [];
  const activeItem = seriesItems[seriesIndex] ?? item;

  useEffect(() => {
    if (!item) {
      return;
    }

    setZoomed(false);
    setSeriesIndex(0);

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
            className="relative mx-auto flex h-full max-w-6xl flex-col overflow-hidden rounded-[1.5rem] bg-soft shadow-frame"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="flex items-start justify-between gap-4 border-b border-line bg-panel px-4 py-3 sm:px-5">
              <div className="min-w-0">
                {item.categoryTitle && (
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-clay">
                    {item.categoryTitle}
                  </p>
                )}
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
                  <h2 className="min-w-0 truncate text-base font-semibold text-ink sm:text-lg">
                    {item.caption}
                  </h2>
                  {activeItem?.referenceId && (
                    <span className="shrink-0 rounded-full border border-line bg-soft px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-muted">
                      {activeItem.referenceId}
                    </span>
                  )}
                </div>
                {seriesItems.length > 1 && activeItem && (
                  <p className="mt-1 text-xs font-medium text-muted">
                    {activeItem.seriesStage
                      ? `${activeItem.seriesStage}: ${activeItem.caption}`
                      : activeItem.caption}
                  </p>
                )}
                <p className="mt-1 text-xs font-medium text-muted">
                  {currentIndex + 1} / {total}
                </p>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-soft text-lg font-semibold text-ink transition hover:border-clay hover:text-clay"
                aria-label={labels.closeLabel}
              >
                X
              </button>
            </div>

            <div className="relative min-h-0 flex-1 overflow-auto bg-ink">
              <button
                type="button"
                onClick={() => setZoomed((current) => !current)}
                className={`relative block h-full min-h-[22rem] w-full touch-pan-x touch-pan-y ${
                  zoomed ? "min-w-[140%] cursor-zoom-out" : "cursor-zoom-in"
                }`}
                aria-label={zoomed ? labels.closeLabel : labels.openLabel}
              >
                <Image
                  src={activeItem?.image ?? item.image}
                  alt={activeItem?.caption ?? item.caption}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className={`object-contain transition duration-300 ${
                    zoomed ? "scale-125" : "scale-100"
                  }`}
                />
              </button>

              {watermarkSrc && (
                <Image
                  src={watermarkSrc}
                  alt=""
                  width={360}
                  height={120}
                  className="pointer-events-none absolute right-4 top-4 z-10 w-32 opacity-55 sm:w-44"
                  aria-hidden="true"
                />
              )}

              {inquiryLabel && getInquiryHref && (
                <a
                  href={getInquiryHref(activeItem ?? item)}
                  target="_blank"
                  rel="noreferrer"
                  className="absolute bottom-4 left-1/2 z-10 inline-flex min-h-11 -translate-x-1/2 items-center justify-center rounded-full bg-paper px-5 text-sm font-semibold text-ink shadow-soft transition hover:bg-gold"
                >
                  {inquiryLabel}
                </a>
              )}

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-xl font-semibold text-ink shadow-soft transition hover:bg-paper hover:text-clay sm:left-5"
                    aria-label={labels.previousLabel}
                  >
                    <span aria-hidden="true">&lt;</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/90 text-xl font-semibold text-ink shadow-soft transition hover:bg-paper hover:text-clay sm:right-5"
                    aria-label={labels.nextLabel}
                  >
                    <span aria-hidden="true">&gt;</span>
                  </button>
                </>
              )}
            </div>
            {seriesItems.length > 1 && (
              <div className="border-t border-line bg-panel p-3">
                <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {labels.seriesLabel}
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {seriesItems.map((seriesItem, index) => (
                    <button
                      key={`${seriesItem.image}-${index}`}
                      type="button"
                      onClick={() => {
                        setSeriesIndex(index);
                        setZoomed(false);
                      }}
                      className={`relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border bg-mist transition ${
                        index === seriesIndex ? "border-clay" : "border-line"
                      }`}
                      aria-label={seriesItem.caption}
                    >
                      <Image
                        src={seriesItem.image}
                        alt={seriesItem.caption}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                      <span className="absolute inset-x-1 bottom-1 rounded-full bg-ink/72 px-1 py-0.5 text-[9px] font-semibold text-paper">
                        {index + 1}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {similarItems.length > 0 && similarLabel && onSelectIndex && (
              <div className="border-t border-line bg-panel p-3">
                <p className="mb-3 px-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  {similarLabel}
                </p>
                <div className="flex gap-3 overflow-x-auto pb-1">
                  {similarItems.map((similar) => (
                    <button
                      key={`${similar.image}-${similar.index}`}
                      type="button"
                      onClick={() => onSelectIndex(similar.index)}
                      className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-line bg-mist transition hover:border-clay"
                      aria-label={similar.caption}
                    >
                      <Image
                        src={similar.image}
                        alt={similar.caption}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
