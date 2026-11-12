import { useEffect, useState } from "react";
import { PROJECTS } from "../constants";

// The Supabase client is loaded on demand so visitors who only read the site
// never download it up front; the admin page imports it directly.
const isConfigured = !!(import.meta.env.VITE_SUPABASE_URL?.trim() && import.meta.env.VITE_SUPABASE_ANON_KEY?.trim());
const loadSupabase = () => import("./supabase");

export const fromRow = (row) => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle || "",
  description: row.description || "",
  problem: row.problem || "",
  role: row.role || "",
  facts: row.facts || [],
  outcome: row.outcome || "",
  features: row.features || [],
  technologies: row.technologies || [],
  image: row.image_url || "",
  gallery: row.gallery_urls || [],
  video: row.video_url || "",
  github: row.github || "",
  demo: row.demo || "",
  paper: row.paper || "",
  featured: row.featured,
  sortOrder: row.sort_order,
});

export const toRow = (project) => ({
  title: project.title.trim(),
  subtitle: project.subtitle?.trim() || null,
  description: project.description?.trim() || null,
  problem: project.problem?.trim() || null,
  role: project.role?.trim() || null,
  facts: project.facts || [],
  outcome: project.outcome?.trim() || null,
  features: project.features || [],
  technologies: project.technologies || [],
  image_url: project.image || null,
  gallery_urls: project.gallery || [],
  video_url: project.video || null,
  github: project.github?.trim() || null,
  demo: project.demo?.trim() || null,
  paper: project.paper?.trim() || null,
  featured: !!project.featured,
  sort_order: project.sortOrder ?? 0,
});

export async function fetchProjects() {
  const { supabase } = await loadSupabase();
  const { data, error } = await supabase.from("projects").select("*").order("sort_order");
  if (error) throw error;
  return data.map(fromRow);
}

export async function uploadMedia(file) {
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const path = `${Date.now()}-${safeName}`;
  const { MEDIA_BUCKET, supabase } = await loadSupabase();
  const { error } = await supabase.storage.from(MEDIA_BUCKET).upload(path, file, { contentType: file.type });
  if (error) throw error;
  return supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

// Projects for the public site: from Supabase when configured, otherwise (or on
// error, or while the table is still empty) the static list in constants.
export function useProjects() {
  const [projects, setProjects] = useState(isConfigured ? null : PROJECTS);

  useEffect(() => {
    if (!isConfigured) return;
    let cancelled = false;
    fetchProjects()
      .then((rows) => !cancelled && setProjects(rows.length > 0 ? rows : PROJECTS))
      .catch(() => !cancelled && setProjects(PROJECTS));
    return () => { cancelled = true; };
  }, []);

  return projects;
}
