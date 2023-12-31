"use client";

import { Button } from "@/components/ui/button";
import { useSidebarContext } from "@/contexts/sidebar-context";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

interface SidebarExpandToggleProps {};

export function SidebarExpandToggle({}: SidebarExpandToggleProps) {
  const { isSidebarExpanded, setIsSidebarExpanded } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      className="w-full px-3 overflow-clip h-auto gap-4 shrink-0 flex items-center justify-start relative text-muted-foreground hover:text-secondary-foreground transition-colors disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:text-muted-foreground data-[active=true]:before:absolute data-[active=true]:before:w-1 data-[active=true]:before:rounded-full data-[active=true]:before:aspect-square data-[active=true]:before:left-0 data-[active=true]:text-primary data-[active=true]:hover:text-primary data-[active=true]:cursor-default data-[active=true]:hover:bg-background data-[active=true]:before:bg-primary"
      onClick={setIsSidebarExpanded}
    >
      <figure className="w-5 shrink-0 aspect-square flex items-center justify-center">
        {isSidebarExpanded === true ? <PanelLeftClose /> : <PanelLeftOpen />}
      </figure>
      <span className="whitespace-nowrap">Recolher o painel lateral</span>
    </Button>
  );
};