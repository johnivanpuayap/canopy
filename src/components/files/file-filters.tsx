"use client";

import type { Project } from "@/types";

interface FileFiltersProps {
  projects: Project[];
  activeProject: string | null;
  activeType: string | null;
  onProjectChange: (id: string | null) => void;
  onTypeChange: (type: string | null) => void;
}

const FILE_TYPES = ["All", "Spec", "Plan", "Brand", "Design", "Tech Stack"] as const;

export function FileFilters({
  projects,
  activeProject,
  activeType,
  onProjectChange,
  onTypeChange,
}: FileFiltersProps): React.ReactElement {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <select
        className="rounded-lg border border-border bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring/30"
        value={activeProject ?? ""}
        onChange={(e) => onProjectChange(e.target.value === "" ? null : e.target.value)}
      >
        <option value="">All Projects</option>
        {projects.map((project) => (
          <option key={project.id} value={project.id}>
            {project.name}
          </option>
        ))}
      </select>

      <div className="flex gap-2 flex-wrap">
        {FILE_TYPES.map((type) => {
          const isActive =
            type === "All" ? activeType === null : activeType === type.toLowerCase().replace(" ", "_");
          return (
            <button
              key={type}
              onClick={() => {
                if (type === "All") {
                  onTypeChange(null);
                } else {
                  onTypeChange(type.toLowerCase().replace(" ", "_"));
                }
              }}
              className={
                isActive
                  ? "bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium"
                  : "bg-muted text-foreground/60 rounded-full px-3 py-1 text-sm hover:bg-muted/80 transition-colors cursor-pointer"
              }
            >
              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
