"use client";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import logo from "..//..//..//public/images/logo-300.png";
import { Button } from "@/components/ui/button";
import { UserRound, Bell } from "lucide-react";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between container py-2"
      style={{ boxShadow: "rgba(230, 109, 153, 0.4) 0px -3px 15px 1px;" }}
    >
      <div className="flex">
        <Image src={logo} width={260} alt="Picture of the author" />
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-700">
                Menu
              </NavigationMenuTrigger>
              <NavigationMenuContent className="p-3 flex flex-col">
                <NavigationMenuLink className="my-1">Home</NavigationMenuLink>
                <NavigationMenuLink className="my-1">Planos</NavigationMenuLink>
                <NavigationMenuLink className="my-1">
                  Contato
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center">
        <Button className="bg-pink-500 hover:bg-rose-400">
          <UserRound width={16} className="mr-1" />
          Login
        </Button>
        <div className="ml-3">
          <Bell className="bg-neutral-200 p-2.5 rounded-full text-neutral-600 cursor-pointer" height={40} width={40}/>
        </div>
      </div>
    </header>
  );
}
