import type {
  ProjectStatus,
  MilestoneStatus,
  IdeaStatus,
  FileType,
  UploadedVia,
  BrandPreview,
} from "@/types";

export interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  status: ProjectStatus;
  description: string | null;
  repo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MilestoneRow {
  id: string;
  project_id: string;
  title: string;
  status: MilestoneStatus;
  sort_order: number;
  created_at: string;
}

export interface TodoRow {
  id: string;
  project_id: string;
  milestone_id: string | null;
  title: string;
  is_done: boolean;
  sort_order: number;
  created_at: string;
}

export interface IdeaRow {
  id: string;
  user_id: string;
  title: string;
  notes: string | null;
  status: IdeaStatus;
  tags: string[];
  color: string;
  is_pinned: boolean;
  brand_preview: BrandPreview | null;
  project_id: string | null;
  created_at: string;
}

export interface FileRow {
  id: string;
  project_id: string | null;
  idea_id: string | null;
  file_name: string;
  file_type: FileType;
  storage_path: string;
  uploaded_via: UploadedVia;
  created_at: string;
  updated_at: string;
}
