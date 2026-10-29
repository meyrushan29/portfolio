import { createClient } from "@supabase/supabase-js";

// Keep only the origin, so a pasted API URL like ".../rest/v1/" still works.
const toOrigin = (value) => {
  try {
    return new URL(value).origin;
  } catch {
    return null;
  }
};

const url = toOrigin(import.meta.env.VITE_SUPABASE_URL?.trim());
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim();

// null when the env vars aren't set, so the site falls back to the static projects.
export const supabase = url && anonKey ? createClient(url, anonKey) : null;

export const MEDIA_BUCKET = "project-media";
