# Supabase Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace Canopy's mock data with real auth + data from the local Supabase stack (Docker, ports 55xxx).

**Architecture:** Server components fetch data through typed query functions built on a `@supabase/ssr` server client; mutations go through server actions that call `revalidatePath`. Auth uses Supabase email/password with middleware-based session refresh and route protection. Snake_case DB rows are converted to the existing camelCase UI types by pure mapper functions (unit-tested with Vitest).

**Tech Stack:** Next.js 16 App Router, @supabase/ssr, @supabase/supabase-js, Vitest, local Supabase stack (`npm run db:start`).

## Global Constraints

- TypeScript strict mode — no `any`, no `@ts-ignore`
- Named exports only (except Next.js pages/layouts/middleware which require defaults)
- Explicit return types on all functions
- Files kebab-case, components PascalCase
- No console.log in committed code
- Atomic commits, imperative mood, no `Co-Authored-By` lines, push after each task
- Work directly on `master`
- The local Supabase stack must be running for manual verification: `npm run db:start` (API on `http://127.0.0.1:55321`)
- Existing UI types in `src/types/index.ts` are the contract — do not rename their fields (DB `sort_order` maps to UI `order`)

---

### Task 1: Vitest setup + DB row types + mappers

**Files:**
- Modify: `package.json` (add vitest + test script)
- Create: `vitest.config.ts`
- Create: `src/types/db.ts`
- Create: `src/lib/mappers.ts`
- Test: `tests/unit/mappers.test.ts`

**Interfaces:**
- Consumes: existing UI types from `src/types/index.ts`
- Produces: `ProjectRow`, `MilestoneRow`, `TodoRow`, `IdeaRow`, `FileRow` (in `src/types/db.ts`); `mapProject(row: ProjectRow): Project`, `mapMilestone(row: MilestoneRow): Milestone`, `mapTodo(row: TodoRow): Todo`, `mapIdea(row: IdeaRow): Idea`, `mapFile(row: FileRow): ProjectFile` (in `src/lib/mappers.ts`)

- [ ] **Step 1: Install Vitest and add script**

```bash
npm install -D vitest
```

Add to `package.json` scripts: `"test": "vitest run"`.

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  test: {
    include: ["tests/**/*.test.ts"],
  },
});
```

- [ ] **Step 2: Create DB row types**

Create `src/types/db.ts`:

```ts
import type {
  ProjectStatus,
  MilestoneStatus,
  IdeaStatus,
  FileType,
  UploadedVia,
  BrandPreview,
} from "@/types";

export interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  status: ProjectStatus;
  description: string | null;
  repo_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface MilestoneRow {
  id: string;
  project_id: string;
  title: string;
  status: MilestoneStatus;
  sort_order: number;
  created_at: string;
}

export interface TodoRow {
  id: string;
  project_id: string;
  milestone_id: string | null;
  title: string;
  is_done: boolean;
  sort_order: number;
  created_at: string;
}

export interface IdeaRow {
  id: string;
  user_id: string;
  title: string;
  notes: string | null;
  status: IdeaStatus;
  tags: string[];
  color: string;
  is_pinned: boolean;
  brand_preview: BrandPreview | null;
  project_id: string | null;
  created_at: string;
}

export interface FileRow {
  id: string;
  project_id: string | null;
  idea_id: string | null;
  file_name: string;
  file_type: FileType;
  storage_path: string;
  uploaded_via: UploadedVia;
  created_at: string;
  updated_at: string;
}
```

- [ ] **Step 3: Write the failing mapper tests**

Create `tests/unit/mappers.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import {
  mapProject,
  mapMilestone,
  mapTodo,
  mapIdea,
  mapFile,
} from "@/lib/mappers";
import type { ProjectRow, TodoRow, IdeaRow, MilestoneRow, FileRow } from "@/types/db";

const projectRow: ProjectRow = {
  id: "p1",
  user_id: "u1",
  name: "Canopy",
  status: "active",
  description: null,
  repo_url: null,
  created_at: "2026-08-10T00:00:00Z",
  updated_at: "2026-08-10T00:00:00Z",
};

describe("mapProject", () => {
  it("converts snake_case and coalesces null description to empty string", () => {
    const p = mapProject(projectRow);
    expect(p).toEqual({
      id: "p1",
      userId: "u1",
      name: "Canopy",
      status: "active",
      description: "",
      repoUrl: null,
      createdAt: "2026-08-10T00:00:00Z",
      updatedAt: "2026-08-10T00:00:00Z",
    });
  });
});

describe("mapMilestone", () => {
  it("maps sort_order to order", () => {
    const row: MilestoneRow = {
      id: "m1",
      project_id: "p1",
      title: "MVP",
      status: "in_progress",
      sort_order: 2,
      created_at: "2026-08-10T00:00:00Z",
    };
    expect(mapMilestone(row).order).toBe(2);
    expect(mapMilestone(row).projectId).toBe("p1");
  });
});

