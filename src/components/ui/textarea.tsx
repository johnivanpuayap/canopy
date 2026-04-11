import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
>(function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-[80px] w-full resize-none rounded-lg border border-border bg-white px-3 py-2 text-sm font-body placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-150",
        className,
      )}
      {...props}
    />
  );
});
