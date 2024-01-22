"use client"

import React, { useEffect, useState } from "react";
import { Sidebar } from "@/components/sidebar";
import { useIsLogged } from "../useIsLogged";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Truck, TruckIcon } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

interface Pedido {
  codigo_rastreio: string;
  data_postagem: string;
}

export default function Rastreio() {
  const supabase = createClientComponentClient();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  const formatarData = (data: string): string => {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
  };

  useEffect(() => {
    const loadPreferences = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const { data, error } = await supabase
        .from('envios')
        .select('codigo_rastreio, data_postagem')
        .eq('id', user?.id);

      if (error) {
        console.error('Error loading preferences:', error);
        return;
      }

      if (data) {
        const pedidosFormatados = data.map(pedido => ({
          ...pedido,
          data_postagem: formatarData(pedido.data_postagem),
        }));
        setPedidos(pedidosFormatados);
      }
    };

    loadPreferences();
  }, [supabase]);

  // onClick={() => navigator.clipboard.writeText(payment.id)
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="w-full h-screen overflow-scroll relative">
          <div className="text-center px-3 mt-10 md:mt-0 md:absolute md:top-1/2 bottom-0 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 flex flex-col md:inline-flex gap-4">
          <h1 className="text-2xl">Rastreamento de produto</h1>
            
            {pedidos.map((pedido, index) => (
              <div key={index} className="pedido p-3 border rounded-xl">
                <div className="text-center">
                  <p className="flex items-center gap-1 text-base">
                    <TruckIcon size={30} className="text-white bg-rose-400 rounded-full p-1"/>Seu pedido foi postado!
                  </p>
                  <p className="py-2 text-sm text-xinc-600">Código de rastreio:</p>
                  <button className="bg-zinc-100 py-1.5 px-3 rounded">{pedido.codigo_rastreio}</button>
                </div>
                <div className="mt-5 text-sm text-zinc-500">
                  Pedido postado dia <span className="text-rose-500">{pedido.data_postagem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
