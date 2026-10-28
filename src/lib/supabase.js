import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// null when the env vars aren't set, so the site falls back to the static projects.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const MEDIA_BUCKET = "project-media";
