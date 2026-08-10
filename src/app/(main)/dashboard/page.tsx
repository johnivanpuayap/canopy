import { getProjects, getAllMilestones, getAllTodos } from "@/lib/data/projects";
import { getIdeas } from "@/lib/data/ideas";
import { computeStats, deriveActivity } from "@/lib/derive";
import { APP_TAGLINE } from "@/lib/constants";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default async function DashboardPage(): Promise<React.ReactElement> {
  const [projects, milestones, todos, ideas] = await Promise.all([
    getProjects(),
    getAllMilestones(),
    getAllTodos(),
    getIdeas(),
  ]);
  const stats = computeStats(projects, ideas, milestones);
  const activity = deriveActivity(projects, milestones, todos);

  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">{APP_TAGLINE}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <StatsCards stats={stats} />
          <ProjectList
            projects={projects}
            milestones={milestones}
          />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed activities={activity} />
        </div>
      </div>
    </div>
  );
}
