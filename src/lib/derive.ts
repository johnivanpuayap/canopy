import type { Project, Milestone, Todo, Idea, ActivityItem, DashboardStats } from "@/types";

export function computeStats(
  projects: Project[],
  ideas: Idea[],
  milestones: Milestone[]
): DashboardStats {
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "active").length,
    totalIdeas: ideas.length,
    completedMilestones: milestones.filter((m) => m.status === "completed").length,
  };
}

export function deriveActivity(
  projects: Project[],
  milestones: Milestone[],
  todos: Todo[]
): ActivityItem[] {
  const names = new Map(projects.map((p) => [p.id, p.name]));
  const items: ActivityItem[] = [];

  for (const t of todos) {
    const projectName = names.get(t.projectId);
    if (!projectName) continue;
    items.push({
      id: `todo-${t.id}`,
      projectId: t.projectId,
      projectName,
      action: t.isDone ? `Completed todo: "${t.title}"` : `Added todo: "${t.title}"`,
      timestamp: t.createdAt,
    });
  }
  for (const m of milestones) {
    const projectName = names.get(m.projectId);
    if (!projectName) continue;
    items.push({
      id: `milestone-${m.id}`,
      projectId: m.projectId,
      projectName,
      action:
        m.status === "completed"
          ? `Completed milestone: "${m.title}"`
          : `Added milestone: "${m.title}"`,
      timestamp: m.createdAt,
    });
  }
  for (const p of projects) {
    items.push({
      id: `project-${p.id}`,
      projectId: p.id,
      projectName: p.name,
      action: "Created project",
      timestamp: p.createdAt,
    });
  }

  return items
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 10);
}
