"use client"

import React, { useEffect, useState } from "react";
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
  const [endereco, setEndereco] = useState('');
  const [complemento, setComplemento] = useState('');

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
  
  useEffect(() => {
    const loadPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('preferences')
        .select('cor, tamanho')
        .eq('id', user?.id)
        .single();
      
      if (error) {
        console.error('Error loading preferences:', error);
        return;
      }

      // Atualiza os estados com os valores carregados
      if (data) {
        setColorValue(data.cor);
        setSizeValue(data.tamanho);
      }
    };

    loadPreferences();
  }, [supabase]);

  const savePreference = async (newColor: string, newSize: string) => {
    const { data: { user } } = await supabase.auth.getUser();
    try {
      const { data, error } = await supabase
        .from('preferences')
        .upsert([{ id: user?.id, cor: newColor, tamanho: newSize }]);
      
      if (error) throw error;
      console.log('Preferences saved:', data);
    } catch (error) {
      console.error('Error saving preferences:', error);
    }
  };

  useEffect(() => {
    const loadAddress = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('preferences')
        .select('endereco, complemento')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.error('Erro ao carregar endereço:', error);
        return;
      }

      if (data) {
        setEndereco(data.endereco || '');
        setComplemento(data.complemento || '');
      }
    };

    loadAddress();
  }, [supabase]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data: { user } } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('preferences')
      .upsert([{ id: user?.id, endereco: endereco, complemento: complemento }]);

    if (error) {
      console.error('Erro ao salvar endereço:', error);
      return;
    }

    console.log('Endereço salvo:', data);
  };

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center px-3 mt-10 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:block">
            <div className="text-center">
              <h1 className="text-2xl">Preferências de Recebimento</h1>
              <p>
                Aqui você pode escolher as preferências do seu próximo pedido.
              </p>
              <p>Certifique-se de escolher a opção que mais te agrada 😁.</p>
            </div>
            <div className="inline-flex flex-col gap-4 items-center">
              <div className="inline-flex mt-4 p-3 rounded-xl flex-col items-center border gap-2 w-fit">
                <div className="flex flex-col items-center gap-3 flex-wrap">
                  <div className="flex flex-wrap gap-2 items-center">
                    <span>Cor:</span>
                    <Popover open={openColor} onOpenChange={setOpenColor}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openColor}
                          className="md:w-[200px] justify-between"
                        >
                          {valueColor
                            ? colors.find(
                                (framework) => framework.value === valueColor
                              )?.label
                            : "Selecione uma cor..."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
                          <CommandEmpty>Não encontrado.</CommandEmpty>
                          <CommandGroup>
                            {colors.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setColorValue(currentValue);
                                  savePreference(currentValue, valueSize); // Salva a preferência ao selecionar
                                  setOpenColor(false);
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
                  <div className="flex gap-2 items-center">
                    <span>Tamanho:</span>
                    <Popover open={openSize} onOpenChange={setOpenSize}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openSize}
                          className="md:w-[200px] w-fit justify-between"
                        >
                          {valueSize
                            ? tamanhos.find(
                                (framework) => framework.value === valueSize
                              )?.label
                            : "Selecione um tamanho..."}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          {/* <CommandInput placeholder="Search framework..." className="h-9" /> */}
                          <CommandEmpty>Não encontrado.</CommandEmpty>
                          <CommandGroup>
                            {tamanhos.map((framework) => (
                              <CommandItem
                                key={framework.value}
                                value={framework.value}
                                onSelect={(currentValue) => {
                                  setSizeValue(currentValue);
                                  savePreference(valueColor, currentValue); // Salva a preferência ao selecionar
                                  setOpenSize(false);
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
              <div className="flex flex-col gap-3 items-center">
                <h1 className="text-2xl">Endereço de entrega</h1>
                <form onSubmit={handleSubmit} className="border p-4 rounded-xl text-left flex flex-col gap-4 w-fit">
                  <div className="flex items-center gap-2 flex-wrap">
                    <label htmlFor="endereco">Endereço:</label>
                    <input
                      type="text"
                      id="endereco"
                      value={endereco}
                      onChange={(e) => setEndereco(e.target.value)}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <label htmlFor="complemento">Complemento:</label>
                    <input
                      type="text"
                      id="complemento"
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                      className="border rounded p-1"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <button type="submit" className="bg-pink-400 py-2 px-4 rounded text-white text-sm">Salvar Endereço</button>
                  </div>
                </form>
              </div>
              <p className="mt-2 font-medium">
                As informações são salvas <span className="text-rose-400">automaticamente</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
