"use client";

import { useOptimistic, useState, startTransition } from "react";
import { Pin, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { togglePin, deleteIdea } from "@/lib/actions/ideas";
import { cn } from "@/lib/utils";
import type { Idea } from "@/types";

function hashCode(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

interface RawIdeaCardProps {
  idea: Idea;
}

export function RawIdeaCard({ idea }: RawIdeaCardProps): React.ReactElement {
  const [optimisticPinned, setOptimisticPinned] = useOptimistic(idea.isPinned);
  const [pinFailed, setPinFailed] = useState(false);
  const [deleteFailed, setDeleteFailed] = useState(false);

  function handleTogglePin(): void {
    const next = !optimisticPinned;
    startTransition(async () => {
      setOptimisticPinned(next);
      setPinFailed(false);
      try {
        await togglePin(idea.id, next);
      } catch {
        setOptimisticPinned(!next);
        setPinFailed(true);
      }
    });
  }

  function handleDelete(): void {
    startTransition(async () => {
      setDeleteFailed(false);
      try {
        await deleteIdea(idea.id);
      } catch {
        setDeleteFailed(true);
      }
    });
  }

  return (
    <div
      className="group rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      style={{
        backgroundColor: idea.color,
        transform: `rotate(${(hashCode(idea.id) % 5) - 2}deg)`,
      }}
    >
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <button
          type="button"
          onClick={handleTogglePin}
          className={cn(
            "cursor-pointer transition-opacity",
            optimisticPinned || pinFailed
              ? "opacity-100"
              : "opacity-0 group-hover:opacity-60 hover:opacity-100",
          )}
          aria-label={
            pinFailed
              ? "Pin update failed — try again"
              : optimisticPinned
                ? "Unpin idea"
                : "Pin idea"
          }
          title={pinFailed ? "Pin update failed — try again" : undefined}
        >
          <Pin
            className={cn(
              "h-4 w-4",
              pinFailed
                ? "text-destructive"
                : optimisticPinned
                  ? "text-primary"
                  : "text-foreground/50",
            )}
          />
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className={cn(
            "cursor-pointer transition-opacity",
            deleteFailed ? "opacity-100" : "opacity-0 group-hover:opacity-60 hover:opacity-100",
          )}
          aria-label={deleteFailed ? "Delete failed — try again" : "Delete idea"}
          title={deleteFailed ? "Delete failed — try again" : undefined}
        >
          <Trash2 className="h-4 w-4 text-destructive" />
        </button>
      </div>
      <h3 className="font-heading font-semibold text-foreground">{idea.title}</h3>
      {idea.notes && (
        <p className="text-sm text-foreground/70 mt-1 line-clamp-3">{idea.notes}</p>
      )}
      {idea.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {idea.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      )}
      <div className="mt-3">
        <Button variant="ghost" size="sm" className="text-xs">
          Design with Crucible
        </Button>
      </div>
    </div>
  );
}
