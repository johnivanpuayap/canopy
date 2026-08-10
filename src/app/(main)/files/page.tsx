import { getFiles } from "@/lib/data/files";
import { getProjects } from "@/lib/data/projects";
import { FileBrowser } from "@/components/files/file-browser";

export default async function FilesPage(): Promise<React.ReactElement> {
  const [files, projects] = await Promise.all([getFiles(), getProjects()]);

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">File Vault</h1>
      <p className="text-muted-foreground mt-1">
        Browse and preview your project files
      </p>
      <div className="mt-6">
        <FileBrowser files={files} projects={projects} />
      </div>
    </div>
  );
}
