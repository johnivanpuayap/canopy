import { APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface CanopyLogoProps {
  /** Classes for the wrapper (layout, gap, text size of the wordmark). */
  className?: string;
  /** Classes for the mark itself — control its size here. */
  markClassName?: string;
  /** Render the "Canopy" wordmark beside the mark. */
  showWordmark?: boolean;
}

export function CanopyLogo({
  className,
  markClassName,
  showWordmark = true,
}: CanopyLogoProps): React.ReactElement {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 78 72"
        aria-hidden="true"
        focusable="false"
        className={cn("h-8 w-auto shrink-0", markClassName)}
      >
        <path
          fill="#15803D"
          d="M22 46 C10 44 6 32 14 24 C12 12 26 4 36 10 C44 2 58 6 60 16 C70 18 72 32 62 38 C64 48 52 54 44 48 C38 56 26 54 22 46 Z"
        />
        <path
          fill="#4CAF6E"
          opacity={0.9}
          d="M30 44 C22 42 20 32 27 27 C26 18 36 13 43 17 C49 12 59 16 59 24 C66 26 66 36 59 39 C60 46 51 50 46 45 C42 50 33 49 30 44 Z"
        />
        <circle fill="#A7D7B4" opacity={0.9} cx="43" cy="31" r="9" />
        <rect fill="#15803D" x="39" y="50" width="8" height="16" rx="4" />
      </svg>
      {showWordmark ? (
        <span className="font-heading font-semibold tracking-tight text-foreground">
          {APP_NAME}
        </span>
      ) : (
        <span className="sr-only">{APP_NAME}</span>
      )}
    </span>
  );
}