describe("mapTodo", () => {
  it("maps is_done and nullable milestone_id", () => {
    const row: TodoRow = {
      id: "t1",
      project_id: "p1",
      milestone_id: null,
      title: "Ship it",
      is_done: true,
      sort_order: 0,
      created_at: "2026-08-10T00:00:00Z",
    };
    const t = mapTodo(row);
    expect(t.isDone).toBe(true);
    expect(t.milestoneId).toBeNull();
  });
});

describe("mapIdea", () => {
  it("maps board fields and brand preview", () => {
    const row: IdeaRow = {
      id: "i1",
      user_id: "u1",
      title: "New thing",
      notes: null,
      status: "raw",
      tags: ["web"],
      color: "#FEF3C7",
      is_pinned: true,
      brand_preview: null,
      project_id: null,
      created_at: "2026-08-10T00:00:00Z",
    };
    const i = mapIdea(row);
    expect(i.isPinned).toBe(true);
    expect(i.tags).toEqual(["web"]);
    expect(i.brandPreview).toBeNull();
  });
});

describe("mapFile", () => {
  it("maps file row with null content placeholder", () => {
    const row: FileRow = {
      id: "f1",
      project_id: "p1",
      idea_id: null,
      file_name: "brand.md",
      file_type: "brand",
      storage_path: "u1/p1/brand.md",
      uploaded_via: "manual",
      created_at: "2026-08-10T00:00:00Z",
      updated_at: "2026-08-10T00:00:00Z",
    };
    const f = mapFile(row);
    expect(f.fileName).toBe("brand.md");
    expect(f.content).toBeNull();
    expect(f.projectId).toBe("p1");
  });
});
```

- [ ] **Step 4: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/mappers`

- [ ] **Step 5: Implement mappers**

Create `src/lib/mappers.ts`:

```ts
import type { Project, Milestone, Todo, Idea, ProjectFile } from "@/types";
import type { ProjectRow, MilestoneRow, TodoRow, IdeaRow, FileRow } from "@/types/db";

export function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    userId: row.user_id,
    name: row.name,
    status: row.status,
    description: row.description ?? "",
    repoUrl: row.repo_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export function mapMilestone(row: MilestoneRow): Milestone {
  return {
    id: row.id,
    projectId: row.project_id,
    title: row.title,
    status: row.status,
    order: row.sort_order,
    createdAt: row.created_at,
  };
}

export function mapTodo(row: TodoRow): Todo {
  return {
    id: row.id,
    projectId: row.project_id,
    milestoneId: row.milestone_id,
    title: row.title,
    isDone: row.is_done,
    order: row.sort_order,
    createdAt: row.created_at,
  };
}

export function mapIdea(row: IdeaRow): Idea {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    notes: row.notes,
    status: row.status,
    tags: row.tags,
    color: row.color,
    isPinned: row.is_pinned,
    brandPreview: row.brand_preview,
    projectId: row.project_id,
    createdAt: row.created_at,
  };
}

export function mapFile(row: FileRow): ProjectFile {
  return {
    id: row.id,
    projectId: row.project_id ?? "",
    ideaId: row.idea_id,
    fileName: row.file_name,
    fileType: row.file_type,
    storagePath: row.storage_path,
    uploadedVia: row.uploaded_via,
    content: null,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}
```

Note: `ProjectFile.projectId` is typed `string` in the UI types while the DB column is nullable (idea-only files). Coalesce to `""` — components treat empty string as "no project".

- [ ] **Step 6: Run tests to verify they pass**

