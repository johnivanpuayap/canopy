# Canopy — Tech Stack

## Frontend

- **Framework:** Next.js (App Router) — SSR + static where it helps, file-based routing, first-class Vercel deploys
- **Styling:** Tailwind CSS — utility-first, design tokens in `tailwind.config.ts`, no custom CSS layer to maintain
- **Components:** Hand-rolled primitives in `src/components/ui/` — the app is small enough that a component library would add more constraint than speed
- **Icons:** Lucide React — consistent stroke style, tree-shakeable individual imports

## Backend

- **Server/BaaS:** Supabase — Auth, Postgres, Realtime, Storage, and Edge Functions in one free-tier service; Realtime powers the Crucible → Canopy live sync
- **Database:** Supabase Postgres — relational model fits projects/milestones/todos/ideas/files cleanly; per-user RLS on every table

## Hosting

- **Platform:** Vercel (hobby) — zero-config Next.js deploys, free tier comfortably covers personal use

## Key Libraries

- `@supabase/ssr` — cookie-based auth for server components and middleware
- `clsx` + `tailwind-merge` (via `cn()`) — conditional class composition
- `next/font/google` — Outfit + Work Sans without layout shift

## Alternatives Considered

- **Firebase** — passed over: Firestore's document model fits the relational project/milestone/todo shape poorly, and RLS-style row policies are cleaner in Postgres
- **Plain Express + Postgres** — passed over: self-hosting auth, storage, and realtime is undifferentiated work for a personal tool
- **shadcn/ui** — passed over for now: the UI surface is small and the brand is custom; primitives stay lighter hand-rolled
