alter table public.ideas
  add column tags text[] not null default '{}',
  add column color text not null default '#FEF3C7',
  add column is_pinned boolean not null default false;
