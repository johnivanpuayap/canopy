"use client";

import { useOptimistic, startTransition } from "react";
import { Pin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { togglePin } from "@/lib/actions/ideas";
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

  function handleTogglePin(): void {
    startTransition(async () => {
      setOptimisticPinned(!optimisticPinned);
      await togglePin(idea.id, !optimisticPinned);
    });
  }

  return (
    <div
      className="rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer relative"
      style={{
        backgroundColor: idea.color,
        transform: `rotate(${(hashCode(idea.id) % 5) - 2}deg)`,
      }}
    >
      {optimisticPinned && (
        <button
          type="button"
          onClick={handleTogglePin}
          className="absolute top-2 right-2 cursor-pointer"
          aria-label="Unpin idea"
        >
          <Pin className="h-4 w-4 text-primary" />
        </button>
      )}
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
