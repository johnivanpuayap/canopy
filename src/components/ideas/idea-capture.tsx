"use client";

import { useState, useTransition } from "react";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createIdea } from "@/lib/actions/ideas";

export function IdeaCapture(): React.ReactElement {
  const [title, setTitle] = useState("");
  const [isPending, startTransition] = useTransition();

  function handleCapture(): void {
    const trimmed = title.trim();
    if (!trimmed) return;
    startTransition(async () => {
      await createIdea(trimmed, null);
      setTitle("");
    });
  }

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Capture a new idea..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
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
  );
}
