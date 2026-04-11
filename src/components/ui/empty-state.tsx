import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps): React.ReactElement {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-12",
        className,
      )}
    >
      <div className="mb-4 text-foreground/20 [&>svg]:h-12 [&>svg]:w-12">
        {icon}
      </div>
      <h3 className="mb-1 font-heading text-lg font-semibold">{title}</h3>
      <p className="mb-4 max-w-sm text-center text-sm text-muted-foreground">
        {description}
      </p>
      {action}
    </div>
  );
}
