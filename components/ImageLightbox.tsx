"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import type { GalleryViewerContent } from "@/lib/getData";
import { trackSiteEvent } from "@/lib/trackEvent";

export type LightboxItem = {
  image: string;
  caption: string;
  altText?: string;
  referenceId?: string;
  categoryTitle?: string;
  seriesItems?: LightboxItem[];
  seriesDescription?: string;
  seriesStage?: string;
  initialSeriesIndex?: number;
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
  const [mounted, setMounted] = useState(false);
  const [seriesIndex, setSeriesIndex] = useState(0);
  const seriesItems = item?.seriesItems?.length ? item.seriesItems : [];
  const activeItem = seriesItems[seriesIndex] ?? item;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!item) {
      return;
    }

    setSeriesIndex(item.initialSeriesIndex ?? 0);

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

  if (!mounted) {
    return null;
  }

  return createPortal(
    <AnimatePresence>
      {item && (
        <motion.div
          className="fixed inset-0 z-[80] bg-ink/88 p-0 backdrop-blur-sm sm:p-4"
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
            className="relative mx-auto flex h-[100dvh] w-full max-w-7xl flex-col overflow-hidden bg-ink shadow-frame sm:h-[calc(100dvh-2rem)] sm:rounded-[1.25rem]"
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            <div className="absolute inset-x-0 top-0 z-30 flex items-start justify-between gap-3 bg-gradient-to-b from-ink/88 via-ink/54 to-transparent px-3 pb-12 pt-3 text-paper sm:px-5 sm:pt-5">
              <div className="min-w-0 rounded-2xl bg-ink/52 px-3 py-2 shadow-soft backdrop-blur sm:px-4">
                {item.categoryTitle && (
                  <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-paper/72">
                    {item.categoryTitle}
                  </p>
                )}
                <div className="mt-1 flex min-w-0 flex-wrap items-center gap-2">
                  <h2 className="min-w-0 text-sm font-semibold leading-snug text-paper sm:text-base">
                    {item.caption}
                  </h2>
                  {activeItem?.referenceId && (
                    <span className="shrink-0 rounded-full border border-paper/18 bg-paper/10 px-2.5 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.08em] text-paper/82">
                      {activeItem.referenceId}
                    </span>
                  )}
                </div>
                {seriesItems.length > 1 && activeItem && (
                  <p className="mt-1 line-clamp-1 text-[11px] font-medium text-paper/70">
                    {activeItem.seriesStage
                      ? `${activeItem.seriesStage}: ${activeItem.caption}`
                      : activeItem.caption}
                  </p>
                )}
                <p className="mt-1 text-[11px] font-medium text-paper/58">
                  {currentIndex + 1} / {total}
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {inquiryLabel && getInquiryHref && (
                  <a
                    href={getInquiryHref(activeItem ?? item)}
                    target="_blank"
                    rel="noreferrer"
                    className="hidden min-h-10 items-center justify-center rounded-full bg-paper px-4 text-xs font-semibold text-ink shadow-soft transition hover:bg-gold sm:inline-flex"
                    onClick={() =>
                      trackSiteEvent("whatsapp_click", {
                        source: "image_lightbox",
                        medium: activeItem?.categoryTitle ?? item.categoryTitle,
                        referenceId:
                          activeItem?.referenceId ?? item.referenceId
                      })
                    }
                  >
                    {inquiryLabel}
                  </a>
                )}
                <button
                  type="button"
                  onClick={onClose}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-paper/16 bg-ink/68 text-lg font-semibold text-paper shadow-soft backdrop-blur transition hover:border-paper/42 hover:bg-paper hover:text-ink"
                  aria-label={labels.closeLabel}
                >
                  X
                </button>
              </div>
            </div>

            <div className="relative min-h-0 flex-1 overflow-hidden bg-ink">
              <button
                type="button"
                className="relative block h-full min-h-[24rem] w-full touch-pan-x touch-pan-y cursor-default overflow-hidden"
                aria-label={labels.openLabel}
              >
                <Image
                  src={activeItem?.image ?? item.image}
                  alt=""
                  fill
                  unoptimized
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="scale-105 object-cover object-center opacity-55 blur-2xl"
                  aria-hidden="true"
                />
                <span
                  className="absolute inset-0 bg-ink/36"
                  aria-hidden="true"
                />
                <Image
                  src={activeItem?.image ?? item.image}
                  alt={
                    activeItem?.altText ??
                    item.altText ??
                    activeItem?.caption ??
                    item.caption
                  }
                  fill
                  priority
                  unoptimized
                  sizes="(min-width: 1280px) 1152px, 100vw"
                  className="object-contain object-center"
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

              {total > 1 && (
                <>
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="absolute left-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/88 text-xl font-semibold text-ink shadow-soft backdrop-blur transition hover:bg-paper hover:text-clay sm:left-5"
                    aria-label={labels.previousLabel}
                  >
                    <span aria-hidden="true">&lt;</span>
                  </button>
                  <button
                    type="button"
                    onClick={onNext}
                    className="absolute right-3 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-paper/88 text-xl font-semibold text-ink shadow-soft backdrop-blur transition hover:bg-paper hover:text-clay sm:right-5"
                    aria-label={labels.nextLabel}
                  >
                    <span aria-hidden="true">&gt;</span>
                  </button>
                </>
              )}
            </div>
            {(seriesItems.length > 1 ||
              (similarItems.length > 0 && similarLabel && onSelectIndex) ||
              (inquiryLabel && getInquiryHref)) && (
              <div className="shrink-0 border-t border-paper/10 bg-ink/92 px-3 py-3 text-paper sm:px-5">
                {inquiryLabel && getInquiryHref && (
                  <a
                    href={getInquiryHref(activeItem ?? item)}
                    target="_blank"
                    rel="noreferrer"
                    className="mb-3 inline-flex min-h-10 w-full items-center justify-center rounded-full bg-paper px-4 text-xs font-semibold text-ink shadow-soft transition hover:bg-gold sm:hidden"
                    onClick={() =>
                      trackSiteEvent("whatsapp_click", {
                        source: "image_lightbox_mobile",
                        medium: activeItem?.categoryTitle ?? item.categoryTitle,
                        referenceId:
                          activeItem?.referenceId ?? item.referenceId
                      })
                    }
                  >
                    {inquiryLabel}
                  </a>
                )}
                {seriesItems.length > 1 && (
                  <div>
                    <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper/62">
                      {labels.seriesLabel}
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {seriesItems.map((seriesItem, index) => (
                        <button
                          key={`${seriesItem.image}-${index}`}
                          type="button"
                          onClick={() => {
                            setSeriesIndex(index);
                          }}
                          className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border bg-mist transition sm:h-20 sm:w-20 ${
                            index === seriesIndex
                              ? "border-gold ring-2 ring-gold/35"
                              : "border-paper/18"
                          }`}
                          aria-label={`${seriesItem.referenceId ?? index + 1}: ${
                            seriesItem.caption
                          }`}
                        >
                          <Image
                            src={seriesItem.image}
                            alt={seriesItem.altText ?? seriesItem.caption}
                            fill
                            unoptimized
                            loading="eager"
                            sizes="80px"
                            className="object-cover"
                          />
                          <span className="absolute inset-x-1 bottom-1 truncate rounded-full bg-ink/72 px-1 py-0.5 font-mono text-[6px] font-semibold uppercase tracking-[0.02em] text-paper sm:text-[7px]">
                            {seriesItem.referenceId ?? index + 1}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {similarItems.length > 0 && similarLabel && onSelectIndex && (
                  <div className="mt-3 hidden sm:block">
                    <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper/62">
                      {similarLabel}
                    </p>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {similarItems.map((similar) => (
                        <button
                          key={`${similar.image}-${similar.index}`}
                          type="button"
                          onClick={() => onSelectIndex(similar.index)}
                          className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-paper/18 bg-mist transition hover:border-gold"
                          aria-label={similar.caption}
                        >
                          <Image
                            src={similar.image}
                            alt={similar.altText ?? similar.caption}
                            fill
                            unoptimized
                            loading="eager"
                            sizes="64px"
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
