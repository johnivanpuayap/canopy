import { APP_NAME, APP_TAGLINE } from "@/lib/constants";
import { CanopyLogo } from "./canopy-logo";

export function SiteFooter(): React.ReactElement {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <CanopyLogo className="text-base" markClassName="h-6 w-auto" />
          <span className="hidden h-4 w-px bg-border sm:block" />
          <p className="text-sm text-muted-foreground">{APP_TAGLINE}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          © 2026 {APP_NAME}
        </p>
      </div>
    </footer>
  );
}
