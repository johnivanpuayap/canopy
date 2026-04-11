"use client";

import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { SearchInput } from "@/components/ui/search-input";
import { Avatar } from "@/components/ui/avatar";
import { MOCK_USER } from "@/lib/mock-data";

function getPageTitle(pathname: string): string {
  if (pathname === "/") return "Dashboard";
  if (pathname === "/ideas") return "Idea Board";
  if (pathname === "/files") return "File Vault";
  if (pathname.startsWith("/project")) return "Project";
  return "Canopy";
}

export function Navbar(): React.ReactElement {
  const pathname = usePathname();
  const title = getPageTitle(pathname);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b border-border bg-white/80 px-4 backdrop-blur-sm lg:pl-[16rem]">
      {/* Left: mobile menu + title */}
      <button
        type="button"
        className="mr-3 rounded-lg p-1.5 text-foreground/60 hover:bg-muted/50 lg:hidden"
        aria-label="Open menu"
      >
        <Menu className="h-5 w-5" />
      </button>
      <h1 className="font-heading text-lg font-semibold">{title}</h1>

      {/* Right: search + avatar */}
      <div className="ml-auto flex items-center gap-3">
        <SearchInput className="hidden w-64 md:block" />
        <Avatar name={MOCK_USER.displayName} size="sm" />
      </div>
    </header>
  );
}
