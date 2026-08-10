import { FolderOpen, LayoutDashboard, Lightbulb } from "lucide-react";
import { CanopyLogo } from "./canopy-logo";
import { cn } from "@/lib/utils";

interface PreviewProject {
  name: string;
  meta: string;
  progress: string;
  highlighted?: boolean;
}

const PREVIEW_PROJECTS: readonly PreviewProject[] = [
  { name: "Canopy", meta: "4 of 6 milestones", progress: "w-[68%]", highlighted: true },
  { name: "Crucible", meta: "9 of 10 milestones", progress: "w-[90%]" },
  { name: "Field notes", meta: "1 of 5 milestones", progress: "w-[22%]" },
];

const PREVIEW_IDEAS: readonly string[] = [
  "Weekly digest email",
  "Keyboard-first search",
  "Offline notes",
];

export function DashboardPreview(): React.ReactElement {
  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl border border-border"
      />

      <div className="relative overflow-hidden rounded-2xl border border-border bg-white">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <CanopyLogo className="text-sm" markClassName="h-5 w-auto" />
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-1.5 w-1.5 rounded-full bg-border" />
            <span className="h-6 w-6 rounded-full bg-muted" />
          </div>
        </div>

        <div className="flex">
          <nav
            aria-hidden="true"
            className="hidden shrink-0 flex-col gap-1 border-r border-border p-3 sm:flex"
          >
            <span className="rounded-lg bg-primary/10 p-2 text-primary">
              <LayoutDashboard className="h-4 w-4" />
            </span>
            <span className="p-2 text-muted-foreground">
              <Lightbulb className="h-4 w-4" />
            </span>
            <span className="p-2 text-muted-foreground">
              <FolderOpen className="h-4 w-4" />
            </span>
          </nav>

          <div className="min-w-0 flex-1 p-4 sm:p-5">
            <div className="mb-3 flex items-baseline justify-between">
              <p className="font-heading text-sm font-semibold text-foreground">
                Active projects
              </p>
              <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-medium text-accent">
                2 due this week
              </span>
            </div>

            <ul className="space-y-2">
              {PREVIEW_PROJECTS.map((project) => (
                <li
                  key={project.name}
                  className={cn(
                    "rounded-lg border border-border p-3",
                    project.highlighted ? "bg-muted" : "bg-background",
                  )}
                >
                  <div className="flex items-baseline justify-between gap-3">
                    <span className="truncate font-heading text-sm font-medium text-foreground">
                      {project.name}
                    </span>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {project.meta}
                    </span>
                  </div>
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-border">
                    <div
                      className={cn("h-full rounded-full bg-primary", project.progress)}
                    />
                  </div>
                </li>
              ))}
            </ul>

            <p className="mt-5 mb-2 font-heading text-sm font-semibold text-foreground">
              Idea board
            </p>
            <ul className="grid grid-cols-3 gap-2">
              {PREVIEW_IDEAS.map((idea) => (
                <li
                  key={idea}
                  className="rounded-lg border border-border bg-secondary/5 p-2 text-[11px] leading-snug text-muted-foreground"
                >
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
