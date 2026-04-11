import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Milestone } from "@/types";

interface MilestoneTimelineProps {
  milestones: Milestone[];
}

export function MilestoneTimeline({ milestones }: MilestoneTimelineProps): React.ReactElement {
  const completedCount = milestones.filter((m) => m.status === "completed").length;

  return (
    <div>
      <div className="flex items-center gap-0 overflow-x-auto py-4">
        {milestones.map((milestone, index) => {
          const isLast = index === milestones.length - 1;
          const nextMilestone = milestones[index + 1];
          const lineCompleted = !isLast && nextMilestone?.status === "completed";

          return (
            <div key={milestone.id} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    "h-8 w-8 rounded-full flex items-center justify-center text-xs",
                    milestone.status === "completed" &&
                      "bg-primary text-primary-foreground",
                    milestone.status === "in_progress" &&
                      "border-2 border-accent bg-accent/20 text-accent animate-pulse",
                    milestone.status === "pending" &&
                      "border-2 border-foreground/20 bg-transparent text-foreground/40",
                  )}
                >
                  {milestone.status === "completed" ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <span className="text-xs mt-1 text-center max-w-[80px] truncate">
                  {milestone.title}
                </span>
              </div>
              {!isLast && (
                <div
                  className={cn(
                    "h-0.5 w-8 lg:w-16 shrink-0",
                    lineCompleted ? "bg-primary" : "bg-border",
                  )}
                />
              )}
            </div>
          );
        })}
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        {completedCount} of {milestones.length} milestones complete
      </p>
    </div>
  );
}
