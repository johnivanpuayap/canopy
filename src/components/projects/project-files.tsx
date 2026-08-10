"use client";

import { useRef, useState, useTransition } from "react";
import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FILE_TYPE_CONFIG } from "@/lib/constants";
import { uploadFile } from "@/lib/actions/files";
import type { ProjectFile } from "@/types";

interface ProjectFilesProps {
  projectId: string;
  files: ProjectFile[];
}

export function ProjectFiles({ projectId, files }: ProjectFilesProps): React.ReactElement {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;

    const formData = new FormData();
    formData.set("file", file);
    formData.set("projectId", projectId);
    formData.set("fileType", "other");

    startTransition(async () => {
      try {
        const result = await uploadFile(formData);
        setError(result?.error ?? null);
      } catch {
        setError("Couldn't upload that file. Please try again.");
      }
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold">Files</h3>
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={handleFileChange}
          disabled={isPending}
        />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
          disabled={isPending}
        >
          <Upload className="h-4 w-4" />
          {isPending ? "Uploading..." : "Upload"}
        </Button>
      </div>
      {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {files.length === 0 ? (
          <p className="text-sm text-muted-foreground px-3 py-2">No files yet</p>
        ) : (
          files.map((file) => {
            const config = FILE_TYPE_CONFIG[file.fileType];
            const IconComponent = config.icon;
            return (
              <div
                key={file.id}
                className="flex items-center gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
              >
                <IconComponent className="h-5 w-5 text-muted-foreground shrink-0" />
                <span className="text-sm font-medium truncate flex-1">
                  {file.fileName}
                </span>
                <Badge variant="outline">{config.label}</Badge>
                <span className="text-xs text-muted-foreground ml-auto shrink-0">
                  {formatDate(file.updatedAt)}
                </span>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
