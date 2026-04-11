import { Upload } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FILE_TYPE_CONFIG } from "@/lib/constants";
import type { ProjectFile } from "@/types";

interface ProjectFilesProps {
  files: ProjectFile[];
}

export function ProjectFiles({ files }: ProjectFilesProps): React.ReactElement {
  const formatDate = (dateString: string): string =>
    new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h3 className="font-heading text-sm font-semibold">Files</h3>
        <Button variant="ghost" size="sm">
          <Upload className="h-4 w-4" />
          Upload
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-3">
        {files.map((file) => {
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
        })}
      </div>
    </div>
  );
}
