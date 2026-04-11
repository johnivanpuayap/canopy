import { FolderOpen, Zap, Lightbulb, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardStats } from "@/types";

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatCardConfig {
  icon: React.ReactNode;
  value: number;
  label: string;
}

export function StatsCards({ stats }: StatsCardsProps): React.ReactElement {
  const cards: StatCardConfig[] = [
    {
      icon: <FolderOpen className="h-5 w-5" />,
      value: stats.totalProjects,
      label: "Total Projects",
    },
    {
      icon: <Zap className="h-5 w-5" />,
      value: stats.activeProjects,
      label: "Active",
    },
    {
      icon: <Lightbulb className="h-5 w-5" />,
      value: stats.totalIdeas,
      label: "Ideas",
    },
    {
      icon: <CheckCircle className="h-5 w-5" />,
      value: stats.completedMilestones,
      label: "Milestones Done",
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card) => (
        <Card key={card.label}>
          <CardContent className="flex flex-col gap-3">
            <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-primary">
              {card.icon}
            </div>
            <div>
              <p className="font-heading text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-muted-foreground">{card.label}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