Run: `npm test`
Expected: PASS (5 test files' worth of assertions, all green)

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/types/db.ts src/lib/mappers.ts tests/unit/mappers.test.ts
git commit -m "Add Vitest, DB row types, and row-to-UI mappers"
git push origin master
```

---

### Task 2: Migration 00004 (idea board columns) + dev seed

**Files:**
- Create: `supabase/migrations/00004_idea_board_columns.sql`
- Create: `supabase/seed.sql`

**Interfaces:**
- Consumes: existing schema from migrations 00001–00003
- Produces: `ideas.tags text[]`, `ideas.color text`, `ideas.is_pinned boolean` columns; a seeded dev login `dev@canopy.local` / `password123` with 2 projects, milestones, todos, ideas

- [ ] **Step 1: Write the migration**

Create `supabase/migrations/00004_idea_board_columns.sql`:

```sql
alter table public.ideas
  add column tags text[] not null default '{}',
  add column color text not null default '#FEF3C7',
  add column is_pinned boolean not null default false;
```

- [ ] **Step 2: Write the seed**

Create `supabase/seed.sql`. Seeding `auth.users` directly is the standard local-dev pattern; the `on_auth_user_created` trigger auto-creates the profile. The password hash below is bcrypt for `password123`.

```sql
-- Dev user: dev@canopy.local / password123
insert into auth.users (
  instance_id, id, aud, role, email, encrypted_password,
  email_confirmed_at, raw_app_meta_data, raw_user_meta_data,
  created_at, updated_at
) values (
  '00000000-0000-0000-0000-000000000000',
  '11111111-1111-1111-1111-111111111111',
  'authenticated', 'authenticated', 'dev@canopy.local',
  crypt('password123', gen_salt('bf')),
  now(),
  '{"provider":"email","providers":["email"]}',
  '{"display_name":"Dev User"}',
  now(), now()
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
```

- [ ] **Step 3: Apply and verify**

Run: `npm run db:reset`
Expected: all four migrations apply, then "Seeding data from supabase/seed.sql".

Verify the seed user can log in via the auth API:

```bash
curl -s -X POST "http://127.0.0.1:55321/auth/v1/token?grant_type=password" \
  -H "apikey: <ANON_KEY from npm run db:status>" \
  -H "Content-Type: application/json" \
  -d '{"email":"dev@canopy.local","password":"password123"}'
```

Expected: JSON containing `access_token`.

- [ ] **Step 4: Commit**

```bash
git add supabase/migrations/00004_idea_board_columns.sql supabase/seed.sql
git commit -m "Add idea board columns and local dev seed"
git push origin master
```

---

### Task 3: Supabase SSR clients + auth middleware

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/middleware.ts`
- Delete: `src/lib/supabase.ts` (replaced; nothing imports it yet)

**Interfaces:**
- Consumes: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` env vars (already in `.env.local`)
- Produces: `createBrowserSupabase(): SupabaseClient` (client components), `createServerSupabase(): Promise<SupabaseClient>` (server components / actions / route handlers)

- [ ] **Step 1: Install @supabase/ssr (already in package.json deps — verify)**

Run: `npm ls @supabase/ssr`
Expected: `@supabase/ssr@0.10.x`. If missing: `npm install @supabase/ssr`.

- [ ] **Step 2: Create the browser client**

Create `src/lib/supabase/client.ts`:

```ts
import { createBrowserClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export function createBrowserSupabase(): SupabaseClient {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

- [ ] **Step 3: Create the server client**

Create `src/lib/supabase/server.ts`:

```ts
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import type { SupabaseClient } from "@supabase/supabase-js";

export async function createServerSupabase(): Promise<SupabaseClient> {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — middleware handles refresh.
          }
        },
      },
    }
  );
}
```

- [ ] **Step 4: Create middleware for session refresh + route protection**

Create `src/middleware.ts`:

```ts
import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

const AUTH_PATHS = ["/login", "/signup"];

export default async function middleware(request: NextRequest): Promise<NextResponse> {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAuthPath = AUTH_PATHS.some((p) =>
    request.nextUrl.pathname.startsWith(p)
  );

  if (!user && !isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }
  if (user && isAuthPath) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
};
```

- [ ] **Step 5: Delete the old singleton**

```bash
git rm src/lib/supabase.ts
```

- [ ] **Step 6: Verify build and redirect behavior**

Run: `npm run build`
Expected: build succeeds.

Run: `npm run dev` in background, then:

```bash
curl -s -o /dev/null -w "%{http_code} %{redirect_url}" http://localhost:3000/
```

Expected: `307 http://localhost:3000/login` (unauthenticated dashboard request redirects to login). Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/lib/supabase src/middleware.ts
git commit -m "Add Supabase SSR clients and auth middleware"
git push origin master
```

---

### Task 4: Wire login, signup, and logout

**Files:**
- Create: `src/lib/actions/auth.ts`
- Modify: `src/app/(auth)/login/page.tsx` (wire form to signIn action, show error)
- Modify: `src/app/(auth)/signup/page.tsx` (wire form to signUp action, show error)
- Modify: `src/components/layout/sidebar.tsx` (make the existing logout/sign-out affordance call signOut; if none exists, add a "Sign out" button at the sidebar bottom using the existing Button component)

**Interfaces:**
- Consumes: `createServerSupabase` from Task 3
- Produces: server actions `signIn(formData: FormData): Promise<{ error: string } | void>`, `signUp(formData: FormData): Promise<{ error: string } | void>`, `signOut(): Promise<void>`

- [ ] **Step 1: Write the auth actions**

Create `src/lib/actions/auth.ts`:

```ts
"use server";

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase/server";

export async function signIn(formData: FormData): Promise<{ error: string } | void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) {
    return { error: error.message };
  }
  redirect("/");
}

export async function signUp(formData: FormData): Promise<{ error: string } | void> {
  const email = String(formData.get("email") ?? "");
  const password = String(formData.get("password") ?? "");
  const displayName = String(formData.get("displayName") ?? "");
  const supabase = await createServerSupabase();
  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: displayName } },
  });
  if (error) {
    return { error: error.message };
  }
  redirect("/");
}

export async function signOut(): Promise<void> {
  const supabase = await createServerSupabase();
  await supabase.auth.signOut();
  redirect("/login");
}
```

Note: local `config.toml` has email confirmations disabled by default (`enable_confirmations = false`), so signUp yields a session immediately.

- [ ] **Step 2: Wire the login page**

In `src/app/(auth)/login/page.tsx` (client component): replace the `onSubmit={(e) => e.preventDefault()}` stub. Use `useActionState` pattern or a simple wrapper:

```tsx
"use client";

