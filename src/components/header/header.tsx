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
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Image from "next/image";
import logo from "..//..//..//public/images/logo-600.png";
import logoB from "..//..//..//public/images/logo-b.png";
import { Button } from "@/components/ui/button";
import { UserRound, Bell } from "lucide-react";

interface HeaderProps {}

export function Header({}: HeaderProps) {
  return (
    <header
      className="flex items-center justify-between px-2 pr-3 py-3"
      style={{ boxShadow: "rgba(230, 109, 153, 0.4) 0px -3px 15px 1px;" }}
    >
      <div className="flex">
        <Image
          src={logo}
          className="md:w-56 md:block hidden"
          alt="Picture of the author"
        />
        <Image
          src={logoB}
          className="w-16 md:hidden"
          alt="Picture of the author"
        />
        <NavigationMenu className="ml-0.5 md:ml-3">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-neutral-700 bg-transparent md:px-3 px-2">
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
        <Button className="bg-pink-500 hover:bg-rose-400 md:px-4 px-3">
          <UserRound width={16} className="mr-1" />
          <span className="text-sm">Login</span>
        </Button>
        <div className="ml-3 relative">
          <HoverCard>
            <HoverCardTrigger>
              <Bell
                className="bg-neutral-200 p-2.5 rounded-full text-neutral-600 cursor-pointer"
                height={40}
                width={40}
              />
              <div
                className="absolute bg-pink-400 text-white flex items-center justify-center w-5 h-5 text-xs rounded-full font-medium"
                style={{ right: "-5px", bottom: "-6px" }}
              >
                1
              </div>
            </HoverCardTrigger>
            <HoverCardContent>
              Lorem ipsum dolor sit amet consectetur adipisicing 
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>
    </header>
  );
}
