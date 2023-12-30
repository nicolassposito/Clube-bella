"use client";

import { useSidebarContext } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Activity, RefreshCcw, Settings, UserCheck } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { SidebarExpandToggle } from "./sidebar-expand-toggle";
import logo from "..//..//public/images/logo-b.png";
import clube from "..//..//public/images/clube.png";
import Image from "next/image";
import './sidebar.css'

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const { isSidebarExpanded } = useSidebarContext();
  return (
    <aside
      className={cn(
        "hidden md:flex flex-col gap-5 h-screen top-0 py-4 px-2 sticky border-r",
        isSidebarExpanded ? "w-60" : "w-20"
      )}
    >
      <div className="flex items-center overflow-clip">
        <Image src={logo} alt="Home" width={60} />
        <Image src={clube} className="ml-1" alt="Home" width={90} />
      </div>

      <div className="flex flex-col gap-6">
        {/* <Logo className="pl-3 overflow-clip gap-3" /> */}
        <Separator className="w-full" />
      </div>

      {/* <nav className="flex flex-col gap-3 grow">
        {dashboardNavItems.map((item) => (
          <SidebarNavItem key={item.href} {...item} />
        ))}
      </nav> */}

      <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3 px-3 overflow-clip py-2 rounded sidebar-item active">
          <UserCheck className="shrink-0 w-5 aspect-square text-primary" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-zinc-800 font-semibold text-sm">
              Assinaturas
            </span>
            <span className="text-xs text-muted-foreground">
              Gerencie sua assinatura
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 overflow-clip py-2 rounded sidebar-item">
          <Settings className="shrink-0 w-5 aspect-square text-primary" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-zinc-800 font-semibold text-sm">
              Preferências
            </span>
            <span className="text-xs text-muted-foreground">
              Preferências de recebimento
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 px-3 overflow-clip py-2 rounded sidebar-item">
          <RefreshCcw className="shrink-0 w-5 aspect-square text-primary" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-zinc-800 font-semibold text-sm">
              Troca
            </span>
            <span className="text-xs text-muted-foreground">
              Solicitação de troca
            </span>
          </div>
        </div>

        <ThemeSwitcher />
        <SidebarExpandToggle />
      </div>
    </aside>
  );
}
