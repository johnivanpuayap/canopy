import { ExternalLink, Calendar, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PROJECT_STATUS_CONFIG } from "@/lib/constants";
import type { Project } from "@/types";

interface ProjectHeaderProps {
  project: Project;
}

export function ProjectHeader({ project }: ProjectHeaderProps): React.ReactElement {
  const statusConfig = PROJECT_STATUS_CONFIG[project.status];

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="font-heading text-2xl font-bold">{project.name}</h1>
        <Badge variant={statusConfig.variant as "active" | "paused" | "completed" | "archived" | "outline" | "default"}>
          {statusConfig.label}
        </Badge>
      </div>
      <p className="text-muted-foreground mt-2">{project.description}</p>
      <div className="flex flex-wrap gap-4 mt-4 text-sm text-muted-foreground">
        {project.repoUrl && (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-secondary hover:underline"
          >
            <ExternalLink className="h-4 w-4 shrink-0" />
            <span className="truncate max-w-[200px]">{project.repoUrl}</span>
          </a>
        )}
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 shrink-0" />
          Created {formatDate(project.createdAt)}
        </span>
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4 shrink-0" />
          Updated {formatDate(project.updatedAt)}
        </span>
      </div>
    </div>
  );
}
