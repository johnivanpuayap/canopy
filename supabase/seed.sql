-- Dev user: dev@canopy.local / password123
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at,
  confirmation_token, recovery_token, email_change, email_change_token_new,
  email_change_token_current, phone_change, phone_change_token, reauthentication_token
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated', 'dev@canopy.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Dev User"}',
  now(), now(),
  '', '', '', '', '', '', '', ''
);

insert into auth.identities (
  id, user_id, provider_id, identity_data, provider,
  last_sign_in_at, created_at, updated_at
) values (
  gen_random_uuid(),
  '11111111-1111-1111-1111-111111111111',
  '11111111-1111-1111-1111-111111111111',
  '{"sub":"11111111-1111-1111-1111-111111111111","email":"dev@canopy.local","email_verified":true}',
  'email', now(), now(), now()
);

insert into public.projects (id, user_id, name, status, description, repo_url) values
  ('22222222-2222-2222-2222-222222222221', '11111111-1111-1111-1111-111111111111',
   'Canopy', 'active', 'Personal project tracker and idea board.', 'https://github.com/johnivanpuayap/canopy'),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111',
   'Crucible', 'paused', 'Claude Code skill that turns raw ideas into designed projects.', null);

insert into public.milestones (id, project_id, title, status, sort_order) values
  ('33333333-3333-3333-3333-333333333331', '22222222-2222-2222-2222-222222222221', 'UI with mock data', 'completed', 0),
  ('33333333-3333-3333-3333-333333333332', '22222222-2222-2222-2222-222222222221', 'Supabase integration', 'in_progress', 1),
  ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222221', 'Crucible integration layer', 'pending', 2);

insert into public.todos (project_id, milestone_id, title, is_done, sort_order) values
  ('22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333332', 'Wire auth pages', false, 0),
  ('22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333332', 'Replace dashboard mock data', false, 1),
  ('22222222-2222-2222-2222-222222222221', '33333333-3333-3333-3333-333333333331', 'Build idea board UI', true, 0);

insert into public.ideas (user_id, title, notes, status, tags, color, is_pinned) values
  ('11111111-1111-1111-1111-111111111111', 'Recipe box app', 'Family recipes with photos', 'raw', '{"mobile"}', '#D1FAE5', true),
  ('11111111-1111-1111-1111-111111111111', 'Habit heatmap', null, 'raw', '{"web","viz"}', '#DBEAFE', false);
