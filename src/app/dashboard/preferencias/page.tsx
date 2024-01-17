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
      value: "Castanho Claro",
      label: "Castanho Claro",
    },
    {
      value: "Castanho Escuro",
      label: "Castanho Escuro",
    },
    // Adicione mais cores se necessário
  ];

  const sizes = [
    {
      value: "Pequeno",
      label: "Pequeno",
    },
    {
      value: "Médio",
      label: "Médio",
    },
    {
      value: "Grande",
      label: "Grande",
    },
    // Adicione mais tamanhos se necessário
  ];

  const [openColor, setOpenColor] = React.useState(false);
  const [color, setColor] = React.useState("");

  const [openSize, setOpenSize] = React.useState(false);
  const [size, setSize] = React.useState("");

  const savePreference = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    try {
      const { data, error } = await supabase
        .from('preferences')
        .upsert([{ id: user?.id, cor: color, tamanho: size }]);
      
      if (error) throw error;
      console.log('Preference saved:', data);
    } catch (error) {
      console.error('Error saving preference:', error);
    }
  };

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
                      {color
                      ? colors.find((s) => {
                          console.log(`Buscando cor: ${color}, encontrou: ${s.value}`);
                          return s.value === color;
                        })?.label
                      : "Cor..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Cor..." className="h-9" />
                      <CommandEmpty>No color found.</CommandEmpty>
                      <CommandGroup>
                        {colors.map((s) => (
                          <CommandItem
                            key={s.value}
                            value={s.value}
                            onSelect={(currentValue) => {
                              const newColor = currentValue === color ? "" : currentValue;
                              setColor(newColor);
                              setOpenColor(false);
                            }}
                          >
                            {s.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <span>Tamanho:</span>
                <Popover open={openSize} onOpenChange={setOpenSize}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={openSize}
                      className="w-[200px] justify-between"
                    >
                      {size
                        ? sizes.find((s) => s.value === size)?.label
                        : "Tamanho..."}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[200px] p-0">
                    <Command>
                      <CommandInput placeholder="Tamanho..." className="h-9" />
                      <CommandEmpty>No size found.</CommandEmpty>
                      <CommandGroup>
                        {sizes.map((s) => (
                          <CommandItem
                            key={s.value}
                            value={s.value}
                            onSelect={(currentValue) => {
                              const newSize = currentValue === size ? "" : currentValue;
                              setSize(newSize);
                              setOpenSize(false);
                            }}
                          >
                            {s.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              <Button onClick={savePreference}>Salvar Preferências</Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
