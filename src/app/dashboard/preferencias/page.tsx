"use client";
import React from "react";
import { Sidebar } from "@/components/sidebar";
import { useIsLogged } from "../useIsLogged";
import { Toggle } from "@/components/ui/toggle";

export default function Preferences() {
  useIsLogged();
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div>
            <div className="text-center">
              <h1 className="text-2xl">Preferências de Recebimento</h1>
              <p>Aqui você pode controlar as preferências do seu perfil.</p>
              <p>Certifique-se de escolher as opções que mais te agradam 😁.</p>
            </div>
            <Toggle>A</Toggle>
          </div>
        </div>
      </div>
    </>
  );
}
