create table public.ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  notes text,
  status text not null default 'raw'
    check (status in ('raw', 'designed')),
  brand_preview jsonb,
  project_id uuid references public.projects (id) on delete set null,
  created_at timestamptz not null default now()
);

create table public.files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id) on delete cascade,
  idea_id uuid references public.ideas (id) on delete cascade,
  file_name text not null,
  file_type text not null default 'other'
    check (file_type in ('spec', 'plan', 'brand', 'design', 'tech_stack', 'other')),
  storage_path text not null,
  uploaded_via text not null default 'manual'
    check (uploaded_via in ('skill', 'hook', 'manual')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (project_id is not null or idea_id is not null)
);

create trigger files_updated_at
  before update on public.files
  for each row execute function public.handle_updated_at();

create index ideas_user_id_idx on public.ideas (user_id);
create index files_project_id_idx on public.files (project_id);
create index files_idea_id_idx on public.files (idea_id);

alter table public.ideas enable row level security;
alter table public.files enable row level security;

grant select, insert, update, delete on public.ideas to authenticated;
grant all on public.ideas to service_role;
grant select, insert, update, delete on public.files to authenticated;
grant all on public.files to service_role;

create policy "own ideas" on public.ideas
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own files" on public.files
  for all using (
    (files.project_id is not null and exists (
      select 1 from public.projects p
      where p.id = files.project_id and p.user_id = auth.uid()
    ))
    or
    (files.idea_id is not null and exists (
      select 1 from public.ideas i
      where i.id = files.idea_id and i.user_id = auth.uid()
    ))
  ) with check (
    (files.project_id is not null and exists (
      select 1 from public.projects p
      where p.id = files.project_id and p.user_id = auth.uid()
    ))
    or
    (files.idea_id is not null and exists (
      select 1 from public.ideas i
      where i.id = files.idea_id and i.user_id = auth.uid()
    ))
  );

-- private storage bucket for project/idea files
insert into storage.buckets (id, name, public)
values ('project-files', 'project-files', false);

create policy "own storage objects select" on storage.objects
  for select to authenticated
  using (bucket_id = 'project-files' and owner_id = auth.uid()::text);
create policy "own storage objects insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'project-files' and owner_id = auth.uid()::text);
create policy "own storage objects update" on storage.objects
  for update to authenticated
  using (bucket_id = 'project-files' and owner_id = auth.uid()::text);
create policy "own storage objects delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'project-files' and owner_id = auth.uid()::text);
