"use client";

import ReactMarkdown from "react-markdown";
import { FileText, Download } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { Button } from "@/components/ui/button";

interface MarkdownPreviewProps {
  fileName: string | null;
  content: string | null;
}

export function MarkdownPreview({
  fileName,
  content,
}: MarkdownPreviewProps): React.ReactElement {
  if (!content || !fileName) {
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
        <div className="prose prose-sm max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
