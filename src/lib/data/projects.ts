import { createServerSupabase } from "@/lib/supabase/server";
import { mapProject, mapMilestone, mapTodo } from "@/lib/mappers";
import type { Project, Milestone, Todo } from "@/types";
import type { ProjectRow, MilestoneRow, TodoRow } from "@/types/db";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`getProjects: ${error.message}`);
  return (data as ProjectRow[]).map(mapProject);
}

export async function getAllMilestones(): Promise<Milestone[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getAllMilestones: ${error.message}`);
  return (data as MilestoneRow[]).map(mapMilestone);
}

export async function getAllTodos(): Promise<Todo[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getAllTodos: ${error.message}`);
  return (data as TodoRow[]).map(mapTodo);
}

export async function getProjectDetail(
  id: string
): Promise<{ project: Project; milestones: Milestone[]; todos: Todo[] } | null> {
  const supabase = await createServerSupabase();
  const { data: projectRow, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getProjectDetail: ${error.message}`);
  if (!projectRow) return null;

  const [{ data: milestoneRows, error: mErr }, { data: todoRows, error: tErr }] =
    await Promise.all([
      supabase.from("milestones").select("*").eq("project_id", id).order("sort_order"),
      supabase.from("todos").select("*").eq("project_id", id).order("sort_order"),
    ]);
  if (mErr) throw new Error(`getProjectDetail milestones: ${mErr.message}`);
  if (tErr) throw new Error(`getProjectDetail todos: ${tErr.message}`);

  return {
    project: mapProject(projectRow as ProjectRow),
    milestones: (milestoneRows as MilestoneRow[]).map(mapMilestone),
    todos: (todoRows as TodoRow[]).map(mapTodo),
  };
}
