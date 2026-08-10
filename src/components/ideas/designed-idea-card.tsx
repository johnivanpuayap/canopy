"use client";

import { useOptimistic, startTransition } from "react";
import { Pin, Quote } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { togglePin } from "@/lib/actions/ideas";
import type { Idea } from "@/types";

interface DesignedIdeaCardProps {
  idea: Idea;
}

export function DesignedIdeaCard({ idea }: DesignedIdeaCardProps): React.ReactElement {
  const [optimisticPinned, setOptimisticPinned] = useOptimistic(idea.isPinned);

  function handleTogglePin(): void {
    startTransition(async () => {
      setOptimisticPinned(!optimisticPinned);
      await togglePin(idea.id, !optimisticPinned);
    });
  }

  if (!idea.brandPreview) return <></>;

  const { brandPreview } = idea;

  return (
    <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div
        className="h-2"
        style={{ backgroundColor: brandPreview.palette[0]?.hex }}
      />
      <div className="p-5">
        <h3
          className="font-heading text-lg font-bold"
          style={{ color: brandPreview.palette[0]?.hex }}
        >
          {brandPreview.name}
        </h3>
        <p className="text-sm italic text-muted-foreground mt-1">
          {brandPreview.tagline}
        </p>

        <div className="flex gap-2 mt-4">
          {brandPreview.palette.map((color) => (
            <div
              key={color.hex}
              className="h-6 w-6 rounded-full border border-border shrink-0"
              style={{ backgroundColor: color.hex }}
              title={color.name}
            />
          ))}
        </div>

        {brandPreview.techStack.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {brandPreview.techStack.map((tech) => (
              <Badge key={tech} variant="outline">
                {tech}
              </Badge>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1 mt-2 text-xs italic text-muted-foreground">
          <Quote className="h-3 w-3" />
          <span>{brandPreview.toneOfVoice}</span>
        </div>

        <div className="flex items-center justify-between mt-4">
          <Button variant="primary" size="sm">
            Promote to Project
          </Button>
          {optimisticPinned && (
            <button
              type="button"
              onClick={handleTogglePin}
              className="cursor-pointer"
              aria-label="Unpin idea"
            >
              <Pin className="h-4 w-4 text-primary" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
