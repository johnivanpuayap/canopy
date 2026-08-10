import type { Project, Milestone, Todo, Idea, ProjectFile } from "@/types";
import type { ProjectRow, MilestoneRow, TodoRow, IdeaRow, FileRow } from "@/types/db";

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    status: row.status,
    description: row.description ?? "",
    repoUrl: row.repo_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapMilestone(row: MilestoneRow): Milestone {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    status: row.status,
    order: row.sort_order,
    createdAt: row.created_at,
  };
}

export function mapTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    projectId: row.project_id,
    milestoneId: row.milestone_id,
    title: row.title,
    isDone: row.is_done,
    order: row.sort_order,
    createdAt: row.created_at,
  };
}

export function mapIdea(row: IdeaRow): Idea {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    notes: row.notes,
    status: row.status,
    tags: row.tags,
    color: row.color,
    isPinned: row.is_pinned,
    brandPreview: row.brand_preview,
    projectId: row.project_id,
    createdAt: row.created_at,
  };
}

export function mapFile(row: FileRow): ProjectFile {
  return {
    id: row.id,
    projectId: row.project_id ?? "",
    ideaId: row.idea_id,
    fileName: row.file_name,
    fileType: row.file_type,
    storagePath: row.storage_path,
    uploadedVia: row.uploaded_via,
    content: null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
