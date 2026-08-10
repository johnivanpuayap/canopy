# Canopy — Project Guidelines

## Project Overview

Canopy is a personal project tracker and idea board for developers. Built with Next.js + Tailwind CSS (frontend) and Supabase (backend). See `docs/crucible/specs/2026-04-12-canopy-app-design.md` for the full design spec.

## Development Workflow

### Subagent-Driven Development

This project uses **subagent-driven development**. The lead agent (Claude) acts as team lead:

1. **Lead** breaks work into independent tasks from the implementation plan
2. **Developer subagents** implement each task in isolated worktrees
3. **Reviewer subagent** reviews each implementation for quality, standards compliance, and correctness
4. **Lead** approves or requests changes based on the review
5. Approved work is merged and pushed

### Git Rules

- **Atomic commits** — each commit does exactly one thing (one component, one config change, one fix)
- **No `Co-Authored-By` lines** — do not add co-authored-by trailers to commit messages
- **Push frequently** — push after every meaningful commit or batch of related commits
- **Commit message style** — imperative mood, concise (e.g., "Add login page layout", "Configure Tailwind theme colors")
- **Branch strategy** — work directly on `master` for now (single developer)

## Coding Standards

### General

- TypeScript strict mode — no `any` types, no `@ts-ignore`
- Functional components only — no class components
- Named exports — no default exports (except Next.js pages/layouts which require them)
- Explicit return types on all functions
- No unused variables or imports
- No console.log in committed code (use proper logging if needed)

### File & Folder Structure

```
src/
  app/              # Next.js App Router pages and layouts
    (auth)/         # Auth route group (login, signup)
    (main)/         # Main app route group (dashboard, ideas, files)
    layout.tsx      # Root layout
    globals.css     # Global styles
  components/
    ui/             # Reusable UI primitives (Button, Card, Input, etc.)
    layout/         # Layout components (Sidebar, Navbar, MobileNav)
    dashboard/      # Dashboard-specific components
    ideas/          # Idea board components
    projects/       # Project detail components
    files/          # File vault components
  lib/
    constants.ts    # App-wide constants
    utils.ts        # Utility functions
    mock-data.ts    # Mock data for UI development
  types/
    index.ts        # Shared TypeScript types/interfaces
```

### Naming Conventions

- **Files:** kebab-case (`project-card.tsx`, `mock-data.ts`)
- **Components:** PascalCase (`ProjectCard`, `IdeaBoard`)
- **Functions/variables:** camelCase (`getProjects`, `isLoading`)
- **Types/Interfaces:** PascalCase (`Project`, `IdeaBoardProps`)
- **Constants:** SCREAMING_SNAKE_CASE (`MAX_FILE_SIZE`, `API_URL`)
- **CSS classes:** Tailwind utility classes, no custom CSS unless absolutely necessary

### Component Guidelines

- One component per file
- Props interface defined above the component in the same file
- Destructure props in function signature
- Keep components under 150 lines — extract sub-components if larger
- Co-locate component-specific types with the component

### Tailwind & Styling

- Use the design tokens defined in `tailwind.config.ts` — never hardcode colors
- Responsive: mobile-first (`sm:`, `md:`, `lg:` breakpoints)
- Use `cn()` utility (clsx + tailwind-merge) for conditional classes
- Transitions: 150-200ms ease for interactive elements
- Spacing: consistent use of Tailwind spacing scale

### Brand Tokens (from design spec)

| Token | Hex | Tailwind Key |
|---|---|---|
| Primary | `#15803D` | `primary` |
| Secondary | `#6366F1` | `secondary` |
| Accent | `#D97706` | `accent` |
| Background | `#FAFBF6` | `background` |
| Foreground | `#0F172A` | `foreground` |
| Muted | `#F0F4ED` | `muted` |
| Border | `#E2EBE0` | `border` |
| Destructive | `#DC2626` | `destructive` |

### Fonts

- **Headings:** Outfit (400-700)
- **Body:** Work Sans (300-700)
- Loaded via `next/font/google`

### Icons

- Lucide React only — no other icon libraries
- Import individual icons, never the entire library

## Local Database (Supabase + Docker)

Development uses the Supabase CLI local stack (Docker required, same setup as the eligible repo):

- `npm run db:start` — start the local stack (applies `supabase/migrations/`)
- `npm run db:stop` — stop the containers
- `npm run db:reset` — drop and re-apply all migrations
- `npm run db:status` — show URLs and keys

Ports are shifted to **55xxx** (API `55321`, DB `55322`, Studio `55323`, Mailpit `55324`) so this stack can run alongside eligible's default 54xxx stack. `.env.local` points at the local stack; the hosted Supabase values are kept commented out there.

Schema lives in `supabase/migrations/` (profiles + signup trigger, projects/milestones/todos, ideas/files + `project-files` storage bucket). All tables have per-user RLS; grants go to `authenticated` and `service_role` only — `anon` intentionally has no table access.

## Current Phase

**UI-first development** — building all screens with mock/static data. No Supabase integration yet (schema and local DB are ready; the UI still renders mock data). Focus on layout, components, responsiveness, and visual polish.
