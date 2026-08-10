"use client";

import { useOptimistic, startTransition } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toggleTodo } from "@/lib/actions/todos";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): React.ReactElement {
  const [optimisticDone, setOptimisticDone] = useOptimistic(todo.isDone);

  function handleToggle(): void {
    startTransition(async () => {
      setOptimisticDone(!optimisticDone);
      await toggleTodo(todo.id, !optimisticDone);
    });
  }

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
      <button
        type="button"
        onClick={handleToggle}
        className={cn(
          "h-5 w-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors cursor-pointer",
          optimisticDone
            ? "bg-primary border-primary text-primary-foreground"
            : "border-border hover:border-primary",
        )}
        aria-label={optimisticDone ? "Mark as incomplete" : "Mark as complete"}
      >
        {optimisticDone && <Check className="h-3 w-3" />}
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
