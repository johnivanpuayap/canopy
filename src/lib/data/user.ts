import { createServerSupabase } from "@/lib/supabase/server";
import type { User } from "@/types";

export async function getCurrentUser(): Promise<User | null> {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return null;
  return {
    id: user.id,
    email: user.email ?? "",
    displayName: (user.user_metadata.display_name as string | undefined) ?? "",
    createdAt: user.created_at,
  };
}
