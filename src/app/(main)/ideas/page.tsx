import { MOCK_IDEAS } from "@/lib/mock-data";
import { IdeaBoard } from "@/components/ideas/idea-board";

export default function IdeasPage(): React.ReactElement {
  return (
    <div>
      <h1 className="font-heading text-2xl font-bold">Idea Board</h1>
      <p className="text-muted-foreground mt-1">Capture and explore your ideas</p>
      <div className="mt-6">
        <IdeaBoard ideas={MOCK_IDEAS} />
      </div>
    </div>
  );
}
