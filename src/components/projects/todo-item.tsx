"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Todo } from "@/types";

interface TodoItemProps {
  todo: Todo;
}

export function TodoItem({ todo }: TodoItemProps): React.ReactElement {
  const [isDone, setIsDone] = useState(todo.isDone);

  return (
    <div className="flex items-center gap-3 py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors">
      <button
        type="button"
        onClick={() => setIsDone(!isDone)}
        className={cn(
          "h-5 w-5 rounded border-2 shrink-0 flex items-center justify-center transition-colors cursor-pointer",
          isDone
            ? "bg-primary border-primary text-primary-foreground"
            : "border-border hover:border-primary",
        )}
        aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
      >
        {isDone && <Check className="h-3 w-3" />}
      </button>
      <span
        className={cn(
          "text-sm",
          isDone && "line-through text-muted-foreground",
        )}
      >
        {todo.title}
      </span>
    </div>
  );
}
