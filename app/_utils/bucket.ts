import { createClient } from "@supabase/supabase-js";

// Create Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_KEY!,
);

// Upload file using standard upload
export async function uploadFile(file: File, path: string) {
  const { data, error } = await supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .upload(path, file);

  if (error) {
    throw new Error(`${error.message} + ${path}`);
  }

  const url = supabase.storage
    .from(process.env.SUPABASE_BUCKET!)
    .getPublicUrl(data.path);

  return url.data.publicUrl;
}
