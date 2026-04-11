import Link from "next/link";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ProgressBar } from "@/components/ui/progress-bar";
import { PROJECT_STATUS_CONFIG } from "@/lib/constants";
import type { Project, Milestone } from "@/types";

interface ProjectCardProps {
  project: Project;
  milestones: Milestone[];
}

export function ProjectCard({
  project,
  milestones,
}: ProjectCardProps): React.ReactElement {
  const totalCount = milestones.length;
  const completedCount = milestones.filter(
    (m) => m.status === "completed",
  ).length;
  const progressValue = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const statusConfig = PROJECT_STATUS_CONFIG[project.status];

  return (
    <Link href={`/project/${project.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-semibold text-foreground">
              {project.name}
            </h3>
            <Badge variant={statusConfig.variant as "active" | "paused" | "completed" | "archived" | "default" | "outline"}>
              {statusConfig.label}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {project.description}
          </p>
          <div className="mt-4">
            <ProgressBar value={progressValue} max={100} />
            <p className="text-xs text-muted-foreground mt-1">
              {completedCount} of {totalCount} milestones
            </p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
