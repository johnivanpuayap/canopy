"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { TreePine, Settings } from "lucide-react";
import { NAV_ITEMS } from "@/lib/constants";
import { MOCK_USER } from "@/lib/mock-data";
import { Avatar } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

export function Sidebar(): React.ReactElement {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-border bg-white lg:flex">
      {/* Logo */}
      <div className="flex items-center gap-2 p-5">
        <TreePine className="h-6 w-6 text-primary" />
        <span className="font-heading text-xl font-bold text-primary">
          Canopy
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2">
        <ul className="space-y-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.href);

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors",
                    active
                      ? "bg-muted font-medium text-primary"
                      : "text-foreground/60 hover:bg-muted/50",
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User section */}
      <div className="mt-auto flex items-center gap-3 border-t border-border p-5">
        <Avatar name={MOCK_USER.displayName} size="sm" />
        <span className="flex-1 truncate text-sm font-medium">
          {MOCK_USER.displayName}
        </span>
        <Settings className="h-5 w-5 text-foreground/40" />
      </div>
    </aside>
  );
}
