"use client";

import { useSidebarContext } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Activity } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { SidebarExpandToggle } from "./sidebar-expand-toggle";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const { isSidebarExpanded } = useSidebarContext();
  return (
    <aside
      className={cn(
        "bg-red-500 hidden md:flex flex-col gap-5 h-screen top-0 py-8 px-2 sticky",
        isSidebarExpanded ? "w-80" : "w-16"
      )}
    >
      <div className="flex flex-col gap-6">
        {/* <Logo className="pl-3 overflow-clip gap-3" /> */}
        <Separator className="w-full" />
      </div>

      {/* <nav className="flex flex-col gap-3 grow">
        {dashboardNavItems.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </nav> */}

      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 px-3 mb-3 overflow-clip">
          <Activity className="shrink-0 w-5 aspect-square text-primary" />

          <div className="flex flex-col whitespace-nowrap">
            <span className="text-secondary-foreground font-semibold text-sm">
              Limite e cobrança
            </span>
            <span className="text-xs text-muted-foreground">
              Consulte os limites da sua conta{" "}
            </span>
          </div>
        </div>

        <ThemeSwitcher />
        <SidebarExpandToggle />

      </div>
    </aside>
  );
}
