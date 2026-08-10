"use client";

import { useOptimistic, useState, startTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleTodo } from "@/lib/actions/todos";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): React.ReactElement {
  const [optimisticDone, setOptimisticDone] = useOptimistic(todo.isDone);
  const [toggleFailed, setToggleFailed] = useState(false);

  function handleToggle(): void {
    const next = !optimisticDone;
    startTransition(async () => {
      setOptimisticDone(next);
      setToggleFailed(false);
      try {
        await toggleTodo(todo.id, next);
      } catch {
        setOptimisticDone(!next);
        setToggleFailed(true);
      }
    });
  }

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "h-5 w-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors cursor-pointer",
          toggleFailed
            ? "border-destructive"
            : optimisticDone
              ? "bg-primary border-primary text-primary-foreground"
              : "border-border hover:border-primary",
        )}
        aria-label={
          toggleFailed
            ? "Update failed — try again"
            : optimisticDone
              ? "Mark as incomplete"
              : "Mark as complete"
        }
        title={toggleFailed ? "Update failed — try again" : undefined}
      >
        {optimisticDone && (
          <Check
            className={cn("h-3 w-3", toggleFailed && "text-destructive")}
          />
        )}
      </button>
      <span
        className={cn(
          "text-sm",
          optimisticDone && "line-through text-muted-foreground",
        )}
      >
        {todo.title}
      </span>
    </div>
  );
}
