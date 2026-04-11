import {
  LayoutDashboard,
  Lightbulb,
  FolderOpen,
  FileText,
  Palette,
  Code,
  File,
} from "lucide-react";
import type { ProjectStatus, MilestoneStatus, FileType } from "@/types";

export const APP_NAME = "Canopy";
export const APP_TAGLINE = "All your projects, one living view.";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/", icon: LayoutDashboard },
  { label: "Ideas", href: "/ideas", icon: Lightbulb },
  { label: "Files", href: "/files", icon: FolderOpen },
] as const;

export const PROJECT_STATUS_CONFIG: Record<
  ProjectStatus,
  { label: string; variant: string }
> = {
  active: { label: "Active", variant: "active" },
  paused: { label: "Paused", variant: "paused" },
  completed: { label: "Completed", variant: "completed" },
  archived: { label: "Archived", variant: "archived" },
};

export const MILESTONE_STATUS_CONFIG: Record<
  MilestoneStatus,
  { label: string; className: string }
> = {
  pending: {
    label: "Pending",
    className: "bg-foreground/20 border-foreground/30",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-accent/20 border-accent",
  },
  completed: {
    label: "Completed",
    className: "bg-primary/20 border-primary",
  },
};

export const FILE_TYPE_CONFIG: Record<
  FileType,
  { label: string; icon: typeof FileText }
> = {
  spec: { label: "Spec", icon: FileText },
  plan: { label: "Plan", icon: FileText },
  brand: { label: "Brand", icon: Palette },
  design: { label: "Design", icon: Palette },
  tech_stack: { label: "Tech Stack", icon: Code },
  other: { label: "Other", icon: File },
};

export const IDEA_COLORS = [
  "#FEF3C7",
  "#DBEAFE",
  "#FCE7F3",
  "#E0E7FF",
  "#D1FAE5",
  "#FEE2E2",
  "#F3E8FF",
  "#ECFDF5",
] as const;