import { useState, useTransition } from "react";
import { signIn } from "@/lib/actions/auth";
// ...existing imports stay

export default function LoginPage(): React.ReactElement {
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await signIn(formData);
      if (result?.error) setError(result.error);
    });
  }
  // keep the existing JSX; add name="email" / name="password" to the Inputs,
  // onSubmit={handleSubmit} on the form, disabled={isPending} on the submit Button,
  // and render {error && <p className="text-sm text-destructive">{error}</p>} above the button.
}
```

Preserve all existing markup, classes, and copy — only wire behavior.

- [ ] **Step 3: Wire the signup page**

Same pattern in `src/app/(auth)/signup/page.tsx` calling `signUp`. Ensure inputs have `name="displayName"`, `name="email"`, `name="password"`.

- [ ] **Step 4: Wire sign out**

In `src/components/layout/sidebar.tsx`: find the existing sign-out/user affordance. Wrap it in a form:

```tsx
import { signOut } from "@/lib/actions/auth";
// inside the JSX:
<form action={signOut}>
  <Button type="submit" variant="ghost">Sign out</Button>
</form>
```

Match the sidebar's existing styling for the button (use whatever variant/classes neighboring items use).

- [ ] **Step 5: Verify end-to-end**

With `npm run db:start` stack up and `npm run dev` running:

1. `http://localhost:3000/` redirects to `/login`
2. Log in as `dev@canopy.local` / `password123` → lands on dashboard
3. Sign out → back to `/login`
4. Sign up a fresh user `me2@canopy.local` → lands on dashboard

Also run: `npm run build` — expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add src/lib/actions/auth.ts "src/app/(auth)" src/components/layout/sidebar.tsx
git commit -m "Wire login, signup, and sign out to Supabase auth"
git push origin master
```

---

### Task 5: Data queries + dashboard on real data

**Files:**
- Create: `src/lib/data/projects.ts`
- Create: `src/lib/derive.ts`
- Modify: `src/app/(main)/page.tsx`
- Test: `tests/unit/derive.test.ts`

**Interfaces:**
- Consumes: `createServerSupabase` (Task 3), mappers (Task 1)
- Produces:
  - `getProjects(): Promise<Project[]>`
  - `getAllMilestones(): Promise<Milestone[]>`
  - `getAllTodos(): Promise<Todo[]>`
  - `computeStats(projects: Project[], ideas: Idea[], milestones: Milestone[]): DashboardStats`
  - `deriveActivity(projects: Project[], milestones: Milestone[], todos: Todo[]): ActivityItem[]` (10 most recent items)

- [ ] **Step 1: Write failing tests for the pure derivation functions**

Create `tests/unit/derive.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { computeStats, deriveActivity } from "@/lib/derive";
import type { Project, Milestone, Todo, Idea } from "@/types";

function proj(overrides: Partial<Project>): Project {
  return {
    id: "p1", userId: "u1", name: "P", status: "active", description: "",
    repoUrl: null, createdAt: "2026-08-01T00:00:00Z", updatedAt: "2026-08-01T00:00:00Z",
    ...overrides,
  };
}
function mile(overrides: Partial<Milestone>): Milestone {
  return {
    id: "m1", projectId: "p1", title: "M", status: "pending", order: 0,
    createdAt: "2026-08-02T00:00:00Z", ...overrides,
  };
}
function todo(overrides: Partial<Todo>): Todo {
  return {
    id: "t1", projectId: "p1", milestoneId: null, title: "T", isDone: false,
    order: 0, createdAt: "2026-08-03T00:00:00Z", ...overrides,
  };
}
function idea(overrides: Partial<Idea>): Idea {
  return {
    id: "i1", userId: "u1", title: "I", notes: null, status: "raw", tags: [],
    color: "#FEF3C7", brandPreview: null, projectId: null, isPinned: false,
    createdAt: "2026-08-04T00:00:00Z", ...overrides,
  };
}

describe("computeStats", () => {
  it("counts totals, active projects, and completed milestones", () => {
    const stats = computeStats(
      [proj({}), proj({ id: "p2", status: "archived" })],
      [idea({})],
      [mile({ status: "completed" }), mile({ id: "m2" })]
    );
    expect(stats).toEqual({
      totalProjects: 2,
      activeProjects: 1,
      totalIdeas: 1,
      completedMilestones: 1,
    });
  });
});

