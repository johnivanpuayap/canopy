"use client";

interface IdeaFiltersProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
}

const FILTERS = ["All", "Raw", "Designed", "Pinned"];

export function IdeaFilters({
  activeFilter,
  onFilterChange,
}: IdeaFiltersProps): React.ReactElement {
  return (
    <div className="flex gap-2 flex-wrap">
      {FILTERS.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={
            activeFilter === filter
              ? "bg-primary text-primary-foreground rounded-full px-4 py-1.5 text-sm font-medium"
              : "bg-muted text-foreground/60 rounded-full px-4 py-1.5 text-sm hover:bg-muted/80 transition-colors cursor-pointer"
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
