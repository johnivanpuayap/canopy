import { forwardRef } from "react";
import { cn } from "@/lib/utils";

export const Card = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function Card({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-white shadow-sm",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});

export const CardHeader = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardHeader({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("p-5 pb-0", className)} {...props}>
      {children}
    </div>
  );
});

export const CardTitle = forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(function CardTitle({ className, children, ...props }, ref) {
  return (
    <h3
      ref={ref}
      className={cn(
        "font-heading text-lg font-semibold text-foreground",
        className,
      )}
      {...props}
    >
      {children}
    </h3>
  );
});

export const CardDescription = forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(function CardDescription({ className, children, ...props }, ref) {
  return (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  );
});

export const CardContent = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardContent({ className, children, ...props }, ref) {
  return (
    <div ref={ref} className={cn("p-5", className)} {...props}>
      {children}
    </div>
  );
});

export const CardFooter = forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(function CardFooter({ className, children, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={cn("flex items-center gap-2 p-5 pt-0", className)}
      {...props}
    >
      {children}
    </div>
  );
});