describe("deriveActivity", () => {
  it("returns newest-first activity with project names, capped at 10", () => {
    const projects = [proj({ id: "p1", name: "Canopy" })];
    const todos = Array.from({ length: 12 }, (_, i) =>
      todo({ id: `t${i}`, createdAt: `2026-08-03T00:00:${String(i).padStart(2, "0")}Z` })
    );
    const items = deriveActivity(projects, [], todos);
    expect(items).toHaveLength(10);
    expect(items[0].id).toBe("todo-t11");
    expect(items[0].projectName).toBe("Canopy");
    expect(items[0].action).toContain("T");
  });

  it("skips items whose project is unknown", () => {
    const items = deriveActivity([], [mile({})], [todo({})]);
    expect(items).toHaveLength(0);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/derive`

- [ ] **Step 3: Implement `src/lib/derive.ts`**

```ts
import type { Project, Milestone, Todo, Idea, ActivityItem, DashboardStats } from "@/types";

export function computeStats(
  projects: Project[],
  ideas: Idea[],
  milestones: Milestone[]
): DashboardStats {
  return {
    totalProjects: projects.length,
    activeProjects: projects.filter((p) => p.status === "active").length,
    totalIdeas: ideas.length,
    completedMilestones: milestones.filter((m) => m.status === "completed").length,
  };
}

export function deriveActivity(
  projects: Project[],
  milestones: Milestone[],
  todos: Todo[]
): ActivityItem[] {
  const names = new Map(projects.map((p) => [p.id, p.name]));
  const items: ActivityItem[] = [];

  for (const t of todos) {
    const projectName = names.get(t.projectId);
    if (!projectName) continue;
    items.push({
      id: `todo-${t.id}`,
      projectId: t.projectId,
      projectName,
      action: t.isDone ? `Completed todo: "${t.title}"` : `Added todo: "${t.title}"`,
      timestamp: t.createdAt,
    });
  }
  for (const m of milestones) {
    const projectName = names.get(m.projectId);
    if (!projectName) continue;
    items.push({
      id: `milestone-${m.id}`,
      projectId: m.projectId,
      projectName,
      action:
        m.status === "completed"
          ? `Completed milestone: "${m.title}"`
          : `Added milestone: "${m.title}"`,
      timestamp: m.createdAt,
    });
  }
  for (const p of projects) {
    items.push({
      id: `project-${p.id}`,
      projectId: p.id,
      projectName: p.name,
      action: "Created project",
      timestamp: p.createdAt,
    });
  }

  return items
    .sort((a, b) => b.timestamp.localeCompare(a.timestamp))
    .slice(0, 10);
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `npm test`
Expected: PASS

- [ ] **Step 5: Implement the query module**

Create `src/lib/data/projects.ts`:

```ts
import { createServerSupabase } from "@/lib/supabase/server";
import { mapProject, mapMilestone, mapTodo } from "@/lib/mappers";
import type { Project, Milestone, Todo } from "@/types";
import type { ProjectRow, MilestoneRow, TodoRow } from "@/types/db";

export async function getProjects(): Promise<Project[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`getProjects: ${error.message}`);
  return (data as ProjectRow[]).map(mapProject);
}

export async function getAllMilestones(): Promise<Milestone[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("milestones")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getAllMilestones: ${error.message}`);
  return (data as MilestoneRow[]).map(mapMilestone);
}

export async function getAllTodos(): Promise<Todo[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("todos")
    .select("*")
    .order("sort_order", { ascending: true });
  if (error) throw new Error(`getAllTodos: ${error.message}`);
  return (data as TodoRow[]).map(mapTodo);
}
```

- [ ] **Step 6: Wire the dashboard page**

Modify `src/app/(main)/page.tsx` — replace mock imports with real data (page is already a server component; make it async). Ideas are needed for stats: import `getIdeas` — NOT yet written (Task 7). To keep this task independent, query ideas inline here for the count only... **No** — instead `computeStats` takes `Idea[]`; pass `[]` for now and leave a follow-up wire in Task 7 Step 6 (explicitly listed there). Dashboard after this task shows `totalIdeas: 0` until Task 7 lands.

```tsx
import { getProjects, getAllMilestones, getAllTodos } from "@/lib/data/projects";
import { computeStats, deriveActivity } from "@/lib/derive";
import { APP_TAGLINE } from "@/lib/constants";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { ProjectList } from "@/components/dashboard/project-list";
import { ActivityFeed } from "@/components/dashboard/activity-feed";

export default async function DashboardPage(): Promise<React.ReactElement> {
  const [projects, milestones, todos] = await Promise.all([
    getProjects(),
    getAllMilestones(),
    getAllTodos(),
  ]);
  const stats = computeStats(projects, [], milestones);
  const activity = deriveActivity(projects, milestones, todos);

  return (
    /* keep the existing JSX exactly, substituting:
       MOCK_DASHBOARD_STATS -> stats
       MOCK_PROJECTS -> projects
       MOCK_MILESTONES -> milestones
       MOCK_ACTIVITY -> activity */
  );
}
```

- [ ] **Step 7: Verify**

Run: `npm test && npm run build`
Expected: both pass.

With dev server + stack running, log in as `dev@canopy.local` → dashboard shows the 2 seeded projects, milestone progress, and a real activity feed.

- [ ] **Step 8: Commit**

```bash
git add src/lib/data/projects.ts src/lib/derive.ts tests/unit/derive.test.ts "src/app/(main)/page.tsx"
git commit -m "Wire dashboard to Supabase data"
git push origin master
```

---

### Task 6: Project detail page + todo mutations

**Files:**
- Modify: `src/lib/data/projects.ts` (add `getProjectDetail`)
- Create: `src/lib/actions/todos.ts`
- Modify: `src/app/(main)/project/[id]/page.tsx`
- Modify: `src/components/projects/todo-item.tsx` (call `toggleTodo` on click)
- Modify: `src/components/projects/todo-list.tsx` (wire add-todo input to `createTodo` if the UI has one; otherwise leave read-only)

**Interfaces:**
- Consumes: mappers (Task 1), `createServerSupabase` (Task 3)
- Produces:
  - `getProjectDetail(id: string): Promise<{ project: Project; milestones: Milestone[]; todos: Todo[] } | null>`
  - server actions `toggleTodo(id: string, isDone: boolean): Promise<void>`, `createTodo(projectId: string, milestoneId: string | null, title: string): Promise<void>`, `deleteTodo(id: string): Promise<void>`

- [ ] **Step 1: Add `getProjectDetail` to `src/lib/data/projects.ts`**

```ts
export async function getProjectDetail(
  id: string
): Promise<{ project: Project; milestones: Milestone[]; todos: Todo[] } | null> {
  const supabase = await createServerSupabase();
  const { data: projectRow, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw new Error(`getProjectDetail: ${error.message}`);
  if (!projectRow) return null;

  const [{ data: milestoneRows, error: mErr }, { data: todoRows, error: tErr }] =
    await Promise.all([
      supabase.from("milestones").select("*").eq("project_id", id).order("sort_order"),
      supabase.from("todos").select("*").eq("project_id", id).order("sort_order"),
    ]);
  if (mErr) throw new Error(`getProjectDetail milestones: ${mErr.message}`);
  if (tErr) throw new Error(`getProjectDetail todos: ${tErr.message}`);

  return {
    project: mapProject(projectRow as ProjectRow),
    milestones: (milestoneRows as MilestoneRow[]).map(mapMilestone),
    todos: (todoRows as TodoRow[]).map(mapTodo),
  };
}
```

- [ ] **Step 2: Write the todo actions**

Create `src/lib/actions/todos.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";

export async function toggleTodo(id: string, isDone: boolean): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").update({ is_done: isDone }).eq("id", id);
  if (error) throw new Error(`toggleTodo: ${error.message}`);
  revalidatePath("/", "layout");
}

export async function createTodo(
  projectId: string,
  milestoneId: string | null,
  title: string
): Promise<void> {
  const trimmed = title.trim();
  if (!trimmed) return;
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").insert({
    project_id: projectId,
    milestone_id: milestoneId,
    title: trimmed,
  });
  if (error) throw new Error(`createTodo: ${error.message}`);
  revalidatePath("/", "layout");
}

export async function deleteTodo(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("todos").delete().eq("id", id);
  if (error) throw new Error(`deleteTodo: ${error.message}`);
  revalidatePath("/", "layout");
}
```

- [ ] **Step 3: Wire the page**

Modify `src/app/(main)/project/[id]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getProjectDetail } from "@/lib/data/projects";
// keep existing component imports

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<React.ReactElement> {
  const { id } = await params;
  const detail = await getProjectDetail(id);
  if (!detail) notFound();
  const { project, milestones, todos } = detail;
  // keep existing JSX, substituting the mock lookups with project/milestones/todos
}
```

(Next 16: `params` is a Promise — must be awaited.)

- [ ] **Step 4: Wire todo interactions**

In `src/components/projects/todo-item.tsx` (already has onClick state): replace the local-state toggle with the server action; keep an optimistic checkbox flip:

```tsx
"use client";
import { useOptimistic, startTransition } from "react";
import { toggleTodo } from "@/lib/actions/todos";
// in the component:
const [optimisticDone, setOptimisticDone] = useOptimistic(todo.isDone);
function handleToggle(): void {
  startTransition(async () => {
    setOptimisticDone(!optimisticDone);
    await toggleTodo(todo.id, !optimisticDone);
  });
}
```

Render from `optimisticDone` instead of `todo.isDone`. If `todo-list.tsx` has an add-todo input, wire it to `createTodo(projectId, null, title)` the same way; if it doesn't, skip — do not invent new UI in this task.

- [ ] **Step 5: Verify**

Run: `npm test && npm run build` — expected: pass.
Manual: open the seeded Canopy project, toggle "Wire auth pages" → refresh → state persists; check the row in Studio (`http://127.0.0.1:55323`) or via curl.

