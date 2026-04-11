import {
  MOCK_PROJECTS,
  MOCK_MILESTONES,
  MOCK_DASHBOARD_STATS,
  MOCK_ACTIVITY,
} from "@/lib/mock-data";
import { APP_TAGLINE } from "@/lib/constants";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default function DashboardPage(): React.ReactElement {
  return (
    <div>
      <div>
        <h1 className="font-heading text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">{APP_TAGLINE}</p>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <StatsCards stats={MOCK_DASHBOARD_STATS} />
          <ProjectList
            projects={MOCK_PROJECTS}
            milestones={MOCK_MILESTONES}
          />
        </div>
        <div className="lg:col-span-1">
          <ActivityFeed activities={MOCK_ACTIVITY} />
        </div>
      </div>
    </div>
  );
}
