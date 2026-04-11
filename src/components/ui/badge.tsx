import { cn } from "@/lib/utils";

interface BadgeProps {
  variant?:
    | "default"
    | "active"
    | "paused"
    | "completed"
    | "archived"
    | "outline";
  children: React.ReactNode;
  className?: string;
}

const VARIANT_CLASSES: Record<NonNullable<BadgeProps["variant"]>, string> = {
  default: "bg-muted text-foreground",
  active: "bg-primary/10 text-primary",
  paused: "bg-accent/10 text-accent",
  completed: "bg-secondary/10 text-secondary",
  archived: "bg-foreground/10 text-foreground/60",
  outline: "border border-border bg-transparent text-foreground",
};

export function Badge({
  variant = "default",
  className,
  children,
}: BadgeProps): React.ReactElement {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        VARIANT_CLASSES[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