- [ ] **Step 6: Commit**

```bash
git add src/lib/data/projects.ts src/lib/actions/todos.ts "src/app/(main)/project" src/components/projects
git commit -m "Wire project detail page and todo mutations"
git push origin master
```

---

### Task 7: Ideas page on real data + CRUD

**Files:**
- Create: `src/lib/data/ideas.ts`
- Create: `src/lib/actions/ideas.ts`
- Modify: `src/app/(main)/ideas/page.tsx`
- Modify: `src/components/ideas/idea-board.tsx` and idea cards (wire pin/delete/capture affordances that already exist)
- Modify: `src/app/(main)/page.tsx` (pass real ideas into `computeStats` — replaces the `[]` from Task 5)

**Interfaces:**
- Consumes: `mapIdea` (Task 1), `createServerSupabase` (Task 3), `IDEA_COLORS` from `src/lib/constants.ts`
- Produces:
  - `getIdeas(): Promise<Idea[]>`
  - server actions `createIdea(title: string, notes: string | null): Promise<void>`, `togglePin(id: string, isPinned: boolean): Promise<void>`, `deleteIdea(id: string): Promise<void>`

- [ ] **Step 1: Query module**

Create `src/lib/data/ideas.ts`:

```ts
import { createServerSupabase } from "@/lib/supabase/server";
import { mapIdea } from "@/lib/mappers";
import type { Idea } from "@/types";
import type { IdeaRow } from "@/types/db";

export async function getIdeas(): Promise<Idea[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("ideas")
    .select("*")
    .order("is_pinned", { ascending: false })
    .order("created_at", { ascending: false });
  if (error) throw new Error(`getIdeas: ${error.message}`);
  return (data as IdeaRow[]).map(mapIdea);
}
```

