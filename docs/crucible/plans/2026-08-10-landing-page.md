# Plan: Public Marketing Landing Page

Canopy currently serves the authenticated dashboard at `/` and bounces unauthenticated visitors to `/login`. This plan adds a public marketing landing page at `/` and moves the dashboard to `/dashboard`.

## Global Constraints

- TypeScript strict mode — no `any`, no `@ts-ignore`; explicit return types on all functions
- Named exports only (default exports ONLY for Next.js `page.tsx`/`layout.tsx`/`error.tsx` files which require them)
- Files kebab-case; components PascalCase; one component per file; props interface above the component in the same file; keep components under 150 lines
- Tailwind only, using the design tokens from `tailwind.config.ts` (`primary`, `secondary`, `accent`, `background`, `foreground`, `muted`, `border`, `destructive`) — never hardcode hex colors in components
- Use the `cn()` utility from `src/lib/utils.ts` for conditional classes; transitions 150–200ms ease; mobile-first responsive (`sm:` `md:` `lg:`)
- Icons: Lucide React only, individual imports
- No console.log; no unused imports
- Atomic commits, imperative mood, no Co-Authored-By trailers
- Verification for each task: `npm run lint` and `npx tsc --noEmit` must pass (there is no test suite in this repo); state the commands and results in the report

## Task 1: Move dashboard to /dashboard and make / public

The dashboard currently lives at `src/app/(main)/page.tsx` (route `/`). Free up `/` for a public landing page:

1. Move `src/app/(main)/page.tsx` → `src/app/(main)/dashboard/page.tsx` (use `git mv`; content unchanged unless imports need path fixes).
2. `src/lib/constants.ts`: change the Dashboard NAV_ITEMS entry from `href: "/"` to `href: "/dashboard"`.
3. `src/lib/actions/auth.ts`: both `redirect("/")` calls (after login and after signup) become `redirect("/dashboard")`.
4. `src/middleware.ts`:
   - Public paths are now `/`, `/login`, `/signup`. Keep the existing `AUTH_PATHS` behavior for `/login`/`/signup`; treat `/` (exact match only) as public for unauthenticated users.
   - Unauthenticated users may view `/`, `/login`, `/signup`; anything else still redirects to `/login`.
   - Authenticated users visiting `/login` or `/signup` redirect to `/dashboard` (was `/`). Authenticated users visiting `/` are ALSO redirected to `/dashboard` — the landing page is for logged-out visitors.
5. Check for any other links/redirects to `/` that mean "dashboard" (e.g. logo link in `src/components/layout/sidebar.tsx` / `navbar.tsx`, error boundary links) and update them to `/dashboard`.

Verify: lint + typecheck pass; grep confirms no remaining dashboard-intent references to bare `/`.

Commit: `Move dashboard to /dashboard and open root route`

## Task 2: Build the marketing landing page at /

Create the public landing page in a new route group so it gets neither the app sidebar nor the auth layout:

- `src/app/(marketing)/layout.tsx` — minimal wrapper (no sidebar/navbar from the app shell)
- `src/app/(marketing)/page.tsx` — the landing page (default export required by Next.js), composed from components in `src/components/marketing/`
- Landing-page components live in `src/components/marketing/` (kebab-case files, one component each, each under 150 lines)

### Brand assets

- The logo system is in `docs/crucible/logos/`. Create a reusable inline-SVG logo component `src/components/marketing/canopy-logo.tsx` that renders the canopy mark (the three-layer tree from `docs/crucible/logos/logo.svg`) with an optional wordmark. Inline the SVG paths in the component (do not `<img>` a file from docs/). The mark's layers: back `#15803D`, mid `#4CAF6E` at 0.9 opacity, top circle `#A7D7B4` at 0.9 opacity, trunk `#15803D` — these exact hexes are allowed inside the SVG component only, since they are the logo's own colors, matching primary token.
- Brand voice (from `docs/crucible/brand.md`): calm, organized, encouraging; casual, approachable, minimal. Tagline: "All your projects, one living view" (also `APP_TAGLINE` in constants).

### Page content (top to bottom)

1. **Header** — canopy logo + wordmark left; right: "Log in" (ghost/outline link to `/login`) and "Get started" (primary button link to `/signup`).
2. **Hero** — headline built on the tagline, one short supporting sentence (Canopy is a personal project tracker and idea board for developers: track milestones and todos, store design docs, pin ideas to a mood board). Primary CTA "Get started — it's free" → `/signup`; secondary "Log in" → `/login`. Include a tasteful visual using the brand (e.g. large canopy mark or a stylized dashboard mock built with real Tailwind cards — NOT a screenshot).
3. **Features** — three or four feature cards: Project dashboard (progress at a glance), Idea board (mood-board style capture), File vault (specs and design docs in one place), Crucible integration (designs flow straight into Canopy). Lucide icons, muted card surfaces, airy spacing.
4. **Footer** — small: logo mark, tagline, © 2026 Canopy.

### Design direction

- Flat design, no heavy shadows or gradients; light airy spacing; 150–200ms transitions on interactive elements
- Background `background` token; cards on `muted` with `border`; primary green for main CTAs, amber `accent` sparingly (one highlight maximum)
- Typography comes from the root layout's existing Outfit/Work Sans setup (`font-heading` / body) — check `src/app/layout.tsx` and `tailwind.config.ts` for the exact class conventions used by existing screens and reuse them
- Must look correct on mobile (stacked hero, wrapped feature grid)
- Landing page is a server component; no client-side state is needed anywhere on this page (no `"use client"` unless genuinely required)

Verify: lint + typecheck pass; `npm run build` succeeds (proves route conflict-free static build).

Commit: `Add public marketing landing page` (split into 2 atomic commits if logo component feels separable: `Add canopy logo component`, `Add public marketing landing page`)
