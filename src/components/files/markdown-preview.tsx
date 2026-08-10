"use client";

import { useEffect, useState, useTransition } from "react";
import ReactMarkdown from "react-markdown";
import { FileText, Download, Loader2 } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";
import { fetchFileContent } from "@/lib/actions/files";

interface MarkdownPreviewProps {
  fileName: string | null;
  storagePath: string | null;
}

export function MarkdownPreview({
  fileName,
  storagePath,
}: MarkdownPreviewProps): React.ReactElement {
  const [content, setContent] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setContent(null);
    setError(null);
    if (!storagePath) return;
    startTransition(async () => {
      try {
        const text = await fetchFileContent(storagePath);
        setContent(text);
      } catch {
        setError("Couldn't load this file's contents.");
      }
    });
  }, [storagePath]);

  if (!fileName || !storagePath) {
    return (
      <EmptyState
        icon={<FileText />}
        title="Select a file"
        description="Choose a file from the list to preview its contents"
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between p-4 border-b border-border">
        <span className="font-heading text-sm font-semibold">{fileName}</span>
        <Button variant="ghost" size="sm">
          <Download className="h-4 w-4" />
          Download
        </Button>
      </div>
      <div className="p-4 overflow-auto">
        {isPending && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading preview...
          </div>
        )}
        {!isPending && error && <p className="text-sm text-destructive">{error}</p>}
        {!isPending && !error && content !== null && (
          <div className="prose prose-sm max-w-none">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}
