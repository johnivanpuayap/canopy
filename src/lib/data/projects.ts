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
