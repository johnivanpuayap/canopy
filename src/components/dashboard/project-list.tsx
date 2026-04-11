import { Button } from "@/components/ui/button";
import { ProjectCard } from "./project-card";
import type { Project, Milestone } from "@/types";

interface ProjectListProps {
  projects: Project[];
  milestones: Milestone[];
}

export function ProjectList({
  projects,
  milestones,
}: ProjectListProps): React.ReactElement {
  return (
    <div>
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Projects</h2>
        <Button variant="ghost" size="sm">
          New Project
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {projects.map((project) => {
          const projectMilestones = milestones.filter(
            (m) => m.projectId === project.id,
          );
          return (
            <ProjectCard
              key={project.id}
              project={project}
              milestones={projectMilestones}
            />
          );
        })}
      </div>
    </div>
  );
}
