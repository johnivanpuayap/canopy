import { notFound } from "next/navigation";
import { ProjectHeader } from "@/components/projects/project-header";
import { MilestoneTimeline } from "@/components/projects/milestone-timeline";
import { ProjectContent } from "@/components/projects/project-content";
import { getProjectDetail } from "@/lib/data/projects";
import { getFilesByProject } from "@/lib/mock-data";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ProjectDetailPage({ params }: PageProps): Promise<React.ReactElement> {
  const { id } = await params;
  const detail = await getProjectDetail(id);

  if (!detail) {
    notFound();
  }

  const { project, milestones, todos } = detail;
  const files = getFilesByProject(id);

  return (
    <div className="space-y-8">
      <ProjectHeader project={project} />
      <MilestoneTimeline milestones={milestones} />
      <ProjectContent
        projectId={project.id}
        todos={todos}
        milestones={milestones}
        files={files}
      />
    </div>
  );
}
