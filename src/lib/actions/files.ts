"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { getFileContent } from "@/lib/data/files";
import type { FileType } from "@/types";

const FILE_TYPES: FileType[] = ["spec", "plan", "brand", "design", "tech_stack", "other"];

export async function uploadFile(
  formData: FormData
): Promise<{ error: string } | void> {
  const file = formData.get("file");
  const projectId = String(formData.get("projectId") ?? "");
  const rawType = String(formData.get("fileType") ?? "other");
  const fileType: FileType = (FILE_TYPES as string[]).includes(rawType)
    ? (rawType as FileType)
    : "other";

  if (!(file instanceof File) || !projectId) {
    return { error: "Missing file or project" };
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const storagePath = `${user.id}/${projectId}/${file.name}`;
  const { error: storageError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, file, { upsert: true });
  if (storageError) return { error: storageError.message };

  const { error: rowError } = await supabase.from("files").upsert(
    {
      project_id: projectId,
      file_name: file.name,
      file_type: fileType,
      storage_path: storagePath,
      uploaded_via: "manual",
    },
    { onConflict: "storage_path" }
  );
  if (rowError) return { error: rowError.message };

  revalidatePath("/files");
  revalidatePath(`/project/${projectId}`);
}

export async function fetchFileContent(storagePath: string): Promise<string> {
  return getFileContent(storagePath);
}
