-- Portfolio projects schema. Run once in Supabase: Dashboard > SQL Editor > New query.
-- Everyone can read; only the admin account below can write.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text,
  description text,
  features text[] not null default '{}',
  technologies text[] not null default '{}',
  image_url text,
  video_url text,
  github text,
  demo text,
  paper text,
  featured boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table public.projects enable row level security;

create or replace function public.is_portfolio_admin()
returns boolean
language sql stable
as $$
  select coalesce(auth.jwt() ->> 'email', '') = 'meyrushan29@gmail.com'
$$;

drop policy if exists "Projects are public" on public.projects;
create policy "Projects are public" on public.projects
  for select using (true);

drop policy if exists "Admin manages projects" on public.projects;
create policy "Admin manages projects" on public.projects
  for all to authenticated
  using (public.is_portfolio_admin())
  with check (public.is_portfolio_admin());

-- Public bucket for screenshots and demo videos.
insert into storage.buckets (id, name, public)
values ('project-media', 'project-media', true)
on conflict (id) do update set public = true;

drop policy if exists "Admin uploads media" on storage.objects;
create policy "Admin uploads media" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-media' and public.is_portfolio_admin());

drop policy if exists "Admin updates media" on storage.objects;
create policy "Admin updates media" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-media' and public.is_portfolio_admin());

drop policy if exists "Admin deletes media" on storage.objects;
create policy "Admin deletes media" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-media' and public.is_portfolio_admin());
