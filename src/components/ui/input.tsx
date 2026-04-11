import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(function Input({ className, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-lg border border-border bg-white px-3 py-2 text-sm font-body placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-ring/30 transition-colors duration-150",
        className,
      )}
      {...props}
    />
  );
});
