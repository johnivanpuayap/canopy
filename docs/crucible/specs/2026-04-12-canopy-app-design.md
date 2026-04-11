# Canopy — App Design Spec

**Date:** 2026-04-12
**Tagline:** "All your projects, one living view"
**Type:** Web Application (Next.js + Supabase)

---

## Overview

Canopy is a responsive web app for managing personal dev projects and ideas. It serves as a command center — tracking project progress (todos, milestones), storing design docs and specs, and providing a mood board-style idea board for capturing and browsing ideas visually.

Canopy is the companion app to Crucible (the Claude Code skill). Crucible produces the design artifacts; Canopy stores, organizes, and displays them. They are independent — Crucible works without Canopy, and Canopy accepts manual uploads too.

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Next.js (React) + Tailwind CSS |
| Backend | Supabase (Auth, Postgres, Realtime, Storage, Edge Functions) |
| Hosting | Vercel (hobby/free tier) |
| Icons | Lucide React (SVG) |
| Fonts | Outfit (headings) + Work Sans (body) via Google Fonts |

**Cost:** Fully free on Supabase free tier + Vercel hobby plan.

## Brand Identity

### Color Palette

| Token | Hex | Usage |
|---|---|---|
| Primary | `#15803D` | Main actions, active states — deep forest green |
| On Primary | `#FFFFFF` | Text on primary |
| Secondary | `#6366F1` | Secondary actions, links — indigo |
| Accent | `#D97706` | CTAs, highlights — warm amber |
| Background | `#FAFBF6` | Light, warm off-white |
| Foreground | `#0F172A` | Dark slate text |
| Muted | `#F0F4ED` | Subtle green-tinted surface for cards |
| Border | `#E2EBE0` | Soft green-gray borders |
| Destructive | `#DC2626` | Errors, delete actions |
| Ring | `#15803D` | Focus rings |

**Dark mode:** Deep `#0C1A0F` background, desaturated greens, warm amber highlights preserved.

### Typography

- **Headings:** Outfit (weights 400-700)
- **Body:** Work Sans (weights 300-700)
- **Mood:** Geometric, modern, clean, balanced
- **Base size:** 16px, line-height 1.5

### UI Style

- Flat design with subtle motion
- No heavy shadows or gradients — clean surfaces
- Smooth transitions (150-200ms ease)
- Masonry grid for mood board
- Color/opacity hover states
- Light, airy spacing
- SVG icons via Lucide

### Personality

- **Tone:** Calm, organized, encouraging
- **Feel:** Like opening a clean notebook in a quiet park
- **Not:** Corporate, noisy, overwhelming

## Core Views

### 1. Dashboard

- List of active projects with progress bars (milestones completed / total)
- Quick stats: total projects, ideas in backlog, recently updated
- Recent activity feed
- Project status badges: `active`, `paused`, `completed`, `archived`

### 2. Project Detail

- Milestone timeline at the top (visual progress)
- Todo list grouped by milestone (or ungrouped)
- Files section — view/download specs, plans, brand, design, tech-stack docs
- Project metadata: repo link, status, created date
- Inline markdown preview for docs

### 3. Idea Board (Mood Board Style)

**Layout:** Masonry/Pinterest-style grid — cards of varying sizes, not a rigid table.

**Raw idea cards:**
- Soft background color (randomly assigned or user-picked)
- Title in a casual style
- Notes as a short snippet
- Optional: attach an image, screenshot, or link for inspiration
- Tags/labels for categorization
- Feels like a sticky note on a physical mood board

**Designed idea cards (went through Crucible):**
- Larger card with the brand's own color palette as card background/accent
- Brand name in the chosen typography
- Tagline displayed
- Color palette swatches shown visually
- Tech stack as small badges
- Tone of voice as a short descriptor
- Feels like a polished brand card — a preview of what this project would look like

**Interactions:**
- Drag to rearrange (like pinning things on a real board)
- Quick add from any view (FAB on mobile)
- "Design with Crucible" action on raw cards
- "Promote to Project" on designed cards
- Pin favorites to the top

### 4. File Vault

- Browse all files across projects
- Filter by project and file type (spec, plan, brand, design, tech-stack)
- Preview markdown files inline
- Download button (primary laptop use case)

### 5. Mobile Experience

