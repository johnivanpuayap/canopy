"use client";

import { useState, startTransition } from "react";
import { Plus } from "lucide-react";
import { Tabs } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TodoItem } from "@/components/projects/todo-item";
import { createTodo } from "@/lib/actions/todos";
import type { Todo, Milestone } from "@/types";

interface TodoListProps {
  projectId: string;
  todos: Todo[];
  milestones: Milestone[];
}

const TAB_ITEMS = [
  { value: "all", label: "All" },
  { value: "by-milestone", label: "By Milestone" },
  { value: "ungrouped", label: "Ungrouped" },
];

export function TodoList({ projectId, todos, milestones }: TodoListProps): React.ReactElement {
  const [activeTab, setActiveTab] = useState("all");
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const [addError, setAddError] = useState(false);

  function handleAddTodo(): void {
    const title = newTodoTitle;
    if (!title.trim()) return;
    startTransition(async () => {
      try {
        await createTodo(projectId, null, title);
        setNewTodoTitle("");
        setAddError(false);
      } catch {
        setAddError(true);
      }
    });
  }

  const ungroupedTodos = todos.filter((t) => t.milestoneId === null);

  return (
    <div>
      <Tabs items={TAB_ITEMS} activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="mt-4">
        {activeTab === "all" && (
          <div>
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        )}
        {activeTab === "by-milestone" && (
          <div>
            {milestones.map((milestone) => {
              const milestoneTodos = todos.filter(
                (t) => t.milestoneId === milestone.id,
              );
              if (milestoneTodos.length === 0) return null;
              return (
                <div key={milestone.id}>
                  <h4 className="font-heading text-sm font-semibold text-foreground/80 mt-4 mb-2">
                    {milestone.title}
                  </h4>
                  {milestoneTodos.map((todo) => (
                    <TodoItem key={todo.id} todo={todo} />
                  ))}
                </div>
              );
            })}
          </div>
        )}
        {activeTab === "ungrouped" && (
          <div>
            {ungroupedTodos.length === 0 ? (
              <p className="text-sm text-muted-foreground py-4 text-center">
                No ungrouped todos
              </p>
            ) : (
              ungroupedTodos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))
            )}
          </div>
        )}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Add a todo..."
            value={newTodoTitle}
            onChange={(e) => {
              setNewTodoTitle(e.target.value);
              setAddError(false);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddTodo();
              }
            }}
          />
          <Button variant="ghost" size="sm" onClick={handleAddTodo}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {addError && (
          <p className="text-sm text-destructive mt-1">
            Couldn&apos;t add todo — try again.
          </p>
        )}
      </div>
    </div>
  );
}
