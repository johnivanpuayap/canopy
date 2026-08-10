"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { IDEA_COLORS } from "@/lib/constants";

export async function createIdea(title: string, notes: string | null): Promise<void> {
  const trimmed = title.trim();
  if (!trimmed) return;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("createIdea: not authenticated");
  const color = IDEA_COLORS[Math.floor(Math.random() * IDEA_COLORS.length)];
  const { error } = await supabase.from("ideas").insert({
    user_id: user.id,
    title: trimmed,
    notes,
    color,
  });
  if (error) throw new Error(`createIdea: ${error.message}`);
  revalidatePath("/ideas");
  revalidatePath("/");
}

export async function togglePin(id: string, isPinned: boolean): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("ideas").update({ is_pinned: isPinned }).eq("id", id);
  if (error) throw new Error(`togglePin: ${error.message}`);
  revalidatePath("/ideas");
}

export async function deleteIdea(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("ideas").delete().eq("id", id);
  if (error) throw new Error(`deleteIdea: ${error.message}`);
  revalidatePath("/ideas");
  revalidatePath("/");
}