- Bottom nav: Dashboard, Ideas, Files
- Quick add idea via FAB (floating action button)
- Swipe to mark todos done
- Responsive — same app, not a separate build
- PWA installable for quick access

## Data Model

### users

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | Supabase Auth user id |
| email | text | |
| display_name | text | |
| created_at | timestamp | |

### projects

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK -> users) | |
| name | text | Project name |
| status | enum | `active`, `paused`, `completed`, `archived` |
| description | text | |
| repo_url | text | Optional GitHub link |
| created_at | timestamp | |
| updated_at | timestamp | |

### milestones

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| project_id | uuid (FK -> projects) | |
| title | text | e.g. "Design phase", "MVP" |
| status | enum | `pending`, `in_progress`, `completed` |
| order | int | Display order |
| created_at | timestamp | |

### todos

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| project_id | uuid (FK -> projects) | |
| milestone_id | uuid (FK -> milestones) | Optional — can be unassigned |
| title | text | |
| is_done | boolean | |
| order | int | Display order |
| created_at | timestamp | |

### ideas

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| user_id | uuid (FK -> users) | |
| title | text | Quick capture |
| notes | text | Optional description |
| status | enum | `raw`, `designed` |
| brand_preview | jsonb | Nullable — populated when designed (name, tagline, palette, etc.) |
| project_id | uuid (FK -> projects) | Nullable — linked once promoted to a project |
| created_at | timestamp | |

### files

| Column | Type | Notes |
|---|---|---|
| id | uuid (PK) | |
| project_id | uuid (FK -> projects) | |
| idea_id | uuid (FK -> ideas) | Nullable — files can belong to an idea before it's a project |
| file_name | text | e.g. `brand.md`, `tech-stack.md` |
| file_type | enum | `spec`, `plan`, `brand`, `design`, `tech_stack`, `other` |
| storage_path | text | Path in Supabase Storage |
| uploaded_via | enum | `skill`, `hook`, `manual` |
| created_at | timestamp | |
| updated_at | timestamp | |

### Key Relationships

- A **user** has many **projects** and **ideas**
- A **project** has many **milestones**, **todos**, and **files**
- An **idea** can be `raw` (just a note) or `designed` (went through Crucible, has brand_preview)
- An **idea** can be promoted to a **project** (links via project_id)
- **Files** can belong to a project or an idea (for pre-project Crucible outputs)
- **Todos** can optionally belong to a milestone

## Integration Layer (Crucible Skill -> Canopy)

### A) Skill Direct Push (end of Crucible skill run)

1. Crucible skill finishes generating files
2. Skill reads config (`~/.crucible/config.json`) — **optional, no error if missing**
3. If config exists, skill calls Supabase Edge Function (`/api/upload`) with files + metadata
4. Edge Function stores files in Supabase Storage, creates/updates records in `files` and `ideas` tables
5. Realtime subscription fires — app updates on all devices

### B) Claude Code Hook (on commit)

1. User commits changes to files in `docs/crucible/`
2. Post-commit hook detects the change
3. Hook calls the same Edge Function (`/api/upload`) with changed files
4. Same flow — storage + database update + realtime sync

### Config File: `~/.crucible/config.json`

```json
{
  "api_url": "https://your-app.vercel.app/api",
  "api_key": "your-anon-key",
  "user_id": "your-user-id"
}
```

**First-time setup:** Run `crucible connect` to link to your Canopy instance. One-time.

### Edge Function Endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/api/upload` | POST | Upload files, create/update file records |
| `/api/sync` | POST | Bulk sync all files in a project |
| `/api/ideas` | POST | Create a new idea (quick capture) |
| `/api/ideas/:id/promote` | POST | Promote an idea to a full project |

### Manual Upload Fallback

Drag-and-drop file upload is always available in the app UI as a fallback.

## Build Order

1. **Crucible skill first** — standalone, immediately useful, no dependencies
2. **Canopy app second** — dogfood it to track the development of both projects

## Hosting & Cost

| Service | Free Tier | Sufficient? |
|---|---|---|
| Supabase | 500MB DB, 1GB storage, 50K MAU, Realtime, Edge Functions | Yes — personal use with markdown files |
| Vercel | Hobby plan, 100GB bandwidth, serverless functions | Yes — 1-2 devices barely scratches it |
| GitHub | Unlimited private repos | Yes |

**Note:** Supabase free tier pauses after 1 week of inactivity. Regular use prevents this.
