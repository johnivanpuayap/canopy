"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createIdea } from "@/lib/actions/ideas";

export function IdeaCapture(): React.ReactElement {
  const [title, setTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  function handleCapture(): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    startTransition(async () => {
      try {
        await createIdea(trimmed, null);
        setTitle("");
        setError(null);
      } catch {
        setError("Couldn't capture that idea. Please try again.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
          placeholder="Capture a new idea..."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError(null);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCapture();
            }
          }}
          disabled={isPending}
        />
        <Button variant="ghost" size="sm" onClick={handleCapture} disabled={isPending}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
    </div>
  );
}
