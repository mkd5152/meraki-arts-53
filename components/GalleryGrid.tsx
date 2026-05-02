"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Fragment, useCallback, useEffect, useMemo, useState } from "react";
import type { ArtForm, Content, GalleryViewerContent } from "@/lib/getData";
import { ArtCard } from "@/components/ArtCard";
import { FilterTabs } from "@/components/FilterTabs";
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
  similarLabel?: string;
  filters?: Content["galleryPage"]["filters"];
  featuredSection?: Content["galleryPage"]["featuredSection"];
  delivery?: Content["contactPage"]["delivery"];
  watermarkSrc?: string;
  inlineCta?: Content["artPage"]["inlineCta"];
};

type GalleryFilterState = Record<string, string>;
type FilterProfile = Record<string, string[]>;
type InquiryItem = {
  image: string;
  caption: string;
  referenceId?: string;
  categoryTitle?: string;
};

const categoryReferenceCodes: Record<string, string> = {
  "texture-art": "TEX",
  mehendi: "MEH",
  "chenille-craft": "CHN",
  "outline-art": "OUT",
  "rida-design": "RDA",
  lamasa: "LAM",
  terrazzo: "TRZ",
  paintings: "PNT",
  "customized-gifts": "GFT"
};

const getGalleryReferenceId = (
  categoryId: string,
  itemIndex: number,
  configuredId?: string
) =>
  configuredId ??
  `MA53-${categoryReferenceCodes[categoryId] ?? "ART"}-${String(
    itemIndex + 1
  ).padStart(3, "0")}`;

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
  similarLabel,
  filters,
  featuredSection,
  delivery,
  watermarkSrc,
  inlineCta
}: GalleryGridProps) {
  const [activeFilter, setActiveFilter] = useState("all");
  const [advancedFilters, setAdvancedFilters] = useState<GalleryFilterState>({});
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [origin, setOrigin] = useState("");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
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
          const configuredReferenceId =
            "id" in item && typeof item.id === "string" ? item.id : undefined;

          return {
            ...item,
            referenceId: getGalleryReferenceId(
              artForm.id,
              itemIndex,
              configuredReferenceId
            ),
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

  const filterOptions = useMemo(() => {
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
  }, [artForms, filters]);

  type GalleryItem = (typeof items)[number];
  type DisplayItem = GalleryItem & {
    seriesItems?: GalleryItem[];
    seriesCount?: number;
    seriesDescription?: string;
    displayReferenceId?: string;
  };
  const getSeriesId = (item: GalleryItem) =>
    "seriesId" in item && typeof item.seriesId === "string" ? item.seriesId : "";
  const getSeriesTitle = (item: GalleryItem) =>
    "seriesTitle" in item && typeof item.seriesTitle === "string"
      ? item.seriesTitle
      : item.caption;
  const getSeriesDescription = (item: GalleryItem) =>
    "seriesDescription" in item && typeof item.seriesDescription === "string"
      ? item.seriesDescription
      : undefined;
  const getSeriesKey = (item: GalleryItem) =>
    `${item.categoryId}:${getSeriesId(item)}`;
  const getItemKey = (item: GalleryItem) =>
    `${item.categoryId}:${item.referenceId}:${item.image}`;
  const getStageReferenceId = (referenceId: string, stageIndex: number) =>
    `${referenceId}-${String(stageIndex + 1).padStart(3, "0")}`;

  const referenceMaps = useMemo(() => {
    const visibleCategoryCounts: Record<string, number> = {};
    const itemReferenceIds = new Map<string, string>();
    const seriesReferenceIds = new Map<string, string>();
    const stageReferenceIds = new Map<string, string>();
    const seriesStageCounts = new Map<string, number>();

    items.forEach((item) => {
      const seriesId = getSeriesId(item);

      if (!seriesId) {
        visibleCategoryCounts[item.categoryId] =
          (visibleCategoryCounts[item.categoryId] ?? 0) + 1;
        itemReferenceIds.set(
          getItemKey(item),
          getGalleryReferenceId(
            item.categoryId,
            visibleCategoryCounts[item.categoryId] - 1
          )
        );
        return;
      }

      const seriesKey = getSeriesKey(item);
      let parentReferenceId = seriesReferenceIds.get(seriesKey);

      if (!parentReferenceId) {
        visibleCategoryCounts[item.categoryId] =
          (visibleCategoryCounts[item.categoryId] ?? 0) + 1;
        parentReferenceId = getGalleryReferenceId(
          item.categoryId,
          visibleCategoryCounts[item.categoryId] - 1
        );
        seriesReferenceIds.set(seriesKey, parentReferenceId);
      }

      const stageIndex = seriesStageCounts.get(seriesKey) ?? 0;
      seriesStageCounts.set(seriesKey, stageIndex + 1);
      stageReferenceIds.set(
        getItemKey(item),
        getStageReferenceId(parentReferenceId, stageIndex)
      );
    });

    return { itemReferenceIds, seriesReferenceIds, stageReferenceIds };
  }, [items]);

  const filteredItems = items
    .filter((item) => activeFilter === "all" || item.categoryId === activeFilter)
    .filter((item) =>
      Object.entries(advancedFilters).every(
        ([key, value]) => !value || item.tags[key] === value
      )
    );
  const groupedItems = filteredItems.reduce<DisplayItem[]>((result, item) => {
    const seriesId = getSeriesId(item);

    if (!seriesId) {
      result.push(item);
      return result;
    }

    const existing = result.find(
      (displayItem) => getSeriesId(displayItem) === seriesId
    );

    if (existing) {
      existing.seriesItems = [...(existing.seriesItems ?? [existing]), item];
      existing.seriesCount = existing.seriesItems.length;
      return result;
    }

    result.push({
      ...item,
      caption: getSeriesTitle(item),
      seriesItems: [item],
      seriesCount: 1,
      seriesDescription: getSeriesDescription(item)
    });

    return result;
  }, []);
  const displayItems = groupedItems
    .map((item) => {
      const seriesId = getSeriesId(item);
      const displayReferenceId = seriesId
        ? referenceMaps.seriesReferenceIds.get(getSeriesKey(item))
        : referenceMaps.itemReferenceIds.get(getItemKey(item));
      const seriesItems = item.seriesItems?.map((seriesItem) => ({
        ...seriesItem,
        referenceId:
          referenceMaps.stageReferenceIds.get(getItemKey(seriesItem)) ??
          seriesItem.referenceId
      }));
      const initialSeriesIndex = seriesItems?.length
        ? seriesItems.length - 1
        : undefined;
      const representativeItem =
        initialSeriesIndex === undefined ? undefined : seriesItems?.[initialSeriesIndex];

      return {
        ...item,
        image: representativeItem?.image ?? item.image,
        referenceId: displayReferenceId ?? item.referenceId,
        displayReferenceId: displayReferenceId ?? item.referenceId,
        seriesItems,
        initialSeriesIndex
      };
    })
    .slice(0, limit ?? items.length);
  const featuredCount =
    showFilters && !limit ? featuredSection?.featuredCount ?? 0 : 0;
  const featuredItems =
    featuredCount > 0 ? displayItems.slice(0, featuredCount) : [];
  const gridItems =
    featuredCount > 0 ? displayItems.slice(featuredCount) : displayItems;
  const selectedItem =
    selectedIndex === null ? null : displayItems[selectedIndex] ?? null;
  const getDisplayReferenceId = (item: DisplayItem) =>
    item.displayReferenceId ?? item.referenceId;
  const selectedLightboxItem = selectedItem
    ? {
        ...selectedItem,
        referenceId: getDisplayReferenceId(selectedItem)
      }
    : null;
  const similarItems =
    selectedIndex === null
      ? []
      : displayItems
          .map((item, index) => ({ ...item, index }))
          .filter(
            (item) =>
              item.index !== selectedIndex &&
              item.categoryId === selectedItem?.categoryId
          )
          .slice(0, 6);

  const getInquiryHref = useCallback(
    (item: InquiryItem) => {
      if (!delivery) {
        return `/contact?medium=${encodeURIComponent(item.categoryTitle ?? "")}`;
      }

      const message = [
        "Hi Meraki Arts 53, I want to ask about this exact piece.",
        "",
        `Picture ID: ${item.referenceId}`,
        `Medium: ${item.categoryTitle}`,
        `Piece name: ${item.caption}`,
        `Image: ${origin}${item.image}`
      ].join("\n");

      return `${delivery.whatsappHref}?text=${encodeURIComponent(message)}`;
    },
    [delivery, origin]
  );

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  const showPrevious = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || displayItems.length === 0) {
        return current;
      }

      return (current - 1 + displayItems.length) % displayItems.length;
    });
  }, [displayItems.length]);

  const showNext = useCallback(() => {
    setSelectedIndex((current) => {
      if (current === null || displayItems.length === 0) {
        return current;
      }

      return (current + 1) % displayItems.length;
    });
  }, [displayItems.length]);

  const renderGalleryItem = (
    item: (typeof displayItems)[number],
    index: number
  ) => (
    <motion.div
      key={`${item.categoryId}-${item.referenceId}-${index}`}
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
          description={
            item.seriesCount && item.seriesCount > 1
              ? item.seriesDescription
              : undefined
          }
          caption={item.caption}
          category={item.categoryTitle}
          categoryAccent={item.categoryAccent}
          referenceId={getDisplayReferenceId(item)}
          onClick={() => setSelectedIndex(index)}
          interactionLabel={viewer.openLabel}
          showLens
          stableBody
        />
        {item.seriesCount && item.seriesCount > 1 && (
          <span className="absolute right-3 top-3 z-10 rounded-full border border-paper/35 bg-ink/72 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-paper shadow-sm backdrop-blur">
            {item.seriesCount} {viewer.stageCountLabel}
          </span>
        )}
      </div>
      {inquiryLabel && (
        <Link
          href={getInquiryHref({
            ...item,
            referenceId: getDisplayReferenceId(item)
          })}
          target={delivery ? "_blank" : undefined}
          rel={delivery ? "noreferrer" : undefined}
          className="inline-flex min-h-10 w-full items-center justify-center rounded-full border border-line bg-panel px-4 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition hover:border-clay hover:text-clay"
        >
          {inquiryLabel}
        </Link>
      )}
    </motion.div>
  );

  return (
    <div>
      {showFilters && (
        <div className="sticky top-16 z-20 -mx-4 mb-8 grid gap-4 border-y border-line bg-paper/95 px-4 py-3 backdrop-blur-xl sm:top-[4.5rem] lg:static lg:mx-0 lg:grid-cols-[1fr_auto] lg:border-0 lg:bg-transparent lg:px-0 lg:py-0 lg:backdrop-blur-0">
          <FilterTabs
            artForms={artForms}
            activeFilter={activeFilter}
            allLabel={allLabel}
            onFilterChange={(filter) => {
              setActiveFilter(filter);
              setAdvancedFilters({});
              setShowAdvancedFilters(false);
              setSelectedIndex(null);
            }}
          />
          {countLabel && (
            <p className="rounded-full border border-line bg-panel px-4 py-2 text-sm font-semibold text-muted">
              {displayItems.length} {countLabel}
            </p>
          )}
        </div>
      )}

      {showFilters && filters && (
        <div className="mb-8">
          <button
            type="button"
            onClick={() => setShowAdvancedFilters((current) => !current)}
            className="inline-flex min-h-11 items-center justify-center rounded-full border border-line bg-panel px-5 text-sm font-semibold text-ink shadow-sm transition hover:border-clay hover:text-clay"
          >
            {showAdvancedFilters
              ? featuredSection?.fewerFiltersLabel
              : featuredSection?.moreFiltersLabel}
          </button>
          <div
            className={`mt-4 overflow-hidden rounded-[1.5rem] border border-line bg-panel p-3 shadow-sm ${
              showAdvancedFilters ? "block" : "hidden"
            }`}
          >
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
        </div>
      )}

      {featuredSection && featuredItems.length > 0 && (
        <section className="mb-12">
          <div className="mb-6 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              {featuredSection.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold leading-tight text-ink sm:text-4xl">
              {featuredSection.title}
            </h2>
            <p className="mt-3 text-base leading-7 text-muted">
              {featuredSection.intro}
            </p>
          </div>
          <motion.div
            layout
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            <AnimatePresence mode="popLayout">
              {featuredItems.map((item, index) => renderGalleryItem(item, index))}
            </AnimatePresence>
          </motion.div>
        </section>
      )}

      {featuredSection && featuredItems.length > 0 && gridItems.length > 0 && (
        <div className="mb-6 flex items-center gap-4">
          <h2 className="text-2xl font-semibold text-ink">
            {featuredSection.browseTitle}
          </h2>
          <div className="h-px flex-1 bg-line" />
        </div>
      )}

      <motion.div
        layout
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          {gridItems.map((item, index) => {
            const itemIndex = index + featuredItems.length;
            const shouldShowInlineCta =
              inlineCta && itemIndex === 5 && displayItems.length > 6;

            return (
              <Fragment key={`${item.categoryId}-${item.referenceId}-${itemIndex}`}>
                {renderGalleryItem(item, itemIndex)}
                {shouldShowInlineCta && (
                  <motion.div
                    layout
                    className="sm:col-span-2 lg:col-span-3"
                    initial={{ opacity: 0.96, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.28, ease: "easeOut" }}
                  >
                    <div className="grid gap-5 rounded-[1.75rem] border border-line bg-ink p-6 text-paper shadow-frame sm:grid-cols-[1fr_auto] sm:items-center">
                      <div>
                        <h3 className="text-2xl font-semibold">
                          {inlineCta.title}
                        </h3>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-paper/72">
                          {inlineCta.intro}
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 sm:flex-row">
                        <Link
                          href={inlineCta.primaryCta.href}
                          className="inline-flex min-h-11 items-center justify-center rounded-full bg-paper px-5 text-sm font-semibold text-ink transition hover:bg-soft"
                        >
                          {inlineCta.primaryCta.label}
                        </Link>
                        {inlineCta.secondaryCta && (
                          <Link
                            href={inlineCta.secondaryCta.href}
                            className="inline-flex min-h-11 items-center justify-center rounded-full border border-paper/24 px-5 text-sm font-semibold text-paper transition hover:border-paper/60 hover:bg-paper/10"
                          >
                            {inlineCta.secondaryCta.label}
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )}
              </Fragment>
            );
          })}
          {displayItems.length === 0 && countLabel && (
            <div className="rounded-[1.5rem] border border-line bg-panel p-8 text-center text-sm font-semibold text-muted sm:col-span-2 lg:col-span-3">
              {displayItems.length} {countLabel}
            </div>
          )}
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
        item={selectedLightboxItem}
        currentIndex={selectedIndex ?? 0}
        total={displayItems.length}
        labels={viewer}
        onClose={closeLightbox}
        onPrevious={showPrevious}
        onNext={showNext}
        similarLabel={similarLabel}
        similarItems={similarItems}
        onSelectIndex={setSelectedIndex}
        inquiryLabel={inquiryLabel}
        getInquiryHref={
          selectedLightboxItem
            ? (item) => getInquiryHref(item ?? selectedLightboxItem)
            : undefined
        }
        watermarkSrc={watermarkSrc}
      />
    </div>
  );
}
