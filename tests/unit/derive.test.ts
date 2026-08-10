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
