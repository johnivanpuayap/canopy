import Link from "next/link";
import { CanopyLogo } from "./canopy-logo";

export function SiteHeader(): React.ReactElement {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/85 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="rounded-lg transition-opacity duration-150 hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-ring/30"
        >
          <CanopyLogo className="text-lg" markClassName="h-7 w-auto" />
        </Link>

        <nav className="flex items-center gap-1.5 sm:gap-3">
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm font-medium text-foreground transition-colors duration-150 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/30"
          >
            Get started
          </Link>
        </nav>
      </div>
    </header>
  );
}
