import { FolderOpen } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { ProjectHeader } from "@/components/projects/project-header";
import { MilestoneTimeline } from "@/components/projects/milestone-timeline";
import { ProjectContent } from "@/components/projects/project-content";
import {
  getProjectById,
  getMilestonesByProject,
  getTodosByProject,
  getFilesByProject,
} from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const project = getProjectById(id);

  if (!project) {
    return (
      <EmptyState
        icon={<FolderOpen />}
        title="Project not found"
        description="The project you're looking for doesn't exist or has been removed."
      />
    );
  }

  const milestones = getMilestonesByProject(id);
  const todos = getTodosByProject(id);
  const files = getFilesByProject(id);

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      <MilestoneTimeline milestones={milestones} />
      <ProjectContent todos={todos} milestones={milestones} files={files} />
    </div>
  );
}
