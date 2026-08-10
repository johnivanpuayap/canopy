"use client";

import { useOptimistic, useState, startTransition } from "react";
import { Pin, Quote, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { togglePin, deleteIdea } from "@/lib/actions/ideas";
import { cn } from "@/lib/utils";
import type { Idea } from "@/types";

interface DesignedIdeaCardProps {
  idea: Idea;
}

export function DesignedIdeaCard({ idea }: DesignedIdeaCardProps): React.ReactElement {
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

  if (!idea.brandPreview) return <></>;

  const { brandPreview } = idea;

  return (
    <div className="group rounded-xl border border-border bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow relative">
      <div
        className="h-2"
        style={{ backgroundColor: brandPreview.palette[0]?.hex }}
      />
      <button
        type="button"
        onClick={handleDelete}
        className={cn(
          "absolute top-3 right-3 cursor-pointer transition-opacity",
          deleteFailed ? "opacity-100" : "opacity-0 group-hover:opacity-60 hover:opacity-100",
        )}
        aria-label={deleteFailed ? "Delete failed — try again" : "Delete idea"}
        title={deleteFailed ? "Delete failed — try again" : undefined}
      >
        <Trash2 className="h-4 w-4 text-destructive" />
      </button>
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
        </div>
      </div>
    </div>
  );
}
