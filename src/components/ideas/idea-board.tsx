"use client";

import { useState } from "react";
import type { Idea } from "@/types";
import { IdeaFilters } from "./idea-filters";
import { RawIdeaCard } from "./raw-idea-card";
import { DesignedIdeaCard } from "./designed-idea-card";

interface IdeaBoardProps {
  ideas: Idea[];
}

export function IdeaBoard({ ideas }: IdeaBoardProps): React.ReactElement {
  const [activeFilter, setActiveFilter] = useState("All");

  const filteredIdeas = ideas.filter((idea) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Raw") return idea.status === "raw";
    if (activeFilter === "Designed") return idea.status === "designed";
    if (activeFilter === "Pinned") return idea.isPinned;
    return true;
  });

  return (
    <div>
      <IdeaFilters activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 mt-6">
        {filteredIdeas.map((idea) => (
          <div key={idea.id} className="break-inside-avoid mb-4">
            {idea.status === "raw" ? (
              <RawIdeaCard idea={idea} />
            ) : (
              <DesignedIdeaCard idea={idea} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
