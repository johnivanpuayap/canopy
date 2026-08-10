create table public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  status text not null default 'active'
    check (status in ('active', 'paused', 'completed', 'archived')),
  description text,
  repo_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger projects_updated_at
  before update on public.projects
  for each row execute function public.handle_updated_at();

create table public.milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  status text not null default 'pending'
    check (status in ('pending', 'in_progress', 'completed')),
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create table public.todos (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  milestone_id uuid references public.milestones (id) on delete set null,
  title text not null,
  is_done boolean not null default false,
  sort_order int not null default 0,
  created_at timestamptz not null default now()
);

create index projects_user_id_idx on public.projects (user_id);
create index milestones_project_id_idx on public.milestones (project_id);
create index todos_project_id_idx on public.todos (project_id);
create index todos_milestone_id_idx on public.todos (milestone_id);

alter table public.projects enable row level security;
alter table public.milestones enable row level security;
alter table public.todos enable row level security;

grant select, insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
grant select, insert, update, delete on public.milestones to authenticated;
grant all on public.milestones to service_role;
grant select, insert, update, delete on public.todos to authenticated;
grant all on public.todos to service_role;

create policy "own projects" on public.projects
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "own project milestones" on public.milestones
  for all using (
    exists (
      select 1 from public.projects p
      where p.id = milestones.project_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.projects p
      where p.id = milestones.project_id and p.user_id = auth.uid()
    )
  );

create policy "own project todos" on public.todos
  for all using (
    exists (
      select 1 from public.projects p
      where p.id = todos.project_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.projects p
      where p.id = todos.project_id and p.user_id = auth.uid()
    )
  );
