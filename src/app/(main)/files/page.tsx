import { MOCK_FILES, MOCK_PROJECTS } from "@/lib/mock-data";
import { FileBrowser } from "@/components/files/file-browser";

export default function FilesPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">File Vault</h1>
      <p className="text-muted-foreground mt-1">
        Browse and preview your project files
      </p>
      <div className="mt-6">
        <FileBrowser files={MOCK_FILES} projects={MOCK_PROJECTS} />
      </div>
    </div>
  );
}
