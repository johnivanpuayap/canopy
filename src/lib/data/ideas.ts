import { createServerSupabase } from "@/lib/supabase/server";
import { mapIdea } from "@/lib/mappers";
import type { Idea } from "@/types";
import type { IdeaRow } from "@/types/db";

export async function getIdeas(): Promise<Idea[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getIdeas: ${error.message}`);
  return (data as IdeaRow[]).map(mapIdea);
}
