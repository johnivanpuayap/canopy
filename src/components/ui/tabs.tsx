"use client";

import { cn } from "@/lib/utils";

interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  items: TabItem[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

export function Tabs({
  items,
  activeTab,
  onTabChange,
  className,
}: TabsProps): React.ReactElement {
  return (
    <div className={cn("flex gap-1 border-b border-border", className)}>
      {items.map((item) => {
        const isActive = item.value === activeTab;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => onTabChange(item.value)}
            className={cn(
              "cursor-pointer bg-transparent px-4 py-2 text-sm transition-colors",
              isActive
                ? "border-b-2 border-primary font-medium text-primary"
                : "text-foreground/60 hover:text-foreground",
            )}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
