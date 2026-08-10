import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection(): React.ReactElement {
  return (
    <section className="border-b border-border">
      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-12 lg:items-center lg:gap-16 lg:py-28">
        <div className="lg:col-span-5">
          <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            <span className="h-px w-8 bg-primary" />
            Project tracker &amp; idea board
          </p>

          <h1 className="mt-6 font-heading text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            All your projects,
            <br />
            <span className="text-primary">one living view.</span>
          </h1>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
            Canopy is a personal project tracker and idea board for developers.
            Track milestones and todos, keep specs and design docs in one vault,
            and pin half-formed ideas to a mood board before they drift away.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/signup"
              className="group inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-base font-medium text-primary-foreground transition-colors duration-150 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              Get started — it&apos;s free
              <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center rounded-lg border border-border px-6 py-3 text-base font-medium text-foreground transition-colors duration-150 hover:bg-muted focus:outline-none focus:ring-2 focus:ring-ring/30"
            >
              Log in
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
