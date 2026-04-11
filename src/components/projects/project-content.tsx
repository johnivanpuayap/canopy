"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui/tabs";
import { TodoList } from "@/components/projects/todo-list";
import { ProjectFiles } from "@/components/projects/project-files";
import type { Todo, Milestone, ProjectFile } from "@/types";

interface ProjectContentProps {
  todos: Todo[];
  milestones: Milestone[];
  files: ProjectFile[];
}

const TAB_ITEMS = [
  { value: "todos", label: "Todos" },
  { value: "files", label: "Files" },
];

export function ProjectContent({
  todos,
  milestones,
  files,
}: ProjectContentProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState("todos");

  return (
    <div>
      <Tabs items={TAB_ITEMS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-6">
        {activeTab === "todos" && (
          <TodoList todos={todos} milestones={milestones} />
        )}
        {activeTab === "files" && <ProjectFiles files={files} />}
      </div>
    </div>
  );
}
