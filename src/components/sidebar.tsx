"use client";

import { usePathname } from 'next/navigation'; // Importação correta do usePathname
import { useSidebarContext } from "@/contexts/sidebar-context";
import { cn } from "@/lib/utils";
import { Separator } from "./ui/separator";
import { Activity, RefreshCcw, Settings, UserCheck, UserMinus } from "lucide-react";
import { ThemeSwitcher } from "./theme-switcher";
import { SidebarExpandToggle } from "./sidebar-expand-toggle";
import logo from "..//..//public/images/logo-b.png";
import clube from "..//..//public/images/clube.png";
import Image from "next/image";
import './sidebar.css'
import Link from "next/link";

interface SidebarProps {}

export function Sidebar({}: SidebarProps) {
  const { isSidebarExpanded } = useSidebarContext();
  const pathname = usePathname(); // Uso do usePathname

  // Função para determinar se o link é o ativo
  const getLinkClassName = (path: string) => {
    return cn(
      "flex items-center gap-4 px-3 overflow-clip py-2 rounded sidebar-item",
      pathname === path ? "active" : ""
    );
  };

  return (
    <aside
      className={cn(
        "flex flex-col gap-5 h-screen bg-white top-0 py-4 px-2 border-r",
        isSidebarExpanded ? "fixed w-full z-10 md:sticky md:w-64" : "w-16"
      )}
    >
      <div className="flex items-center overflow-clip">
        <Image src={logo} alt="Home" width={47} />
        <Image src={clube} className="ml-1" alt="Home" width={80} />
      </div>

      <div className="flex flex-col gap-6">
        <Separator className="w-full" />
      </div>

      <div className="flex flex-col gap-3">
      <Link href='/dashboard'>
      <div className={`${getLinkClassName('/dashboard')} flex items-center gap-4 px-3 overflow-clip py-2 rounded sidebar-item`}>
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
        </Link>
        <Link href='/dashboard/preferencias'>
        <div className={`${getLinkClassName('/dashboard/preferencias')} flex items-center gap-4 px-3 overflow-clip py-2 rounded sidebar-item`}>
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
        </Link>
        <Link href='/dashboard/troca' className="flex items-center gap-4 px-3 overflow-clip py-2 rounded sidebar-item">
          <RefreshCcw className="shrink-0 w-5 aspect-square text-primary" />
          <div className="flex flex-col whitespace-nowrap">
            <span className="text-zinc-800 font-semibold text-sm">
              Troca
            </span>
            <span className="text-xs text-muted-foreground">
              Solicitação de troca
            </span>
          </div>
        </Link>

        <ThemeSwitcher />
        <SidebarExpandToggle />
        <form className='px-3 overflow-clip rounded sidebar-item' action="/auth/signout" method="post">
          <button
            type="submit"
            className="flex items-center text-left py-2 gap-4 overflow-clip rounded sidebar-item"
          >
            <UserMinus className="shrink-0 w-5 aspect-square text-primary" />
            <div className="flex flex-col whitespace-nowrap">
            <span className="text-zinc-800 font-semibold text-sm">
              Sair
            </span>
            <span className="text-xs text-muted-foreground">
              Deslogar da conta
            </span>
          </div>
          </button>
        </form>
      </div>
    </aside>
  );
}
