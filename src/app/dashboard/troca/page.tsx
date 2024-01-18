"use client"

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useIsLogged } from "../useIsLogged";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { Instagram } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa6";

export default function Preferences() {
  useIsLogged();

  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center px-3 mt-10 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:inline-flex gap-4">
            <div>
            <div className="text-center flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                <h1 className="text-2xl">Troca</h1>
                <p>Você pode solicitar a troca pelo formulário abaixo:</p>
                </div>
                <form className="border md:p-3 p-2 rounded-xl text-left flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="endereco">Detalhes:</label>
                    <textarea
                      rows={4}
                      id="endereco"
                      className="rounded p-1 bg-zinc-100 border focus:outline-pink-400"
                    />
                  </div>
                  <div className="text-center mt-2">
                    <button type="submit" className="bg-pink-400 py-2 px-4 rounded text-white text-sm">Enviar</button>
                  </div>
                </form>
              </div>
              <p className="mt-2 font-medium">
                Após o envio, <span className="text-rose-400">entraremos em contato</span>
              </p>
              </div>
              <div>
                <h1>Você também pode entrar em contato conosco pelo:</h1>
                <ul className="mt-2 flex flex-col gap-1.5">
                    <li><Link className="inline-flex gap-1 justify-center items-center bg-rose-400 text-white py-2 px-4 rounded-xl" href="https://www.instagram.com/bellahaircabelos" passHref={true}><Instagram size={26} /> Instagram</Link></li>
                    <li><Link className="inline-flex gap-1 justify-center items-center bg-green-500 text-white py-2 px-4 rounded-xl" href="https://www.instagram.com/bellahaircabelos" passHref={true}><FaWhatsapp size={26} /> WhatsApp</Link></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
