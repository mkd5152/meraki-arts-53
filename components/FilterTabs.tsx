"use client";

import type { ArtForm } from "@/lib/getData";

type FilterTabsProps = {
  artForms: ArtForm[];
  activeFilter: string;
  allLabel: string;
  onFilterChange: (filter: string) => void;
};

export function FilterTabs({
  artForms,
  activeFilter,
  allLabel,
  onFilterChange
}: FilterTabsProps) {
  const filters = [{ id: "all", title: allLabel }, ...artForms];

  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.id;

        return (
          <button
            key={filter.id}
            type="button"
            onClick={() => onFilterChange(filter.id)}
            className={`min-h-11 shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "border-ink bg-ink text-paper"
                : "border-line bg-panel text-muted hover:border-clay hover:text-clay"
            }`}
          >
            {filter.title}
          </button>
        );
      })}
    </div>
  );
}
