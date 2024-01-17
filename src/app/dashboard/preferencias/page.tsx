"use client"

import React from "react";
import { Sidebar } from "@/components/sidebar";
import { useIsLogged } from "../useIsLogged";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import './style.css';

export default function Preferences() {
  useIsLogged();
  const supabase = createClientComponentClient();

  const colors = [
    {
      value: "castanho_escuro",
      label: "Castanho Escuro",
    },
    {
      value: "preto",
      label: "Preto",
    },
  ]

  const tamanhos = [
    {
      value: "50cm",
      label: "50 Centimetros",
    },
    {
      value: "60cm",
      label: "60 Centimetros",
    },
    {
      value: "70cm",
      label: "70 Centimetros",
    },
  ]

  const [openColor, setOpenColor] = React.useState(false)
  const [valueColor, setColorValue] = React.useState("")

  const [openSize, setOpenSize] = React.useState(false)
  const [valueSize, setSizeValue] = React.useState("")

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center">
            <div className="text-center">
              <h1 className="text-2xl">Preferências de Recebimento</h1>
              <p>Aqui você pode escolher as preferências do seu próximo pedido.</p>
              <p>Certifique-se de escolher a opção que mais te agrada 😁.</p>
            </div>
            <div className="inline-flex mt-4 p-3 rounded-xl flex-col items-center border gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span>Cor:</span>
                <Popover open={openColor} onOpenChange={setOpenColor}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openColor}
                      className="w-[200px] justify-between"
                    >
                      {valueColor
                        ? colors.find((framework) => framework.value === valueColor)?.label
                        : "Selecione uma cor..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." className="h-9" />
                      <CommandEmpty>Não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {colors.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setColorValue(currentValue === valueColor ? "" : currentValue)
                              setOpenColor(false)
                            }}
                          >
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <Popover open={openSize} onOpenChange={setOpenSize}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSize}
                      className="w-[200px] justify-between"
                    >
                      {valueSize
                        ? tamanhos.find((framework) => framework.value === valueSize)?.label
                        : "Selecione um tamanho..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Search framework..." className="h-9" />
                      <CommandEmpty>Não encontrado.</CommandEmpty>
                      <CommandGroup>
                        {tamanhos.map((framework) => (
                          <CommandItem
                            key={framework.value}
                            value={framework.value}
                            onSelect={(currentValue) => {
                              setSizeValue(currentValue === valueSize ? "" : currentValue)
                              setOpenSize(false)
                            }}
                          >
                            {framework.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
