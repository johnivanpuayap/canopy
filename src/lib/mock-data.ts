import type {
  User,
  Project,
  Milestone,
  Todo,
  Idea,
  ProjectFile,
  ActivityItem,
  DashboardStats,
} from "@/types";

// ─── User ────────────────────────────────────────────────────────────────────

export const MOCK_USER: User = {
  id: "user-001",
  email: "john@example.com",
  displayName: "John Ivan",
  createdAt: "2026-01-15T08:00:00Z",
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const MOCK_PROJECTS: Project[] = [
  {
    id: "proj-001",
    userId: "user-001",
    name: "Canopy",
    status: "active",
    description:
      "Personal project tracker and idea board for developers. Track progress, store specs, capture ideas.",
    repoUrl: "https://github.com/johnivanpuayap/canopy",
    createdAt: "2026-03-01T10:00:00Z",
    updatedAt: "2026-04-12T09:30:00Z",
  },
  {
    id: "proj-002",
    userId: "user-001",
    name: "Crucible",
    status: "active",
    description:
      "Claude Code skill that transforms raw ideas into fully designed projects with brand identity.",
    repoUrl: "https://github.com/johnivanpuayap/crucible",
    createdAt: "2026-02-10T14:00:00Z",
    updatedAt: "2026-04-11T16:45:00Z",
  },
  {
    id: "proj-003",
    userId: "user-001",
    name: "Board Games Hub",
    status: "paused",
    description:
      "Platform for discovering and organizing board game nights with friends.",
    repoUrl: null,
    createdAt: "2026-01-20T09:00:00Z",
    updatedAt: "2026-03-15T11:20:00Z",
  },
  {
    id: "proj-004",
    userId: "user-001",
    name: "Financial Tracker",
    status: "completed",
    description:
      "Personal finance tracker with budgeting and expense visualization.",
    repoUrl: "https://github.com/johnivanpuayap/financial-tracker",
    createdAt: "2025-11-01T08:00:00Z",
    updatedAt: "2026-02-28T17:00:00Z",
  },
];

// ─── Milestones ──────────────────────────────────────────────────────────────

export const MOCK_MILESTONES: Milestone[] = [
  // Canopy milestones
  {
    id: "ms-001",
    projectId: "proj-001",
    title: "Design",
    status: "completed",
    order: 1,
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "ms-002",
    projectId: "proj-001",
    title: "UI Implementation",
    status: "in_progress",
    order: 2,
    createdAt: "2026-03-10T10:00:00Z",
  },
  {
    id: "ms-003",
    projectId: "proj-001",
    title: "Backend Integration",
    status: "pending",
    order: 3,
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "ms-004",
    projectId: "proj-001",
    title: "Launch",
    status: "pending",
    order: 4,
    createdAt: "2026-03-20T10:00:00Z",
  },

  // Crucible milestones
  {
    id: "ms-005",
    projectId: "proj-002",
    title: "Core Skill Logic",
    status: "completed",
    order: 1,
    createdAt: "2026-02-10T14:00:00Z",
  },
  {
    id: "ms-006",
    projectId: "proj-002",
    title: "Brand Generation Pipeline",
    status: "in_progress",
    order: 2,
    createdAt: "2026-02-20T14:00:00Z",
  },
  {
    id: "ms-007",
    projectId: "proj-002",
    title: "Testing & Polish",
    status: "pending",
    order: 3,
    createdAt: "2026-03-01T14:00:00Z",
  },

  // Board Games Hub milestones
  {
    id: "ms-008",
    projectId: "proj-003",
    title: "Game Database Schema",
    status: "completed",
    order: 1,
    createdAt: "2026-01-20T09:00:00Z",
  },
  {
    id: "ms-009",
    projectId: "proj-003",
    title: "Event Scheduling",
    status: "in_progress",
    order: 2,
    createdAt: "2026-01-28T09:00:00Z",
  },
  {
    id: "ms-010",
    projectId: "proj-003",
    title: "Social Features",
    status: "pending",
    order: 3,
    createdAt: "2026-02-05T09:00:00Z",
  },

  // Financial Tracker milestones (all completed)
  {
    id: "ms-011",
    projectId: "proj-004",
    title: "Expense Tracking",
    status: "completed",
    order: 1,
    createdAt: "2025-11-01T08:00:00Z",
  },
  {
    id: "ms-012",
    projectId: "proj-004",
    title: "Budget Management",
    status: "completed",
    order: 2,
    createdAt: "2025-11-15T08:00:00Z",
  },
  {
    id: "ms-013",
    projectId: "proj-004",
    title: "Visualization Dashboard",
    status: "completed",
    order: 3,
    createdAt: "2025-12-01T08:00:00Z",
  },
];

// ─── Todos ───────────────────────────────────────────────────────────────────

export const MOCK_TODOS: Todo[] = [
  // Canopy — Design (completed)
  {
    id: "todo-001",
    projectId: "proj-001",
    milestoneId: "ms-001",
    title: "Create wireframes for dashboard",
    isDone: true,
    order: 1,
    createdAt: "2026-03-01T12:00:00Z",
  },
  {
    id: "todo-002",
    projectId: "proj-001",
    milestoneId: "ms-001",
    title: "Design idea board layout",
    isDone: true,
    order: 2,
    createdAt: "2026-03-02T10:00:00Z",
  },
  {
    id: "todo-003",
    projectId: "proj-001",
    milestoneId: "ms-001",
    title: "Finalize color palette and typography",
    isDone: true,
    order: 3,
    createdAt: "2026-03-03T09:00:00Z",
  },

  // Canopy — UI Implementation (in progress)
  {
    id: "todo-004",
    projectId: "proj-001",
    milestoneId: "ms-002",
    title: "Build sidebar navigation component",
    isDone: true,
    order: 1,
    createdAt: "2026-03-10T10:00:00Z",
  },
  {
    id: "todo-005",
    projectId: "proj-001",
    milestoneId: "ms-002",
    title: "Implement project card grid",
    isDone: false,
    order: 2,
    createdAt: "2026-03-11T10:00:00Z",
  },
  {
    id: "todo-006",
    projectId: "proj-001",
    milestoneId: "ms-002",
    title: "Create milestone progress bars",
    isDone: false,
    order: 3,
    createdAt: "2026-03-12T10:00:00Z",
  },

  // Canopy — Backend Integration (pending)
  {
    id: "todo-007",
    projectId: "proj-001",
    milestoneId: "ms-003",
    title: "Set up Supabase project",
    isDone: false,
    order: 1,
    createdAt: "2026-03-15T10:00:00Z",
  },
  {
    id: "todo-008",
    projectId: "proj-001",
    milestoneId: "ms-003",
    title: "Implement auth flow",
    isDone: false,
    order: 2,
    createdAt: "2026-03-15T11:00:00Z",
  },

  // Crucible — Core Skill Logic (completed)
  {
    id: "todo-009",
    projectId: "proj-002",
    milestoneId: "ms-005",
    title: "Define skill input/output schema",
    isDone: true,
    order: 1,
    createdAt: "2026-02-10T15:00:00Z",
  },
  {
    id: "todo-010",
    projectId: "proj-002",
    milestoneId: "ms-005",
    title: "Build prompt chaining pipeline",
    isDone: true,
    order: 2,
    createdAt: "2026-02-12T10:00:00Z",
  },

  // Crucible — Brand Generation Pipeline (in progress)
  {
    id: "todo-011",
    projectId: "proj-002",
    milestoneId: "ms-006",
    title: "Generate color palette from concept",
    isDone: true,
    order: 1,
    createdAt: "2026-02-20T14:00:00Z",
  },
  {
    id: "todo-012",
    projectId: "proj-002",
    milestoneId: "ms-006",
    title: "Add typography pairing suggestions",
    isDone: false,
    order: 2,
    createdAt: "2026-02-22T10:00:00Z",
  },

  // Board Games Hub — Game Database Schema (completed)
  {
    id: "todo-013",
    projectId: "proj-003",
    milestoneId: "ms-008",
    title: "Design game entity relationships",
    isDone: true,
    order: 1,
    createdAt: "2026-01-20T10:00:00Z",
  },

  // Financial Tracker — completed todos
  {
    id: "todo-014",
    projectId: "proj-004",
    milestoneId: "ms-011",
    title: "Build transaction entry form",
    isDone: true,
    order: 1,
    createdAt: "2025-11-02T09:00:00Z",
  },
  {
    id: "todo-015",
    projectId: "proj-004",
    milestoneId: "ms-012",
    title: "Create monthly budget calculator",
    isDone: true,
    order: 1,
    createdAt: "2025-11-16T09:00:00Z",
  },
];

// ─── Ideas ───────────────────────────────────────────────────────────────────

export const MOCK_IDEAS: Idea[] = [
  // Raw ideas
  {
    id: "idea-001",
    userId: "user-001",
    title: "Recipe Manager",
    notes:
      "An app to organize family recipes, plan weekly meals, and auto-generate grocery lists. Could integrate with a nutrition API for calorie tracking.",
    status: "raw",
    tags: ["mobile", "utility"],
    color: "#FEF3C7",
    brandPreview: null,
    projectId: null,
    isPinned: false,
    createdAt: "2026-04-05T14:00:00Z",
  },
  {
    id: "idea-002",
    userId: "user-001",
    title: "Dev Portfolio",
    notes:
      "A personal portfolio site with interactive project showcases, a blog section powered by MDX, and a dark/light theme toggle. Maybe include a terminal-style navigation easter egg.",
    status: "raw",
    tags: ["web", "personal"],
    color: "#DBEAFE",
    brandPreview: null,
    projectId: null,
    isPinned: true,
    createdAt: "2026-04-08T11:00:00Z",
  },
  {
    id: "idea-003",
    userId: "user-001",
    title: "Workout Tracker",
    notes:
      "Simple fitness app that tracks sets, reps, and weight for strength training. Include rest timers and progress charts over time.",
    status: "raw",
    tags: ["health", "mobile"],
    color: "#FCE7F3",
    brandPreview: null,
    projectId: null,
    isPinned: false,
    createdAt: "2026-04-10T09:30:00Z",
  },

  // Designed ideas
  {
    id: "idea-004",
    userId: "user-001",
    title: "Lumina",
    notes:
      "A photo editing app focused on natural light adjustments and warm tone presets. Designed for photographers who want quick edits with a consistent aesthetic.",
    status: "designed",
    tags: ["mobile", "creative", "photography"],
    color: "#FEE2E2",
    brandPreview: {
      name: "Lumina",
      tagline: "Light the way you see it.",
      palette: [
        { name: "Sunset Orange", hex: "#F97316" },
        { name: "Warm Coral", hex: "#FB7185" },
        { name: "Soft Cream", hex: "#FFF7ED" },
        { name: "Deep Amber", hex: "#B45309" },
        { name: "Charcoal", hex: "#1C1917" },
      ],
      typography: { heading: "Playfair Display", body: "Source Sans 3" },
      techStack: ["React Native", "Expo", "Sharp", "Cloudinary"],
      toneOfVoice:
        "Warm and inspiring. Speaks like a creative mentor who encourages experimentation with light and color.",
    },
    projectId: null,
    isPinned: true,
    createdAt: "2026-03-20T16:00:00Z",
  },
  {
    id: "idea-005",
    userId: "user-001",
    title: "Nexus",
    notes:
      "A team collaboration tool built around async communication and structured decision logs. Aims to reduce meeting fatigue by making written updates first-class.",
    status: "designed",
    tags: ["web", "productivity", "saas"],
    color: "#E0E7FF",
    brandPreview: {
      name: "Nexus",
      tagline: "Where teams think together.",
      palette: [
        { name: "Electric Indigo", hex: "#6366F1" },
        { name: "Soft Violet", hex: "#A78BFA" },
        { name: "Ice Blue", hex: "#EEF2FF" },
        { name: "Slate", hex: "#475569" },
        { name: "Midnight", hex: "#0F172A" },
      ],
      typography: { heading: "Inter", body: "Inter" },
      techStack: ["Next.js", "Supabase", "Tiptap", "Tailwind CSS", "Vercel"],
      toneOfVoice:
        "Clear and focused. Communicates like a calm facilitator who values clarity and async-first workflows.",
    },
    projectId: null,
    isPinned: false,
    createdAt: "2026-03-25T10:00:00Z",
  },
  {
    id: "idea-006",
    userId: "user-001",
    title: "Verde",
    notes:
      "A sustainability tracker for individuals to monitor their carbon footprint, track eco-friendly habits, and discover local green initiatives.",
    status: "designed",
    tags: ["web", "sustainability", "lifestyle"],
    color: "#D1FAE5",
    brandPreview: {
      name: "Verde",
      tagline: "Small steps, big impact.",
      palette: [
        { name: "Forest Green", hex: "#059669" },
        { name: "Leaf", hex: "#34D399" },
        { name: "Sand", hex: "#FEF3C7" },
        { name: "Earth Brown", hex: "#78716C" },
        { name: "Deep Moss", hex: "#14532D" },
      ],
      typography: { heading: "DM Serif Display", body: "DM Sans" },
      techStack: ["Next.js", "Prisma", "PostgreSQL", "Chart.js", "Vercel"],
      toneOfVoice:
        "Encouraging and grounded. Speaks like a knowledgeable friend who makes sustainable living feel approachable, not overwhelming.",
    },
    projectId: null,
    isPinned: false,
    createdAt: "2026-04-01T13:00:00Z",
  },
];

// ─── Files ───────────────────────────────────────────────────────────────────

export const MOCK_FILES: ProjectFile[] = [
  {
    id: "file-001",
    projectId: "proj-001",
    ideaId: null,
    fileName: "app-design-spec.md",
    fileType: "spec",
    storagePath: "/projects/canopy/app-design-spec.md",
    uploadedVia: "skill",
    content: `# Canopy App Design Spec

## Overview

Canopy is a personal project tracker and idea board designed for developers who juggle multiple side projects.

## Core Features

- **Dashboard** — Overview of all projects with status, progress bars, and recent activity
- **Project Detail** — Milestones, todos, and associated files for a single project
- **Idea Board** — Masonry grid of idea cards (raw and designed)
- **File Vault** — Browse and preview project files with markdown rendering

## Design Principles

1. Minimal, distraction-free interface
2. Dark mode first, with a warm neutral palette
3. Fast navigation between projects and ideas
4. Inline markdown preview for specs and plans

## Target User

Solo developers and indie hackers who want one place to see all their projects and ideas at a glance.`,
    createdAt: "2026-03-01T10:30:00Z",
    updatedAt: "2026-04-10T14:00:00Z",
  },
  {
    id: "file-002",
    projectId: "proj-001",
    ideaId: null,
    fileName: "implementation-plan.md",
    fileType: "plan",
    storagePath: "/projects/canopy/implementation-plan.md",
    uploadedVia: "skill",
    content: `# Canopy Implementation Plan

## Phase 1: UI Shell (Current)

- Set up Next.js 15 with Tailwind CSS v4
- Build layout with sidebar navigation
- Create all page routes and placeholder content
- Implement mock data layer for development

## Phase 2: Core Pages

- Dashboard with project cards and stats
- Project detail with milestone tracker
- Idea board with masonry layout
- File vault with markdown preview

## Phase 3: Backend

- Supabase for auth and database
- File storage with Supabase Storage
- Real-time updates for collaborative features

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 |
| Styling | Tailwind CSS v4 |
| Icons | Lucide React |
| Database | Supabase (planned) |
| Hosting | Vercel |`,
    createdAt: "2026-03-02T11:00:00Z",
    updatedAt: "2026-04-11T09:00:00Z",
  },
  {
    id: "file-003",
    projectId: "proj-001",
    ideaId: null,
    fileName: "brand-guide.md",
    fileType: "brand",
    storagePath: "/projects/canopy/brand-guide.md",
    uploadedVia: "manual",
    content: `# Canopy Brand Guide

## Name & Tagline

**Canopy** — All your projects, one living view.

## Color Palette

- **Primary:** #6EE7B7 (Mint Green)
- **Accent:** #FCD34D (Warm Yellow)
- **Background:** #0A0A0A (Near Black)
- **Surface:** #171717 (Dark Gray)
- **Text:** #FAFAFA (Off White)

## Typography

- **Headings:** Inter (Bold)
- **Body:** Inter (Regular)

## Tone of Voice

Calm, focused, and developer-friendly. Canopy speaks like a reliable tool — no hype, just clarity.`,
    createdAt: "2026-03-05T15:00:00Z",
    updatedAt: "2026-03-05T15:00:00Z",
  },
  {
    id: "file-004",
    projectId: "proj-001",
    ideaId: null,
    fileName: "tech-stack.md",
    fileType: "tech_stack",
    storagePath: "/projects/canopy/tech-stack.md",
    uploadedVia: "manual",
    content: null,
    createdAt: "2026-03-06T10:00:00Z",
    updatedAt: "2026-03-06T10:00:00Z",
  },
  {
    id: "file-005",
    projectId: "proj-002",
    ideaId: null,
    fileName: "crucible-spec.md",
    fileType: "spec",
    storagePath: "/projects/crucible/crucible-spec.md",
    uploadedVia: "skill",
    content: null,
    createdAt: "2026-02-10T14:30:00Z",
    updatedAt: "2026-04-08T12:00:00Z",
  },
  {
    id: "file-006",
    projectId: "proj-002",
    ideaId: null,
    fileName: "prompt-templates.md",
    fileType: "other",
    storagePath: "/projects/crucible/prompt-templates.md",
    uploadedVia: "manual",
    content: null,
    createdAt: "2026-02-15T09:00:00Z",
    updatedAt: "2026-03-20T16:00:00Z",
  },
  {
    id: "file-007",
    projectId: "proj-003",
    ideaId: null,
    fileName: "game-database-design.md",
    fileType: "design",
    storagePath: "/projects/board-games-hub/game-database-design.md",
    uploadedVia: "manual",
    content: null,
    createdAt: "2026-01-22T11:00:00Z",
    updatedAt: "2026-02-10T14:00:00Z",
  },
  {
    id: "file-008",
    projectId: "proj-004",
    ideaId: null,
    fileName: "budget-algorithm.md",
    fileType: "spec",
    storagePath: "/projects/financial-tracker/budget-algorithm.md",
    uploadedVia: "skill",
    content: null,
    createdAt: "2025-11-10T09:00:00Z",
    updatedAt: "2026-01-05T11:00:00Z",
  },
  {
    id: "file-009",
    projectId: "proj-004",
    ideaId: null,
    fileName: "expense-categories.md",
    fileType: "plan",
    storagePath: "/projects/financial-tracker/expense-categories.md",
    uploadedVia: "manual",
    content: null,
    createdAt: "2025-11-12T10:00:00Z",
    updatedAt: "2025-12-20T15:00:00Z",
  },
  {
    id: "file-010",
    projectId: "proj-001",
    ideaId: null,
    fileName: "component-library.md",
    fileType: "design",
    storagePath: "/projects/canopy/component-library.md",
    uploadedVia: "hook",
    content: null,
    createdAt: "2026-03-08T10:00:00Z",
    updatedAt: "2026-04-09T11:00:00Z",
  },
];

// ─── Activity ────────────────────────────────────────────────────────────────

export const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "act-001",
    projectId: "proj-001",
    projectName: "Canopy",
    action: "Completed milestone: Design",
    timestamp: "2026-04-12T09:30:00Z",
  },
  {
    id: "act-002",
    projectId: "proj-001",
    projectName: "Canopy",
    action: 'Added file: "app-design-spec.md"',
    timestamp: "2026-04-11T16:00:00Z",
  },
  {
    id: "act-003",
    projectId: "proj-002",
    projectName: "Crucible",
    action: 'Completed todo: "Generate color palette from concept"',
    timestamp: "2026-04-11T14:20:00Z",
  },
  {
    id: "act-004",
    projectId: "proj-001",
    projectName: "Canopy",
    action: 'Completed todo: "Build sidebar navigation component"',
    timestamp: "2026-04-10T17:45:00Z",
  },
  {
    id: "act-005",
    projectId: "proj-002",
    projectName: "Crucible",
    action: "Started milestone: Brand Generation Pipeline",
    timestamp: "2026-04-10T10:00:00Z",
  },
  {
    id: "act-006",
    projectId: "proj-001",
    projectName: "Canopy",
    action: 'Created idea: "Dev Portfolio"',
    timestamp: "2026-04-08T11:00:00Z",
  },
  {
    id: "act-007",
    projectId: "proj-003",
    projectName: "Board Games Hub",
    action: "Project paused",
    timestamp: "2026-04-06T09:00:00Z",
  },
  {
    id: "act-008",
    projectId: "proj-001",
    projectName: "Canopy",
    action: 'Created idea: "Recipe Manager"',
    timestamp: "2026-04-05T14:00:00Z",
  },
  {
    id: "act-009",
    projectId: "proj-004",
    projectName: "Financial Tracker",
    action: "Project marked as completed",
    timestamp: "2026-04-03T17:00:00Z",
  },
  {
    id: "act-010",
    projectId: "proj-001",
    projectName: "Canopy",
    action: 'Added todo: "Set up Supabase project"',
    timestamp: "2026-04-02T10:30:00Z",
  },
];