- [ ] **Step 2: Actions**

Create `src/lib/actions/ideas.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import { IDEA_COLORS } from "@/lib/constants";

export async function createIdea(title: string, notes: string | null): Promise<void> {
  const trimmed = title.trim();
  if (!trimmed) return;
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) throw new Error("createIdea: not authenticated");
  const color = IDEA_COLORS[Math.floor(Math.random() * IDEA_COLORS.length)];
  const { error } = await supabase.from("ideas").insert({
    user_id: user.id,
    title: trimmed,
    notes,
    color,
  });
  if (error) throw new Error(`createIdea: ${error.message}`);
  revalidatePath("/ideas");
  revalidatePath("/");
}

export async function togglePin(id: string, isPinned: boolean): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("ideas").update({ is_pinned: isPinned }).eq("id", id);
  if (error) throw new Error(`togglePin: ${error.message}`);
  revalidatePath("/ideas");
}

export async function deleteIdea(id: string): Promise<void> {
  const supabase = await createServerSupabase();
  const { error } = await supabase.from("ideas").delete().eq("id", id);
  if (error) throw new Error(`deleteIdea: ${error.message}`);
  revalidatePath("/ideas");
  revalidatePath("/");
}
```

Note: `IDEA_COLORS` currently lives in `src/lib/constants.ts` line ~61 — check whether entries are plain hex strings or objects; adapt the `color` pick to store the hex string (DB column is `text`).

- [ ] **Step 3: Wire the page and board**

`src/app/(main)/ideas/page.tsx`: make async, `const ideas = await getIdeas();`, replace `MOCK_IDEAS`. Wire the quick-capture input (page already has a "capture" affordance) to `createIdea`; wire pin/delete on the cards to `togglePin`/`deleteIdea`. Do not invent affordances the UI lacks; filtering/tags stay client-side as-is.

- [ ] **Step 4: Complete the dashboard stats wire-up**

In `src/app/(main)/page.tsx`: add `getIdeas()` to the `Promise.all`, pass the result into `computeStats(projects, ideas, milestones)` (replacing the `[]` placeholder from Task 5).

- [ ] **Step 5: Verify**

Run: `npm test && npm run build` — expected: pass.
Manual: `/ideas` shows the 2 seeded ideas (pinned first); capture a new idea → appears; pin/unpin persists across refresh; dashboard `totalIdeas` is now non-zero.

- [ ] **Step 6: Commit**

```bash
git add src/lib/data/ideas.ts src/lib/actions/ideas.ts "src/app/(main)/ideas" "src/app/(main)/page.tsx" src/components/ideas
git commit -m "Wire idea board to Supabase with capture, pin, and delete"
git push origin master
```

---

### Task 8: File vault on real data + upload + markdown preview

**Files:**
- Create: `src/lib/data/files.ts`
- Create: `src/lib/actions/files.ts`
- Modify: `src/app/(main)/files/page.tsx`
- Modify: `src/components/files/file-browser.tsx` / `markdown-preview.tsx` (fetch content on preview via `getFileContent`)
- Modify: `src/components/projects/project-files.tsx` (wire the existing upload affordance)

**Interfaces:**
- Consumes: `mapFile` (Task 1), `createServerSupabase` (Task 3), `project-files` storage bucket (migration 00003)
- Produces:
  - `getFiles(): Promise<ProjectFile[]>`
  - `getFileContent(storagePath: string): Promise<string>`
  - server action `uploadFile(formData: FormData): Promise<{ error: string } | void>` (fields: `file`, `projectId`, `fileType`)

- [ ] **Step 1: Query module**

Create `src/lib/data/files.ts`:

