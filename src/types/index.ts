export type ProjectStatus = "active" | "paused" | "completed" | "archived";
export type MilestoneStatus = "pending" | "in_progress" | "completed";
export type IdeaStatus = "raw" | "designed";
export type FileType = "spec" | "plan" | "brand" | "design" | "tech_stack" | "other";
export type UploadedVia = "skill" | "hook" | "manual";

export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  status: ProjectStatus;
  description: string;
  repoUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Milestone {
  id: string;
  projectId: string;
  title: string;
  status: MilestoneStatus;
  order: number;
  createdAt: string;
}

export interface Todo {
  id: string;
  projectId: string;
  milestoneId: string | null;
  title: string;
  isDone: boolean;
  order: number;
  createdAt: string;
}

export interface BrandPreview {
  name: string;
  tagline: string;
  palette: Array<{ name: string; hex: string }>;
  typography: { heading: string; body: string };
  techStack: string[];
  toneOfVoice: string;
}

export interface Idea {
  id: string;
  userId: string;
  title: string;
  notes: string | null;
  status: IdeaStatus;
  tags: string[];
  color: string;
  brandPreview: BrandPreview | null;
  projectId: string | null;
  isPinned: boolean;
  createdAt: string;
}

export interface ProjectFile {
  id: string;
  projectId: string;
  ideaId: string | null;
  fileName: string;
  fileType: FileType;
  storagePath: string;
  uploadedVia: UploadedVia;
  content: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ActivityItem {
  id: string;
  projectId: string;
  projectName: string;
  action: string;
  timestamp: string;
}

export interface DashboardStats {
  totalProjects: number;
  activeProjects: number;
  totalIdeas: number;
  completedMilestones: number;
}