// ─── Dashboard Stats ─────────────────────────────────────────────────────────

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalProjects: MOCK_PROJECTS.length,
  activeProjects: MOCK_PROJECTS.filter((p) => p.status === "active").length,
  totalIdeas: MOCK_IDEAS.length,
  completedMilestones: MOCK_MILESTONES.filter((m) => m.status === "completed")
    .length,
};

// ─── Helper Functions ────────────────────────────────────────────────────────

export function getProjectById(id: string): Project | undefined {
  return MOCK_PROJECTS.find((p) => p.id === id);
}

export function getMilestonesByProject(projectId: string): Milestone[] {
  return MOCK_MILESTONES.filter((m) => m.projectId === projectId).sort(
    (a, b) => a.order - b.order
  );
}

export function getTodosByProject(projectId: string): Todo[] {
  return MOCK_TODOS.filter((t) => t.projectId === projectId).sort(
    (a, b) => a.order - b.order
  );
}

export function getTodosByMilestone(milestoneId: string): Todo[] {
  return MOCK_TODOS.filter((t) => t.milestoneId === milestoneId).sort(
    (a, b) => a.order - b.order
  );
}

export function getFilesByProject(projectId: string): ProjectFile[] {
  return MOCK_FILES.filter((f) => f.projectId === projectId);
}
