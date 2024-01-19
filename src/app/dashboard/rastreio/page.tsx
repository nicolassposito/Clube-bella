"use client"

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useIsLogged } from "../useIsLogged";
import {
    Alert,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
import { Truck, TruckIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import axios from 'axios';


export default function Rastreio() {
  // useIsLogged();
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center px-3 mt-10 md:mt-0 md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:inline-flex gap-4">
            <div>
            <div className="text-center flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                <h1 className="text-2xl">Rastreamento de produto</h1>
                <div>

              </div>
                </div>
                <form className="text-left flex flex-col gap-4 w-full">
                  <div className="flex flex-col gap-2 hidden">
                  <Alert className="flex !items-top">
                    <Truck className="h-4 w-4 !static !text-rose-400" />
                    <AlertDescription className="pt-0.5 !pl-3">
                        Você ainda não tem nenhum produto em envio
                    </AlertDescription>
                    </Alert>
                  </div>
                  <div className="p-3 border rounded-xl">
                    <div className="text-center">
                      <p className="flex items-center gap-1 text-base"><TruckIcon className="text-rose-400"/>Seu pedido foi postado!</p>
                        <p className="py-2 text-sm text-xinc-600">Código de rastreio:</p>
                          <button className="bg-zinc-100 py-1.5 px-3 rounded">TJ073961830BR</button>
                    </div>
                    <div className="mt-5 text-sm text-zinc-500">
                      Pedido postado dia <span className="text-rose-500">19/01/2024</span>
                    </div>
                  </div>
                </form>
              </div>
              </div>
            </div>
          </div>
        </div>
    </>
  );
}
