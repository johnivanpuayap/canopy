"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";

export async function toggleTodo(id: string, isDone: boolean): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").update({ is_done: isDone }).eq("id", id);
  if (error) throw new Error(`toggleTodo: ${error.message}`);
  revalidatePath("/dashboard", "layout");
}

export async function createTodo(
  projectId: string,
  milestoneId: string | null,
  title: string
): Promise<void> {
  const trimmed = title.trim();
  if (!trimmed) return;
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").insert({
    project_id: projectId,
    milestone_id: milestoneId,
    title: trimmed,
  });
  if (error) throw new Error(`createTodo: ${error.message}`);
  revalidatePath("/dashboard", "layout");
}

export async function deleteTodo(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error(`deleteTodo: ${error.message}`);
  revalidatePath("/dashboard", "layout");
}
