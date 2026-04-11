import { Card, CardContent } from "@/components/ui/card";
import type { ActivityItem } from "@/types";

interface ActivityFeedProps {
  activities: ActivityItem[];
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function ActivityFeed({
  activities,
}: ActivityFeedProps): React.ReactElement {
  return (
    <div>
      <h2 className="font-heading text-lg font-semibold">Recent Activity</h2>
      <Card className="mt-4">
        <CardContent className="py-2">
          {activities.map((activity, index) => {
            const isLast = index === activities.length - 1;
            return (
              <div
                key={activity.id}
                className="relative pl-6 py-3"
              >
                <span className="absolute left-0 top-4 h-2 w-2 rounded-full bg-primary" />
                {!isLast && (
                  <span className="absolute left-[3px] top-6 bottom-0 w-0.5 bg-border" />
                )}
                <p className="text-sm font-medium">{activity.projectName}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {formatTimestamp(activity.timestamp)}
                </p>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
