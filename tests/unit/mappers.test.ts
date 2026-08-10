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
