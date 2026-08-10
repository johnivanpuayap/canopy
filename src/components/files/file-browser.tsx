"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { FileFilters } from "./file-filters";
import { FileCard } from "./file-card";
import { MarkdownPreview } from "./markdown-preview";
import type { ProjectFile, Project } from "@/types";

interface FileBrowserProps {
  files: ProjectFile[];
  projects: Project[];
}

export function FileBrowser({ files, projects }: FileBrowserProps): React.ReactElement {
  const [selectedFileId, setSelectedFileId] = useState<string | null>(null);
  const [projectFilter, setProjectFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);

  const filteredFiles = files.filter((file) => {
    if (projectFilter && file.projectId !== projectFilter) return false;
    if (typeFilter && file.fileType !== typeFilter) return false;
    return true;
  });

  const selectedFile = selectedFileId
    ? filteredFiles.find((f) => f.id === selectedFileId) ?? null
    : null;

  function getProjectName(projectId: string): string {
    return projects.find((p) => p.id === projectId)?.name ?? "Unknown Project";
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-2">
        <FileFilters
          projects={projects}
          activeProject={projectFilter}
          activeType={typeFilter}
          onProjectChange={setProjectFilter}
          onTypeChange={setTypeFilter}
        />
        <div className="mt-4 space-y-1">
          {filteredFiles.length === 0 ? (
            <p className="text-sm text-muted-foreground px-3 py-2">No files found</p>
          ) : (
            filteredFiles.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                projectName={getProjectName(file.projectId)}
                isSelected={selectedFileId === file.id}
                onClick={() => setSelectedFileId(file.id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="lg:col-span-3">
        <Card>
          <MarkdownPreview
            fileName={selectedFile?.fileName ?? null}
            storagePath={selectedFile?.storagePath ?? null}
          />
        </Card>
      </div>
    </div>
  );
}
