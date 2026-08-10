import {
  FolderOpen,
  LayoutDashboard,
  Lightbulb,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

interface Feature {
  index: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

const FEATURES: readonly Feature[] = [
  {
    index: "01",
    title: "Project dashboard",
    description:
      "Every project, its milestones and todos, and exactly how far along it is — visible at a glance, no digging.",
    icon: LayoutDashboard,
  },
  {
    index: "02",
    title: "Idea board",
    description:
      "Pin half-formed thoughts to a mood-board canvas and let them sit there until they are ready to grow.",
    icon: Lightbulb,
  },
  {
    index: "03",
    title: "File vault",
    description:
      "Specs, plans, and design docs live beside the project they belong to, previewed right in the browser.",
    icon: FolderOpen,
  },
  {
    index: "04",
    title: "Crucible integration",
    description:
      "Brand and design work made in Crucible flows straight into Canopy — no copying files between tools.",
    icon: Sparkles,
  },
];

export function FeatureGrid(): React.ReactElement {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8 sm:py-24">
      <div className="max-w-2xl">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          What&apos;s inside
        </p>
        <h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          One quiet place for the work and the ideas around it.
        </h2>
      </div>

      <ul className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2">
        {FEATURES.map(({ index, title, description, icon: Icon }) => (
          <li
            key={index}
            className="group bg-muted p-7 transition-colors duration-200 hover:bg-background sm:p-9"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors duration-200 group-hover:bg-primary group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span className="font-heading text-xs font-medium tracking-[0.2em] text-muted-foreground">
                {index}
              </span>
            </div>
            <h3 className="mt-6 font-heading text-xl font-semibold tracking-tight text-foreground">
              {title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
              {description}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
