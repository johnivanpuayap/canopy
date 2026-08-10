import { getIdeas } from "@/lib/data/ideas";
import { IdeaBoard } from "@/components/ideas/idea-board";
import { IdeaCapture } from "@/components/ideas/idea-capture";

export default async function IdeasPage(): Promise<React.ReactElement> {
  const ideas = await getIdeas();

  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Idea Board</h1>
      <p className="text-muted-foreground mt-1">Capture and explore your ideas</p>
      <div className="mt-4">
        <IdeaCapture />
      </div>
      <div className="mt-6">
        <IdeaBoard ideas={ideas} />
      </div>
    </div>
  );
}
