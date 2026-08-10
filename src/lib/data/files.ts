import { createServerSupabase } from "@/lib/supabase/server";
import { mapFile } from "@/lib/mappers";
import type { ProjectFile } from "@/types";
import type { FileRow } from "@/types/db";

export async function getFiles(): Promise<ProjectFile[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`getFiles: ${error.message}`);
  return (data as FileRow[]).map(mapFile);
}

export async function getFileContent(storagePath: string): Promise<string> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.storage
    .from("project-files")
    .download(storagePath);
  if (error) throw new Error(`getFileContent: ${error.message}`);
  return data.text();
}