```ts
import { createServerSupabase } from "@/lib/supabase/server";
import { mapFile } from "@/lib/mappers";
import type { ProjectFile } from "@/types";
import type { FileRow } from "@/types/db";

export async function getFiles(): Promise<ProjectFile[]> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase
    .from("files")
    .select("*")
    .order("updated_at", { ascending: false });
  if (error) throw new Error(`getFiles: ${error.message}`);
  return (data as FileRow[]).map(mapFile);
}

export async function getFileContent(storagePath: string): Promise<string> {
  const supabase = await createServerSupabase();
  const { data, error } = await supabase.storage
    .from("project-files")
    .download(storagePath);
  if (error) throw new Error(`getFileContent: ${error.message}`);
  return data.text();
}
```

- [ ] **Step 2: Upload action**

Create `src/lib/actions/files.ts`:

```ts
"use server";

import { revalidatePath } from "next/cache";
import { createServerSupabase } from "@/lib/supabase/server";
import type { FileType } from "@/types";

const FILE_TYPES: FileType[] = ["spec", "plan", "brand", "design", "tech_stack", "other"];

export async function uploadFile(
  formData: FormData
): Promise<{ error: string } | void> {
  const file = formData.get("file");
  const projectId = String(formData.get("projectId") ?? "");
  const rawType = String(formData.get("fileType") ?? "other");
  const fileType: FileType = (FILE_TYPES as string[]).includes(rawType)
    ? (rawType as FileType)
    : "other";

  if (!(file instanceof File) || !projectId) {
    return { error: "Missing file or project" };
  }

  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not authenticated" };

  const storagePath = `${user.id}/${projectId}/${file.name}`;
  const { error: storageError } = await supabase.storage
    .from("project-files")
    .upload(storagePath, file, { upsert: true });
  if (storageError) return { error: storageError.message };

  const { error: rowError } = await supabase.from("files").upsert(
    {
      project_id: projectId,
      file_name: file.name,
      file_type: fileType,
      storage_path: storagePath,
      uploaded_via: "manual",
    },
    { onConflict: "storage_path" }
  );
  if (rowError) return { error: rowError.message };

  revalidatePath("/files");
  revalidatePath(`/project/${projectId}`);
}
```

The upsert-by-storage_path needs a unique constraint. Add migration `supabase/migrations/00005_files_storage_path_unique.sql`:

```sql
alter table public.files add constraint files_storage_path_key unique (storage_path);
```

Run `npm run db:reset` after adding it.

- [ ] **Step 3: Wire pages and preview**

- `src/app/(main)/files/page.tsx`: make async, `const files = await getFiles();`, replace mock files. Projects are needed for grouping/filter labels — also `const projects = await getProjects();` if the existing UI groups by project.
- Markdown preview: the mock `content` field is gone (mapper returns `content: null`). Where the preview opens, fetch content. Simplest wiring that keeps `markdown-preview.tsx` a client component: pass content down from a server component route, or add a small server action `fetchFileContent(storagePath: string): Promise<string>` in `src/lib/actions/files.ts` that just calls `getFileContent` — the client preview calls it in a `useEffect`/transition when opened and shows a loading state.
- `src/components/projects/project-files.tsx`: wire the existing upload affordance to `uploadFile` with a `<form>` + hidden `projectId` input.

- [ ] **Step 4: Verify**

Run: `npm test && npm run build` — expected: pass.
Manual: upload a small `.md` file on the seeded Canopy project → it appears in the project's files and in `/files`; open its preview → markdown renders.

- [ ] **Step 5: Commit**

```bash
git add src/lib/data/files.ts src/lib/actions/files.ts supabase/migrations/00005_files_storage_path_unique.sql "src/app/(main)/files" src/components/files src/components/projects/project-files.tsx
git commit -m "Wire file vault to Supabase storage with upload and preview"
git push origin master
```

---

### Task 9: Remove mock data + docs update

**Files:**
- Delete: `src/lib/mock-data.ts`
- Modify: any remaining importers (grep first)
- Modify: `CLAUDE.md` (Current Phase section)

- [ ] **Step 1: Find remaining mock imports**

Run: `grep -rn "mock-data" src/`
Expected after Tasks 5–8: only stragglers (e.g. navbar avatar, empty states). Wire each to real data (user display name comes from `supabase.auth.getUser()` → `user_metadata.display_name` via a `getCurrentUser(): Promise<User | null>` helper added to `src/lib/data/user.ts`):

```ts
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
```

- [ ] **Step 2: Delete mock data**

```bash
git rm src/lib/mock-data.ts
```

Run: `npm test && npm run build`
Expected: pass with zero references to mock-data.

- [ ] **Step 3: Update CLAUDE.md**

Replace the "Current Phase" section body with:

```markdown
**Supabase-backed development** — all views read from the local Supabase stack (`npm run db:start`). Mock data has been removed. Log in with the seeded dev user `dev@canopy.local` / `password123` (created by `supabase/seed.sql`). Next phase: Crucible integration layer (Edge Functions + upload endpoints).
```

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "Remove mock data and update project phase docs"
git push origin master
```

---

## Out of Scope (this plan)

- Crucible integration layer (Edge Functions, skill push, commit hook) — next plan
- Idea → project promotion flow (needs its own UX pass)
- Realtime subscriptions, PWA install, drag-to-reorder todos
- Deploying to Vercel / hosted Supabase (local-only for now)
