import { FILE_TYPE_CONFIG } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import type { ProjectFile } from "@/types";

interface FileCardProps {
  file: ProjectFile;
  projectName: string;
  isSelected: boolean;
  onClick: () => void;
}

export function FileCard({
  file,
  projectName,
  isSelected,
  onClick,
}: FileCardProps): React.ReactElement {
  const config = FILE_TYPE_CONFIG[file.fileType];
  const Icon = config.icon;

  return (
    <div
      onClick={onClick}
      className={[
        "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
        isSelected
          ? "bg-muted border-l-2 border-l-primary"
          : "hover:bg-muted/50",
      ].join(" ")}
    >
      <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center text-foreground/60 shrink-0">
        <Icon className="h-5 w-5" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium truncate">{file.fileName}</p>
        <p className="text-xs text-muted-foreground">{projectName}</p>
      </div>

      <div className="shrink-0 flex items-center gap-2">
        <Badge variant="outline">{config.label}</Badge>
      </div>
    </div>
  );
}
